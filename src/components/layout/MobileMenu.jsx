import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X, Search, ShieldCheck, LogOut, ShoppingBag, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export function MobileMenu({ isOpen, onClose, navLinks }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, promptGoogleAuth, logout, isAdmin } = useAuth();
  const { totalQuantityCount } = useCart();
  const [searchQuery, setSearchQuery] = React.useState('');

  // Lock background scroll when full-screen mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onClose();
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 w-full h-full bg-white flex flex-col justify-between transition-transform duration-300 ease-out lg:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
      }`}
      aria-label="Mobile Navigation Menu"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Header Bar inside Drawer */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E7E3DA] bg-[#FAF9F6]">
        <Link to="/" onClick={onClose} className="flex items-center gap-2">
          <img
            src="/unicom-fab-main-logo.png"
            alt="UNICOM FAB"
            className="h-7 sm:h-8 w-auto object-contain rounded-lg shadow-2xs"
          />
        </Link>

        <button
          onClick={onClose}
          className="p-2 rounded-full text-slate-700 hover:bg-[#F5F3EE] transition-colors"
          aria-label="Close Navigation Menu"
        >
          <X className="w-6 h-6 text-[#101828]" />
        </button>
      </div>

      {/* Drawer Main Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {/* Search Bar Mobile */}
        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            placeholder="Search products or batch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F5F3EE] border border-[#E7E3DA] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#101828] focus:bg-white"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
        </form>

        {/* User Account Card if Logged In */}
        {user && (
          <div className="p-4 bg-[#F5F3EE] border border-[#E7E3DA] rounded-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    if (e.currentTarget.nextSibling) {
                      e.currentTarget.nextSibling.style.display = 'flex';
                    }
                  }}
                  className="w-10 h-10 rounded-full object-cover border border-[#E7E3DA] shrink-0"
                />
              ) : null}
              <div
                className="w-10 h-10 rounded-full bg-[#101828] text-white font-bold flex items-center justify-center text-sm shrink-0"
                style={{ display: user.picture ? 'none' : 'flex' }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#101828] truncate">{user.name}</p>
                <p className="text-xs text-[#667085] truncate">{user.email}</p>
              </div>
            </div>
            {isAdmin && (
              <span className="px-2 py-1 bg-amber-100 text-[#B97832] text-[10px] font-bold font-mono rounded">
                ADMIN
              </span>
            )}
          </div>
        )}

        {/* Navigation Links (Sharp & Smooth Mobile Font Sizing) */}
        <nav className="space-y-1.5 pt-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm sm:text-base font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#101828] text-white font-bold'
                    : 'text-[#101828] hover:bg-[#F5F3EE]'
                }`}
              >
                <span>{link.name}</span>
                {link.path === '/my-order' && (
                  <span className="inline-flex items-center justify-center min-w-[20px] px-2 py-0.5 bg-[#B97832] text-white text-[11px] font-bold rounded-full">
                    {totalQuantityCount > 0 ? `${totalQuantityCount} PCS` : '0'}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Drawer Footer Actions */}
      <div className="p-6 border-t border-[#E7E3DA] bg-[#FAF9F6] space-y-3">
        {isAdmin && (
          <Link
            to="/admin"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 p-3 bg-[#101828] text-luxury-gold font-semibold rounded-xl text-xs"
          >
            <ShieldCheck className="w-4 h-4 text-[#B97832]" /> Access Admin Control Portal
          </Link>
        )}

        {!user ? (
          <Button
            onClick={() => {
              onClose();
              promptGoogleAuth('/my-order');
            }}
            variant="primary"
            className="w-full font-bold py-3"
          >
            Sign In with Google
          </Button>
        ) : (
          <Button
            onClick={() => {
              logout();
              onClose();
            }}
            variant="outline"
            className="w-full text-xs py-2.5 text-red-600 border-red-200 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-1" /> Sign Out
          </Button>
        )}

        <div className="text-center pt-2">
          <p className="text-[11px] text-[#667085] font-mono uppercase tracking-widest">
            UNICOM FAB • Verified B2B Wholesale Supply
          </p>
        </div>
      </div>
    </div>
  );
}
