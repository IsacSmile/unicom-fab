import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GoogleAuthModal } from './components/auth/GoogleAuthModal';

// Pages
import { Home } from './pages/Home';
import { Catalogue } from './pages/Catalogue';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { MyEnquiry } from './pages/MyEnquiry';
import { MyOrder } from './pages/MyOrder';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

// Admin Pages
import { AdminDashboard } from './pages/admin/Dashboard';
import { AdminProducts } from './pages/admin/Products';
import { AdminOrders } from './pages/admin/Orders';
import { AdminEnquiries } from './pages/admin/Enquiries';

// Admin Route Guard
function ProtectedAdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-mono">Verifying credentials...</div>;
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Layout wrapper to conditionally hide header/footer on admin pages & render global ambient halo effects
function MainLayout({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#101828] font-sans antialiased selection:bg-[#B97832]/20 selection:text-[#101828] relative overflow-x-hidden">
      {/* Global Ambient Golden Halo Backdrops across the whole website */}
      {!isAdminRoute && (
        <>
          <div className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-[#B97832]/12 via-amber-200/10 to-transparent blur-3xl z-0" />
          <div className="pointer-events-none fixed top-1/3 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-[#B97832]/8 via-amber-100/10 to-transparent blur-3xl z-0" />
          <div className="pointer-events-none fixed bottom-10 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[#B97832]/6 via-amber-100/5 to-transparent blur-3xl z-0" />
        </>
      )}

      {!isAdminRoute && <Header />}
      <main className="flex-1 relative z-10">{children}</main>
      {!isAdminRoute && <Footer />}
      <GoogleAuthModal />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <MainLayout>
              <Routes>
                {/* Storefront Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/catalogue" element={<Catalogue />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/my-enquiry" element={<MyEnquiry />} />
                <Route path="/my-order" element={<MyOrder />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <ProtectedAdminRoute>
                      <AdminProducts />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/orders"
                  element={
                    <ProtectedAdminRoute>
                      <AdminOrders />
                    </ProtectedAdminRoute>
                  }
                />
                <Route
                  path="/admin/enquiries"
                  element={
                    <ProtectedAdminRoute>
                      <AdminEnquiries />
                    </ProtectedAdminRoute>
                  }
                />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </MainLayout>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
