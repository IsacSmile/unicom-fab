import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, MessageSquare, ArrowLeft, Settings, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminSidebar() {
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { name: 'Overview Stats', path: '/admin', icon: LayoutDashboard },
    { name: 'Products & Merchandising', path: '/admin/products', icon: Package },
    { name: 'Wholesale Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'B2B Enquiries', path: '/admin/enquiries', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 bg-brand-950 text-slate-300 min-h-screen p-5 flex flex-col justify-between border-r border-brand-800">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-brand-800">
          <img
            src="/unicom-fab-main-logo.png"
            alt="UNICOM FAB"
            className="h-8 w-auto object-contain rounded-lg shadow-2xs"
          />
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
    </aside>
  );
}
