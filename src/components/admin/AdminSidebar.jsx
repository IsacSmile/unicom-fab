import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, MessageSquare, ArrowLeft, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { name: 'Overview Stats', path: '/admin', icon: LayoutDashboard },
    { name: 'Products & Merchandising', path: '/admin/products', icon: Package },
    { name: 'Wholesale Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'B2B Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  ];

  const sidebarContent = (
    <div className="h-full p-5 flex flex-col justify-between space-y-6">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-5 border-b border-brand-800">
          <div className="flex items-center gap-3">
            <img
              src="/unicom-fab-main-logo.png"
              alt="UNICOM FAB"
              className="h-8 w-auto object-contain rounded-lg shadow-2xs"
            />
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
              Admin
            </span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-brand-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white font-bold shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-brand-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Back to Site */}
      <div className="pt-6 border-t border-brand-800 space-y-3">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Storefront
        </Link>
        <button
          onClick={logout}
          className="w-full py-2 bg-brand-900 hover:bg-red-950 text-red-300 rounded-lg text-xs font-semibold transition-colors text-left px-3"
        >
          Admin Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header Navigation */}
      <div className="lg:hidden bg-brand-950 text-slate-200 border-b border-brand-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-2.5">
          <img
            src="/unicom-fab-main-logo.png"
            alt="UNICOM FAB"
            className="h-7 w-auto object-contain rounded"
          />
          <span className="font-mono text-xs font-bold text-amber-400">ADMIN CONTROL</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-brand-900 text-slate-200 hover:text-white hover:bg-brand-800 focus:outline-none"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-72 bg-brand-950 text-slate-300 z-50 shadow-2xl overflow-y-auto">
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Desktop Sidebar (lg screens) */}
      <aside className="hidden lg:flex w-64 bg-brand-950 text-slate-300 min-h-screen border-r border-brand-800 shrink-0 sticky top-0 h-screen">
        {sidebarContent}
      </aside>
    </>
  );
}
