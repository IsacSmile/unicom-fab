import express from 'express';
import db from '../db/database.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST Create Wholesale Order (Requires User Google Session)
router.post('/', authenticateUser, (req, res) => {
  const { items, companyName, phone, deliveryAddress, city, state, pincode, notes } = req.body;
  const user = req.user;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }

  if (!companyName || !phone || !deliveryAddress || !city || !state || !pincode) {
    return res.status(400).json({ error: 'All company contact and shipping details are required' });
  }

  let totalItems = 0;
  let totalQuantity = 0;
  let totalAmount = 0;
  const validatedItems = [];

  // Server-side validation of stock, MOQ, and step increment
  for (const item of items) {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.productId);
    if (!product) {
      return res.status(400).json({ error: `Product ID ${item.productId} no longer exists` });
    }

    if (item.quantity < product.min_order_quantity) {
      return res.status(400).json({
        error: `Quantity for "${product.name}" (${item.quantity} PCS) is below Minimum Order Quantity (${product.min_order_quantity} PCS)`
      });
    }

    // Step increment check
    if ((item.quantity - product.min_order_quantity) % product.quantity_step !== 0) {
      return res.status(400).json({
        error: `Quantity for "${product.name}" (${item.quantity} PCS) does not conform to quantity step increment of ${product.quantity_step} PCS`
      });
    }

    // Stock check
    if (product.stock_quantity < item.quantity) {
      return res.status(400).json({
        error: `Insufficient stock for "${product.name}". Requested ${item.quantity} PCS but only ${product.stock_quantity} PCS available in batch ${product.batch_number}`
      });
    }

    totalItems += 1;
    totalQuantity += item.quantity;
    const linePrice = product.wholesale_price * item.quantity;
    totalAmount += linePrice;

    validatedItems.push({
      productId: product.id,
      productName: product.name,
      batchNumber: product.batch_number,
      colour: item.colour || 'Default',
      size: item.size || 'Standard',
      quantity: item.quantity,
      pricePerUnit: product.wholesale_price
    });
  }

  const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  try {
    db.transaction(() => {
      // Create Order
      db.prepare(`
        INSERT INTO orders (
          id, user_id, user_name, user_email, company_name, phone,
          delivery_address, city, state, pincode, total_items, total_quantity, total_amount, notes, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')
      `).run(
        orderId, user.id, user.name, user.email, companyName, phone,
        deliveryAddress, city, state, pincode, totalItems, totalQuantity, totalAmount, notes || ''
      );

      // Create Order Items & Update Product Stock
      const insertOrderItem = db.prepare(`
        INSERT INTO order_items (id, order_id, product_id, product_name, batch_number, colour, size, quantity, price_per_unit)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const updateStock = db.prepare(`
        UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?
      `);

      validatedItems.forEach(vi => {
        const itemId = `item_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
        insertOrderItem.run(itemId, orderId, vi.productId, vi.productName, vi.batchNumber, vi.colour, vi.size, vi.quantity, vi.pricePerUnit);
        updateStock.run(vi.quantity, vi.productId);
      });
    })();

    const createdOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    const orderItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(orderId);

    return res.status(201).json({
      message: 'Wholesale order submitted successfully',
      order: {
        id: createdOrder.id,
        userName: createdOrder.user_name,
        userEmail: createdOrder.user_email,
        companyName: createdOrder.company_name,
        phone: createdOrder.phone,
        totalItems: createdOrder.total_items,
        totalQuantity: createdOrder.total_quantity,
        totalAmount: createdOrder.total_amount,
        status: createdOrder.status,
        createdAt: createdOrder.created_at,
        items: orderItems
      }
    });
  } catch (err) {
    console.error('Order creation failed:', err);
    return res.status(500).json({ error: 'Failed to process wholesale order. Please try again.' });
  }
});

// GET My Orders (Authenticated User)
router.get('/my-orders', authenticateUser, (req, res) => {
  const user = req.user;
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(user.id);

  const formattedOrders = orders.map(o => {
    const rawItems = db.prepare('SELECT * FROM order_items WHERE order_id = ?').all(o.id);
    const items = rawItems.map(item => ({
      ...item,
      productName: item.product_name || item.productName || 'Wholesale Product',
      batchNumber: item.batch_number || item.batchNumber || 'N/A',
      pricePerUnit: item.price_per_unit !== undefined ? item.price_per_unit : item.pricePerUnit
    }));

    return {
      id: o.id,
      companyName: o.company_name,
      phone: o.phone,
      deliveryAddress: o.delivery_address,
      city: o.city,
      state: o.state,
      pincode: o.pincode,
      totalItems: o.total_items,
      totalQuantity: o.total_quantity,
      totalAmount: o.total_amount,
      status: o.status,
      createdAt: o.created_at,
      items
    };
  });

  return res.json({ orders: formattedOrders });
});

export default router;
