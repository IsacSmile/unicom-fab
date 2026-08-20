import Database from 'better-sqlite3';
import { createClient } from '@libsql/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tursoUrl = process.env.TURSO_DATABASE_URL || process.env.TURSO_URL;
const tursoToken = process.env.TURSO_AUTH_TOKEN;

// Local SQLite database initialization (always available as fallback)
function getLocalSqliteDb() {
  const schemaPath = path.join(__dirname, 'schema.sql');
  const schemaSql = fs.existsSync(schemaPath) ? fs.readFileSync(schemaPath, 'utf8') : '';

  try {
    const dbDir = path.join(__dirname);
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const dbPath = path.join(dbDir, 'unicom.db');
    const sqliteDb = new Database(dbPath);
    sqliteDb.pragma('journal_mode = WAL');
    sqliteDb.pragma('foreign_keys = ON');

    if (schemaSql) {
      sqliteDb.exec(schemaSql);
    }
    return sqliteDb;
  } catch (err) {
    console.warn('⚠️ Local directory unwriteable (serverless environment), using /tmp/unicom.db:', err.message);
    try {
      const tmpPath = path.join('/tmp', 'unicom.db');
      const tmpDb = new Database(tmpPath);
      if (schemaSql) {
        tmpDb.exec(schemaSql);
      }
      return tmpDb;
    } catch (tmpErr) {
      console.warn('⚠️ /tmp unwriteable, using in-memory database:', tmpErr.message);
      const memDb = new Database(':memory:');
      if (schemaSql) {
        memDb.exec(schemaSql);
      }
      return memDb;
    }
  }
}

let db;
let localSqliteInstance = null;

function getLocalSqlite() {
  if (!localSqliteInstance) {
    localSqliteInstance = getLocalSqliteDb();
  }
  return localSqliteInstance;
}

if (tursoUrl && (tursoUrl.startsWith('libsql:') || tursoUrl.startsWith('https:'))) {
  console.log('⚡ Connecting to Turso Cloud Database:', tursoUrl);
  const libsql = createClient({
    url: tursoUrl,
    authToken: tursoToken,
  });

  db = {
    prepare(sql) {
      return {
        async all(...params) {
          const flatParams = params.flat();
          try {
            const res = await libsql.execute({ sql, args: flatParams });
            return res.rows;
          } catch (err) {
            console.warn('⚠️ Turso Cloud DB error, falling back to local SQLite:', err.message);
            const localDb = getLocalSqlite();
            return localDb.prepare(sql).all(...flatParams);
          }
        },
        async get(...params) {
          const flatParams = params.flat();
          try {
            const res = await libsql.execute({ sql, args: flatParams });
            return res.rows[0] || null;
          } catch (err) {
            console.warn('⚠️ Turso Cloud DB error, falling back to local SQLite:', err.message);
            const localDb = getLocalSqlite();
            return localDb.prepare(sql).get(...flatParams);
          }
        },
        async run(...params) {
          const flatParams = params.flat();
          try {
            const res = await libsql.execute({ sql, args: flatParams });
            return {
              changes: res.rowsAffected,
              lastInsertRowid: res.lastInsertRowid ? Number(res.lastInsertRowid) : null,
            };
          } catch (err) {
            console.warn('⚠️ Turso Cloud DB error, falling back to local SQLite:', err.message);
            const localDb = getLocalSqlite();
            return localDb.prepare(sql).run(...flatParams);
          }
        },
      };
    },
    async exec(sql) {
      try {
        const statements = sql
          .split(';')
          .map(s => s.trim())
          .filter(s => s.length > 0);
        for (const stmt of statements) {
          await libsql.execute(stmt);
        }
      } catch (err) {
        console.warn('⚠️ Turso exec error, falling back to local SQLite:', err.message);
        getLocalSqlite().exec(sql);
      }
    },
    transaction(fn) {
      return (...args) => fn(...args);
    },
    pragma() {},
    isTurso: true,
  };
} else {
  console.log('📦 Using Local SQLite Database (unicom.db)');
  const sqliteDb = getLocalSqlite();

  db = {
    prepare(sql) {
      const stmt = sqliteDb.prepare(sql);
      return {
        async all(...params) {
          const flatParams = params.flat();
          return stmt.all(...flatParams);
        },
        async get(...params) {
          const flatParams = params.flat();
          return stmt.get(...flatParams);
        },
        async run(...params) {
          const flatParams = params.flat();
          return stmt.run(...flatParams);
        },
      };
    },
    async exec(sql) {
      return sqliteDb.exec(sql);
    },
    transaction(fn) {
      return (...args) => fn(...args);
    },
    pragma(str) {
      return sqliteDb.pragma(str);
    },
    isTurso: false,
  };
}

export default db;
