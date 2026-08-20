import express from 'express';
import db from '../db/database.js';

const router = express.Router();

// POST Guest Wholesale Enquiry
router.post('/', (req, res) => {
  const { name, companyName, email, phone, productName, requiredQuantity, message, country, city } = req.body;

  if (!name || !companyName || !email || !phone || !message) {
    return res.status(400).json({ error: 'Name, company, email, phone, and message are required' });
  }

  const enquiryId = `ENQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  try {
    db.prepare(`
      INSERT INTO enquiries (
        id, name, company_name, email, phone, product_name, required_quantity, message, country, city, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'New')
    `).run(
      enquiryId, name, companyName, email, phone, productName || 'General Enquiry',
      requiredQuantity ? parseInt(requiredQuantity) : null, message, country || 'India', city || ''
    );

    return res.status(201).json({
      message: 'Wholesale enquiry submitted successfully! Our business team will contact you shortly.',
      enquiryId
    });
  } catch (err) {
    console.error('Enquiry creation error:', err);
    return res.status(500).json({ error: 'Failed to submit enquiry' });
  }
});

export default router;
