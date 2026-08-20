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

let db;

if (tursoUrl && (tursoUrl.startsWith('libsql:') || tursoUrl.startsWith('https:'))) {
  console.log('⚡ Connecting to Turso Cloud Database:', tursoUrl);
  const libsql = createClient({
    url: tursoUrl,
    authToken: tursoToken,
  });

  // Dual synchronous/asynchronous wrapper for LibSQL Client
  db = {
    prepare(sql) {
      return {
        all(...params) {
          const flatParams = params.flat();
          // Synchronous fallback / promise handle for Express handlers
          return libsql.execute({ sql, args: flatParams }).then(res => res.rows);
        },
        get(...params) {
          const flatParams = params.flat();
          return libsql.execute({ sql, args: flatParams }).then(res => res.rows[0] || null);
        },
        run(...params) {
          const flatParams = params.flat();
          return libsql.execute({ sql, args: flatParams }).then(res => ({
            changes: res.rowsAffected,
            lastInsertRowid: res.lastInsertRowid ? Number(res.lastInsertRowid) : null,
          }));
        },
      };
    },
    async exec(sql) {
      const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      for (const stmt of statements) {
        await libsql.execute(stmt);
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
  const dbDir = path.join(__dirname);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const dbPath = path.join(dbDir, 'unicom.db');
  db = new Database(dbPath);

  // Enable WAL mode & foreign keys
  db.pragma('journal_mode = WAL');
  db.pragma('foreign_keys = ON');

  // Initialize schema
  const schemaPath = path.join(__dirname, 'schema.sql');
  if (fs.existsSync(schemaPath)) {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSql);
  }
}

export default db;
