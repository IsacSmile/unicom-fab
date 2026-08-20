import express from 'express';
import db from '../db/database.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply admin authentication middleware to all admin endpoints
router.use(authenticateAdmin);

// Dashboard Overview Metrics
router.get('/stats', (req, res) => {
  const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
  const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
  const pendingOrders = db.prepare('SELECT COUNT(*) as count FROM orders WHERE status = "Pending"').get().count;
  const totalEnquiries = db.prepare('SELECT COUNT(*) as count FROM enquiries').get().count;
  const newEnquiries = db.prepare('SELECT COUNT(*) as count FROM enquiries WHERE status = "New"').get().count;
  const lowStockProducts = db.prepare('SELECT COUNT(*) as count FROM products WHERE stock_quantity <= min_order_quantity * 2').get().count;
  const trendingProducts = db.prepare('SELECT COUNT(*) as count FROM products WHERE is_trending = 1').get().count;
  const newArrivalProducts = db.prepare('SELECT COUNT(*) as count FROM products WHERE is_new_arrival = 1').get().count;

  return res.json({
    totalProducts,
    totalOrders,
    pendingOrders,
    totalEnquiries,
    newEnquiries,
    lowStockProducts,
    trendingProducts,
    newArrivalProducts
  });
});

// Admin Product Management: Create Product
router.post('/products', (req, res) => {
  const {
    name,
    description,
    category,
    wholesalePrice,
    suggestedMsrp,
    batchNumber,
    stockQuantity,
    minOrderQuantity,
    quantityStep,
    isTrending,
    isNewArrival,
    images = [],
    colours = [],
    sizes = []
  } = req.body;

  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Product name is required' });
  }

  if (images.length > 4) {
    return res.status(400).json({ error: 'A maximum of 4 images per product is allowed' });
  }

  if (parseInt(stockQuantity) < 0) {
    return res.status(400).json({ error: 'Stock quantity cannot be negative' });
  }

  if (parseInt(minOrderQuantity) <= 0) {
    return res.status(400).json({ error: 'Minimum order quantity must be greater than 0' });
  }

  if (parseInt(quantityStep) <= 0) {
    return res.status(400).json({ error: 'Quantity step must be greater than 0' });
  }

  const productId = `prod-${Date.now()}`;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + `-${Date.now().toString().slice(-4)}`;

  try {
    db.transaction(() => {
      db.prepare(`
        INSERT INTO products (
          id, name, slug, description, category, wholesale_price, suggested_msrp,
          batch_number, stock_quantity, min_order_quantity, quantity_step, is_trending, is_new_arrival
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        productId, name, slug, description || '', category || 'Uncategorized',
        parseFloat(wholesalePrice) || 0, parseFloat(suggestedMsrp) || 0,
        batchNumber || `BATCH-${new Date().toISOString().slice(0,7)}-01`,
        parseInt(stockQuantity) || 0, parseInt(minOrderQuantity) || 30,
        parseInt(quantityStep) || 5, isTrending ? 1 : 0, isNewArrival ? 1 : 0
      );

      // Insert images (max 4)
      const insertImg = db.prepare('INSERT INTO product_images (product_id, image_url, display_order) VALUES (?, ?, ?)');
      images.slice(0, 4).forEach((imgUrl, idx) => {
        if (imgUrl && imgUrl.trim() !== '') {
          insertImg.run(productId, imgUrl.trim(), idx);
        }
      });

      // Insert colours
      const insertCol = db.prepare('INSERT INTO product_colours (product_id, colour_name) VALUES (?, ?)');
      colours.forEach(c => {
        if (c && c.trim() !== '') insertCol.run(productId, c.trim());
      });

      // Insert sizes
      const insertSz = db.prepare('INSERT INTO product_sizes (product_id, size_name) VALUES (?, ?)');
      sizes.forEach(s => {
        if (s && s.trim() !== '') insertSz.run(productId, s.trim());
      });
    })();

    return res.status(201).json({ message: 'Product created successfully', productId });
  } catch (err) {
    console.error('Failed to create product:', err);
    return res.status(500).json({ error: 'Failed to create product' });
  }
});

// Admin Product Management: Update Product
router.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    category,
    wholesalePrice,
    suggestedMsrp,
    batchNumber,
    stockQuantity,
    minOrderQuantity,
    quantityStep,
    isTrending,
    isNewArrival,
    images = [],
    colours = [],
    sizes = []
  } = req.body;

  const existing = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  if (!existing) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (images.length > 4) {
    return res.status(400).json({ error: 'A maximum of 4 images per product is allowed' });
  }

  try {
    db.transaction(() => {
      db.prepare(`
        UPDATE products SET
          name = ?, description = ?, category = ?, wholesale_price = ?, suggested_msrp = ?,
          batch_number = ?, stock_quantity = ?, min_order_quantity = ?, quantity_step = ?,
          is_trending = ?, is_new_arrival = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).run(
        name, description, category, parseFloat(wholesalePrice) || 0, parseFloat(suggestedMsrp) || 0,
        batchNumber, parseInt(stockQuantity) || 0, parseInt(minOrderQuantity) || 30,
        parseInt(quantityStep) || 5, isTrending ? 1 : 0, isNewArrival ? 1 : 0, id
      );

      // Re-insert images
      db.prepare('DELETE FROM product_images WHERE product_id = ?').run(id);
      const insertImg = db.prepare('INSERT INTO product_images (product_id, image_url, display_order) VALUES (?, ?, ?)');
      images.slice(0, 4).forEach((imgUrl, idx) => {
        if (imgUrl && imgUrl.trim() !== '') {
          insertImg.run(id, imgUrl.trim(), idx);
        }
      });

      // Re-insert colours
      db.prepare('DELETE FROM product_colours WHERE product_id = ?').run(id);
      const insertCol = db.prepare('INSERT INTO product_colours (product_id, colour_name) VALUES (?, ?)');
      colours.forEach(c => {
        if (c && c.trim() !== '') insertCol.run(id, c.trim());
      });

      // Re-insert sizes
      db.prepare('DELETE FROM product_sizes WHERE product_id = ?').run(id);
      const insertSz = db.prepare('INSERT INTO product_sizes (product_id, size_name) VALUES (?, ?)');
      sizes.forEach(s => {
        if (s && s.trim() !== '') insertSz.run(id, s.trim());
      });
    })();

    return res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Update product error:', err);
    return res.status(500).json({ error: 'Failed to update product' });
  }
});

// Admin Product Management: Toggle Flags (Trending / New Arrival)
router.patch('/products/:id/toggle', (req, res) => {
  const { id } = req.params;
  const { field } = req.body; // 'isTrending' or 'isNewArrival'

  if (field === 'isTrending') {
    db.prepare('UPDATE products SET is_trending = CASE WHEN is_trending = 1 THEN 0 ELSE 1 END WHERE id = ?').run(id);
  } else if (field === 'isNewArrival') {
    db.prepare('UPDATE products SET is_new_arrival = CASE WHEN is_new_arrival = 1 THEN 0 ELSE 1 END WHERE id = ?').run(id);
  } else {
    return res.status(400).json({ error: 'Invalid field parameter' });
  }

  return res.json({ message: 'Product flag updated' });
});

// Admin Product Management: Delete Product
router.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  db.prepare('DELETE FROM products WHERE id = ?').run(id);
  return res.json({ message: 'Product deleted' });
});

// Admin Orders Management
router.get('/orders', (req, res) => {
  const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
  const formattedOrders = orders.map(o => {
    const items = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id);
    return {
      id: o.id,
      userId: o.user_id,
      userName: o.user_name,
      userEmail: o.user_email,
      companyName: o.company_name,
      phone: o.phone,
      deliveryAddress: o.delivery_address,
      city: o.city,
      state: o.state,
      pincode: o.pincode,
      totalItems: o.total_items,
      totalQuantity: o.total_quantity,
      totalAmount: o.total_amount,
      notes: o.notes,
      status: o.status,
      createdAt: o.created_at,
      items
    };
  });
  return res.json({ orders: formattedOrders });
});

router.patch('/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Completed', 'Cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
  return res.json({ message: `Order status updated to ${status}` });
});

// Admin Enquiries Management
router.get('/enquiries', (req, res) => {
  const enquiries = db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all();
  const formattedEnquiries = enquiries.map(e => ({
    id: e.id,
    name: e.name,
    companyName: e.company_name,
    email: e.email,
    phone: e.phone,
    productName: e.product_name,
    requiredQuantity: e.required_quantity,
    message: e.message,
    country: e.country,
    city: e.city,
    status: e.status,
    createdAt: e.created_at
  }));
  return res.json({ enquiries: formattedEnquiries });
});

router.patch('/enquiries/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['New', 'Contacted', 'In Progress', 'Resolved'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid enquiry status' });
  }

  db.prepare('UPDATE enquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
  return res.json({ message: `Enquiry status updated to ${status}` });
});

// Admin Storefront Announcement Settings
router.get('/settings', (req, res) => {
  const settings = db.prepare('SELECT * FROM admin_settings').all();
  const settingsObj = {};
  settings.forEach(s => { settingsObj[s.key] = s.value; });
  return res.json({ settings: settingsObj });
});

router.post('/settings', (req, res) => {
  const { announcement_text, brand_marquee } = req.body;
  const insertOrUpdate = db.prepare('INSERT INTO admin_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value');

  if (announcement_text !== undefined) insertOrUpdate.run('announcement_text', announcement_text);
  if (brand_marquee !== undefined) insertOrUpdate.run('brand_marquee', brand_marquee);

  return res.json({ message: 'Store settings updated successfully' });
});

export default router;
