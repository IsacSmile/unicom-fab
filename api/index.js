import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from '../server/routes/auth.js';
import productRoutes from '../server/routes/products.js';
import orderRoutes from '../server/routes/orders.js';
import enquiryRoutes from '../server/routes/enquiries.js';
import adminRoutes from '../server/routes/admin.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', adminRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', name: 'UNICOM FAB API Serverless', timestamp: new Date().toISOString() });
});

export default app;
