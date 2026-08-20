import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../db/database.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'unicom_fab_b2b_super_secret_jwt_key_2026';

// Admin Login
router.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  const envAdminEmail = process.env.ADMIN_USER_ID || 'admin@unicomfab.com';
  const envAdminPassword = process.env.ADMIN_PASSWORD || 'adminPass123!';

  if (email !== envAdminEmail || password !== envAdminPassword) {
    return res.status(401).json({ error: 'Invalid admin credentials' });
  }

  const token = jwt.sign(
    { email: envAdminEmail, role: 'admin', isAdmin: true },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    message: 'Admin authentication successful',
    token,
    user: {
      email: envAdminEmail,
      name: 'System Admin',
      isAdmin: true,
    },
  });
});

// Google Customer Authentication (Supports Live OAuth or Dev Direct Auth)
router.post('/google', (req, res) => {
  const { googleId, email, name, picture, companyName, phone } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required for authentication' });
  }

  const gid = googleId || `g_${Date.now()}`;

  // Check if user exists
  let user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) {
    const userId = `usr_${Date.now()}`;
    db.prepare(`
      INSERT INTO users (id, google_id, email, name, picture, company_name, phone)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(userId, gid, email, name, picture || '', companyName || '', phone || '');

    user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
  } else {
    // Update profile info if provided
    db.prepare(`
      UPDATE users SET name = ?, picture = COALESCE(?, picture), company_name = COALESCE(?, company_name)
      WHERE id = ?
    `).run(name, picture || null, companyName || null, user.id);
    user = db.prepare('SELECT * FROM users WHERE id = ?').get(user.id);
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, isAdmin: false },
    JWT_SECRET,
    { expiresIn: '30d' }
  );

  return res.json({
    message: 'Authenticated successfully with Google',
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture,
      companyName: user.company_name,
      phone: user.phone,
      isAdmin: false
    }
  });
});

// Verify Current Token / Session
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No active session token' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.isAdmin) {
      return res.json({
        user: {
          email: process.env.ADMIN_USER_ID || 'admin@unicomfab.com',
          name: 'System Admin',
          isAdmin: true
        }
      });
    }

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(decoded.id);
    if (!user) {
      return res.status(404).json({ error: 'User account not found' });
    }

    return res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        companyName: user.company_name,
        phone: user.phone,
        isAdmin: false
      }
    });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired session token' });
  }
});

export default router;
