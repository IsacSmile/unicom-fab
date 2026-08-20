import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ShoppingBag, ShieldCheck, LogIn, User, HelpCircle, PhoneCall } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export function MobileMenu({ isOpen, onClose, navLinks }) {
  const location = useLocation();
  const { user, promptGoogleAuth, logout, isAdmin } = useAuth();
  const { totalQuantityCount } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-brand-950/60 backdrop-blur-xs transition-opacity" />

      {/* Drawer Content */}
      <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-up">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-brand-950 text-white">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-luxury-gold font-serif font-bold text-lg">
                U
              </div>
              <span className="font-serif font-bold text-lg text-white tracking-wide">UNICOM FAB</span>
            </div>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-300 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Badge */}
          {user && (
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
              {user.picture ? (
                <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full object-cover border" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-900 text-white font-bold flex items-center justify-center">
                  {user.name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-brand-900 truncate">{user.name}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
            </div>
          )}

          {/* Nav Links */}
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive ? 'bg-brand-900 text-white font-semibold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.path === '/my-order' && totalQuantityCount > 0 && (
                    <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                      {totalQuantityCount} PCS
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 space-y-3 bg-slate-50">
          {isAdmin && (
            <Link
              to="/admin"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 p-3 bg-amber-900 text-amber-100 font-semibold rounded-xl text-xs"
            >
              <ShieldCheck className="w-4 h-4" /> Admin Portal
            </Link>
          )}

          {!user ? (
            <Button
              onClick={() => {
                onClose();
                promptGoogleAuth('/my-order');
              }}
              variant="primary"
              className="w-full"
            >
              Sign In with Google
            </Button>
          ) : (
            <Button onClick={logout} variant="outline" className="w-full text-xs">
              Sign Out
            </Button>
          )}

          <div className="text-center pt-2">
            <p className="text-[11px] text-slate-400 font-mono">
              UNICOM FAB B2B Wholesale Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
