import express from 'express';
import db from '../db/database.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Storefront Settings (Announcement Bar & Brand Marquee text)
router.get('/settings', async (req, res) => {
  try {
    const settings = await db.prepare('SELECT * FROM admin_settings').all();
    const settingsObj = {};
    (settings || []).forEach(s => { settingsObj[s.key] = s.value; });
    return res.json({ settings: settingsObj });
  } catch (err) {
    console.error('Error fetching settings:', err);
    return res.json({ settings: {} });
  }
});

// Apply admin authentication middleware to all protected admin management endpoints
router.use(authenticateAdmin);

// Dashboard Overview Metrics
router.get('/stats', async (req, res) => {
  try {
    const totalProducts = (await db.prepare('SELECT COUNT(*) as count FROM products').get())?.count || 0;
    const totalOrders = (await db.prepare('SELECT COUNT(*) as count FROM orders').get())?.count || 0;
    const pendingOrders = (await db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'Pending'").get())?.count || 0;
    const totalEnquiries = (await db.prepare('SELECT COUNT(*) as count FROM enquiries').get())?.count || 0;
    const newEnquiries = (await db.prepare("SELECT COUNT(*) as count FROM enquiries WHERE status = 'New'").get())?.count || 0;
    const trendingProducts = (await db.prepare('SELECT COUNT(*) as count FROM products WHERE is_trending = 1').get())?.count || 0;
    const newArrivalProducts = (await db.prepare('SELECT COUNT(*) as count FROM products WHERE is_new_arrival = 1').get())?.count || 0;

    const lowStockProducts = (await db.prepare(`
      SELECT id, name, batch_number as batchNumber, stock_quantity as stockQuantity, min_order_quantity as minOrderQuantity 
      FROM products 
      WHERE stock_quantity <= min_order_quantity * 2 
      LIMIT 10
    `).all()) || [];

    const recentOrders = (await db.prepare(`
      SELECT id, company_name as companyName, user_email as userEmail, total_quantity as totalQuantity, total_amount as totalAmount, status 
      FROM orders 
      ORDER BY created_at DESC 
      LIMIT 5
    `).all()) || [];

    return res.json({
      totalProducts,
      totalOrders,
      pendingOrders,
      totalEnquiries,
      newEnquiries,
      trendingProducts,
      newArrivalProducts,
      lowStockProducts,
      recentOrders
    });
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    return res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// Admin Product Management: Create Product
router.post('/products', async (req, res) => {
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
    await db.prepare(`
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
    for (let idx = 0; idx < Math.min(images.length, 4); idx++) {
      const imgUrl = images[idx];
      if (imgUrl && imgUrl.trim() !== '') {
        await db.prepare('INSERT INTO product_images (product_id, image_url, display_order) VALUES (?, ?, ?)').run(productId, imgUrl.trim(), idx);
      }
    }

    // Insert colours
    for (const c of colours) {
      if (c && c.trim() !== '') await db.prepare('INSERT INTO product_colours (product_id, colour_name) VALUES (?, ?)').run(productId, c.trim());
    }

    // Insert sizes
    for (const s of sizes) {
      if (s && s.trim() !== '') await db.prepare('INSERT INTO product_sizes (product_id, size_name) VALUES (?, ?)').run(productId, s.trim());
    }

    return res.status(201).json({ message: 'Product created successfully', productId });
  } catch (err) {
    console.error('Failed to create product:', err);
    return res.status(500).json({ error: 'Failed to create product' });
  }
});

// Admin Product Management: Update Product
router.put('/products/:id', async (req, res) => {
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

  try {
    const existing = await db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (images.length > 4) {
      return res.status(400).json({ error: 'A maximum of 4 images per product is allowed' });
    }

    await db.prepare(`
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
    await db.prepare('DELETE FROM product_images WHERE product_id = ?').run(id);
    for (let idx = 0; idx < Math.min(images.length, 4); idx++) {
      const imgUrl = images[idx];
      if (imgUrl && imgUrl.trim() !== '') {
        await db.prepare('INSERT INTO product_images (product_id, image_url, display_order) VALUES (?, ?, ?)').run(id, imgUrl.trim(), idx);
      }
    }

    // Re-insert colours
    await db.prepare('DELETE FROM product_colours WHERE product_id = ?').run(id);
    for (const c of colours) {
      if (c && c.trim() !== '') await db.prepare('INSERT INTO product_colours (product_id, colour_name) VALUES (?, ?)').run(id, c.trim());
    }

    // Re-insert sizes
    await db.prepare('DELETE FROM product_sizes WHERE product_id = ?').run(id);
    for (const s of sizes) {
      if (s && s.trim() !== '') await db.prepare('INSERT INTO product_sizes (product_id, size_name) VALUES (?, ?)').run(id, s.trim());
    }

    return res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Update product error:', err);
    return res.status(500).json({ error: 'Failed to update product' });
  }
});

// Admin Product Management: Toggle Flags (Trending / New Arrival)
router.patch('/products/:id/toggle', async (req, res) => {
  const { id } = req.params;
  const { field } = req.body; // 'isTrending' or 'isNewArrival'

  try {
    if (field === 'isTrending') {
      await db.prepare('UPDATE products SET is_trending = CASE WHEN is_trending = 1 THEN 0 ELSE 1 END WHERE id = ?').run(id);
    } else if (field === 'isNewArrival') {
      await db.prepare('UPDATE products SET is_new_arrival = CASE WHEN is_new_arrival = 1 THEN 0 ELSE 1 END WHERE id = ?').run(id);
    } else {
      return res.status(400).json({ error: 'Invalid field parameter' });
    }

    return res.json({ message: 'Product flag updated' });
  } catch (err) {
    console.error('Toggle flag error:', err);
    return res.status(500).json({ error: 'Failed to toggle product flag' });
  }
});

// Admin Product Management: Delete Product
router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.prepare('DELETE FROM products WHERE id = ?').run(id);
    return res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Delete product error:', err);
    return res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Admin Orders Management
router.get('/orders', async (req, res) => {
  try {
    const rawOrders = await db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    const formattedOrders = await Promise.all((rawOrders || []).map(async o => {
      const items = await db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id);
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
        items: items || []
      };
    }));
    return res.json({ orders: formattedOrders });
  } catch (err) {
    console.error('Error fetching admin orders:', err);
    return res.status(500).json({ error: 'Failed to fetch admin orders' });
  }
});

router.patch('/orders/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Completed', 'Cancelled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    await db.prepare('UPDATE orders SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
    return res.json({ message: `Order status updated to ${status}` });
  } catch (err) {
    console.error('Update order status error:', err);
    return res.status(500).json({ error: 'Failed to update order status' });
  }
});

// Admin Enquiries Management
router.get('/enquiries', async (req, res) => {
  try {
    const rawEnquiries = await db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all();
    const formattedEnquiries = (rawEnquiries || []).map(e => ({
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
  } catch (err) {
    console.error('Error fetching enquiries:', err);
    return res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

router.patch('/enquiries/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['New', 'Contacted', 'In Progress', 'Resolved'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid enquiry status' });
  }

  try {
    await db.prepare('UPDATE enquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(status, id);
    return res.json({ message: `Enquiry status updated to ${status}` });
  } catch (err) {
    console.error('Update enquiry status error:', err);
    return res.status(500).json({ error: 'Failed to update enquiry status' });
  }
});

// Admin Storefront Announcement Settings Update (Protected)
router.post('/settings', async (req, res) => {
  const { announcement_text, brand_marquee } = req.body;

  try {
    if (announcement_text !== undefined) {
      await db.prepare('INSERT INTO admin_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run('announcement_text', announcement_text);
    }
    if (brand_marquee !== undefined) {
      await db.prepare('INSERT INTO admin_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value').run('brand_marquee', brand_marquee);
    }

    return res.json({ message: 'Store settings updated successfully' });
  } catch (err) {
    console.error('Update settings error:', err);
    return res.status(500).json({ error: 'Failed to update store settings' });
  }
});

export default router;
