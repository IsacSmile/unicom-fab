# UNICOM FAB — Enterprise B2B Wholesale Apparel Commerce Platform

**UNICOM FAB** is an ultra-premium, conversion-focused B2B wholesale commerce web application designed for garment manufacturers, textile mills, brand owners, resellers, and corporate buyers. Built with an editorial luxury aesthetic, the platform supports bulk order processing, strict Minimum Order Quantity (MOQ) validation, variant step increments, guest B2B enquiries, and an executive administration dashboard.

---

## 🌟 Key Features

### 🛍️ Storefront & Buyer Experience
- **Editorial Design System**: Deep obsidian charcoal palette, luxury gold accents, glassmorphism, Playfair Display typography, and micro-animations.
- **Dynamic Catalogue**: Filter products by category, size, colour, stock availability, and search queries with instant URL query string synchronization.
- **Product Specs & Gallery**: Max 4-image inspection viewer, colour variant selector, size batch picker, line subtotal calculation, and step quantity controls enforcing MOQs (e.g. 30 → 35 → 40 PCS).
- **Frictionless Guest Browsing & Checkout**:
  - Visitors can browse products, select variants, add items to cart, and fill out shipping address forms **without any mandatory initial sign-in**.
  - **Google Sign-In** is prompted at checkout time when placing the purchase order.
- **Guest B2B Enquiries**: Unauthenticated visitors can submit custom volume quotation requests for bespoke GSM, branding, or orders > 1,000 PCS.

### 🛡️ Admin Management Panel (`/admin`)
- **Executive Overview Dashboard**: Total catalogue stats, total orders, pending orders, total enquiries, low-stock warnings, and recent order feeds.
- **Product Inventory Control**:
  - Full product table with search, edit, delete, and **1-click Trending / New Arrival toggle switches**.
  - Product Creation & Editing Modal enforcing a strict **4-image URL maximum limit**.
- **Wholesale Order Fulfillment**: Review buyer company details, shipping address, line item breakdown, and update order status (`Pending`, `Confirmed`, `Processing`, `Completed`, `Cancelled`).
- **Lead & Enquiry Management**: Review and track guest enquiry leads (`New`, `Contacted`, `In Progress`, `Resolved`).

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons, React Router DOM v6
- **Backend API**: Node.js, Express.js, JWT (JSON Web Tokens), Bcryptjs
- **Database**: SQLite via `better-sqlite3` (with relational foreign key constraints)
- **Styling & Theme**: Custom Tailwind configuration with luxury typography & responsive glassmorphism

---

## 📁 Project Structure

```
unicom-fab/
├── public/                 # Static assets & favicon
├── server/
│   ├── db/
│   │   ├── database.js     # SQLite connection & database initialization
│   │   ├── schema.sql      # Tables (users, products, orders, order_items, enquiries, admin_settings)
│   │   └── seed.js        # Seed script pre-populating 20 wholesale products
│   ├── middleware/
│   │   └── authMiddleware.js # JWT & Admin access control middleware
│   ├── routes/
│   │   ├── admin.js        # Admin metrics, product CRUD, order & enquiry updates
│   │   ├── auth.js         # Google OAuth & Admin authentication
│   │   ├── enquiries.js    # Guest enquiry submissions
│   │   ├── orders.js       # Wholesale purchase order placement with MOQ validation
│   │   └── products.js     # Catalogue querying, filtering, and single product fetch
│   └── index.js            # Express API server entrypoint (Port 5000)
├── src/
│   ├── components/
│   │   ├── admin/          # Admin Sidebar, Modals (Product, Order Specs, Enquiry)
│   │   ├── auth/           # Google Auth Modal
│   │   ├── common/         # Button, Badge, Modal, EmptyState, Skeleton Loaders
│   │   ├── enquiry/        # Guest Enquiry Modal
│   │   ├── home/           # Hero, Brand Marquee, Feature Grid, Trust Section
│   │   ├── layout/         # Header, Announcement Bar, Mobile Menu, Footer
│   │   └── products/       # Product Card, Grid, Gallery, Quantity/Size/Colour Selectors
│   ├── context/
│   │   ├── AuthContext.jsx # Authentication state & session handling
│   │   ├── CartContext.jsx # Persistent wholesale cart state with MOQ rules
│   │   └── ToastContext.jsx# Centralized UI notifications
│   ├── lib/
│   │   ├── api.js          # API client library
│   │   └── utils.js        # Currency formatters & stock status helpers
│   ├── pages/
│   │   ├── admin/          # Dashboard, Products, Orders, Enquiries pages
│   │   ├── About.jsx       # Company overview & commercial logistics info
│   │   ├── Catalogue.jsx   # Product catalogue browsing page
│   │   ├── Home.jsx        # Homepage
│   │   ├── Login.jsx       # Google Auth & Admin sign-in portal
│   │   ├── MyOrder.jsx     # Wholesale purchasing cart & checkout page
│   │   ├── NotFound.jsx    # 404 error page
│   │   └── ProductDetail.jsx # Product specs & order page
│   ├── App.jsx             # Main Router & Layout wrapper
│   ├── index.css           # Global Tailwind CSS & custom utilities
│   └── main.jsx            # React root entrypoint
├── .env.example            # Environment variable template
├── package.json            # Dependencies & npm scripts
├── tailwind.config.js      # Tailwind design system configuration
└── vite.config.js          # Vite config & API proxy settings
```

---

## ⚡ Quick Start & Local Setup

### 1. Clone the Repository
```bash
git clone git@github.com:IsacSmile/unicom-fab.git
cd unicom-fab
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your environment variables:
```bash
cp .env.example .env
```

### 4. Seed the Database
Populate SQLite database with initial product catalogue data:
```bash
npm run db:seed
```

### 5. Run the Application
Start both Express API (Port 5000) and Vite Frontend (Port 3011) concurrently:
```bash
npm run dev
```

Open your browser and visit:
- **Frontend App**: `http://localhost:3011`
- **Admin Control Panel**: `http://localhost:3011/admin`

---

## 🔑 Default Admin Credentials

To access the `/admin` portal:
- **Email / ID**: `admin@unicomfab.com`
- **Password**: `admin123`

---

## 📜 Available NPM Scripts

- `npm run dev` — Concurrently launches Express API server and Vite frontend.
- `npm run client` — Runs Vite development server on port 3011.
- `npm run server` — Runs Node.js Express server on port 5000.
- `npm run db:seed` — Re-initializes and seeds SQLite database.
- `npm run build` — Builds production-optimized bundle in `dist/`.

---

## 📄 License
This project is licensed under the MIT License.
