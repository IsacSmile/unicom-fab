import express from 'express';
import db from '../db/database.js';

const router = express.Router();

// Helper to format full product details
function formatProduct(p) {
  if (!p) return null;
  const images = db.prepare('SELECT image_url FROM product_images WHERE product_id = ? ORDER BY display_order ASC').all(p.id).map(i => i.image_url);
  const colours = db.prepare('SELECT colour_name FROM product_colours WHERE product_id = ?').all(p.id).map(c => c.colour_name);
  const sizes = db.prepare('SELECT size_name FROM product_sizes WHERE product_id = ?').all(p.id).map(s => s.size_name);

  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    category: p.category,
    wholesalePrice: p.wholesale_price,
    suggestedMsrp: p.suggested_msrp,
    batchNumber: p.batch_number,
    stockQuantity: p.stock_quantity,
    minOrderQuantity: p.min_order_quantity,
    quantityStep: p.quantity_step,
    isTrending: Boolean(p.is_trending),
    isNewArrival: Boolean(p.is_new_arrival),
    images: images.length > 0 ? images.slice(0, 4) : ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800'],
    colours,
    sizes,
    createdAt: p.created_at
  };
}

// GET all products with filtering, search, sorting & pagination
router.get('/', (req, res) => {
  const {
    category,
    size,
    colour,
    inStock,
    trending,
    newArrival,
    search,
    sort = 'newest',
    page = 1,
    limit = 20
  } = req.query;

  let query = 'SELECT DISTINCT p.* FROM products p';
  const params = [];
  const joins = [];
  const conditions = [];

  if (size) {
    joins.push('JOIN product_sizes ps ON p.id = ps.product_id');
    conditions.push('ps.size_name = ?');
    params.push(size);
  }

  if (colour) {
    joins.push('JOIN product_colours pc ON p.id = pc.product_id');
    conditions.push('pc.colour_name = ?');
    params.push(colour);
  }

  if (joins.length > 0) {
    query += ' ' + joins.join(' ');
  }

  if (category) {
    conditions.push('p.category = ?');
    params.push(category);
  }

  if (inStock === 'true') {
    conditions.push('p.stock_quantity > 0');
  }

  if (trending === 'true') {
    conditions.push('p.is_trending = 1');
  }

  if (newArrival === 'true') {
    conditions.push('p.is_new_arrival = 1');
  }

  if (search && search.trim() !== '') {
    conditions.push('(p.name LIKE ? OR p.description LIKE ? OR p.category LIKE ? OR p.batch_number LIKE ?)');
    const searchTerm = `%${search.trim()}%`;
    params.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  // Sorting
  switch (sort) {
    case 'popular':
    case 'trending':
      query += ' ORDER BY p.is_trending DESC, p.created_at DESC';
      break;
    case 'stock':
      query += ' ORDER BY p.stock_quantity DESC';
      break;
    case 'name-asc':
      query += ' ORDER BY p.name ASC';
      break;
    case 'name-desc':
      query += ' ORDER BY p.name DESC';
      break;
    case 'newest':
    default:
      query += ' ORDER BY p.created_at DESC';
      break;
  }

  const offset = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
  query += ` LIMIT ${parseInt(limit)} OFFSET ${offset}`;

  const rows = db.prepare(query).all(...params);
  const products = rows.map(p => formatProduct(p));

  // Get total count for pagination metadata
  let countQuery = 'SELECT COUNT(DISTINCT p.id) as total FROM products p';
  if (joins.length > 0) {
    countQuery += ' ' + joins.join(' ');
  }
  if (conditions.length > 0) {
    countQuery += ' WHERE ' + conditions.join(' AND ');
  }
  const totalCountResult = db.prepare(countQuery).get(...params);
  const total = totalCountResult ? totalCountResult.total : 0;

  return res.json({
    products,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: Math.ceil(total / parseInt(limit))
  });
});

// GET categories & available filter options
router.get('/meta/filters', (req, res) => {
  const categories = db.prepare('SELECT DISTINCT category FROM products WHERE category IS NOT NULL ORDER BY category ASC').all().map(c => c.category);
  const colours = db.prepare('SELECT DISTINCT colour_name FROM product_colours ORDER BY colour_name ASC').all().map(c => c.colour_name);
  const sizes = db.prepare('SELECT DISTINCT size_name FROM product_sizes ORDER BY size_name ASC').all().map(s => s.size_name);

  return res.json({
    categories,
    colours,
    sizes
  });
});

// GET product by ID or Slug
router.get('/:idOrSlug', (req, res) => {
  const { idOrSlug } = req.params;
  const p = db.prepare('SELECT * FROM products WHERE id = ? OR slug = ?').get(idOrSlug, idOrSlug);

  if (!p) {
    return res.status(404).json({ error: 'Product not found' });
  }

  return res.json({ product: formatProduct(p) });
});

export default router;
