import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, LogOut, ShieldCheck } from 'lucide-react';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { Button } from '../common/Button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, promptGoogleAuth, isAdmin } = useAuth();
  const { totalItemsCount, totalQuantityCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'About', path: '/about' },
    { name: 'My Order', path: '/my-order' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      <AnnouncementBar />

      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-editorial py-3 border-b border-slate-200/80'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Mobile Menu Trigger & Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
                aria-label="Open Mobile Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-brand-950 flex items-center justify-center text-luxury-gold font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                  U
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl tracking-tight text-brand-950 leading-none">
                    UNICOM<span className="text-amber-700">FAB</span>
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase leading-tight font-semibold">
                    Wholesale Commerce
                  </span>
                </div>
              </Link>
            </div>

            {/* Middle: Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium transition-colors relative py-1 ${
                      isActive ? 'text-brand-950 font-semibold' : 'text-slate-600 hover:text-brand-950'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-950 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Search, Account / Auth & Cart */}
            <div className="flex items-center gap-3">
              {/* Search Bar Desktop */}
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
                <input
                  type="text"
                  placeholder="Search products or batch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-60 pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-950 focus:bg-white transition-all"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </form>

              {/* Order Cart Badge */}
              <Link
                to="/my-order"
                className="relative p-2 text-slate-700 hover:text-brand-950 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
                title="View Pending Wholesale Order"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalQuantityCount > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1 bg-amber-600 text-white text-[11px] font-bold rounded-full border-2 border-white">
                    {totalQuantityCount}
                  </span>
                )}
                <span className="hidden sm:inline text-xs font-semibold text-brand-900">
                  {totalQuantityCount > 0 ? `${totalQuantityCount} PCS` : 'Order'}
                </span>
              </Link>

              {/* User Account / Google Login Button */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-brand-900 text-white text-xs font-bold flex items-center justify-center">
                        {user.name.charAt(0)}
                      </div>
                    )}
                    <span className="hidden md:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                      {user.name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1 hidden group-hover:block z-50 animate-fade-in">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-brand-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded">
                          SYSTEM ADMIN
                        </span>
                      )}
                    </div>
                    {isAdmin ? (
                      <Link
                        to="/admin"
                        className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-amber-800 hover:bg-amber-50"
                      >
                        <ShieldCheck className="w-4 h-4" /> Admin Portal
                      </Link>
                    ) : (
                      <Link
                        to="/my-order"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                      >
                        <ShoppingBag className="w-4 h-4" /> My Wholesale Orders
                      </Link>
                    )}
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => promptGoogleAuth('/my-order')}
                  variant="primary"
                  size="sm"
                  icon={User}
                  className="rounded-full shadow-sm text-xs"
                >
                  <span className="hidden sm:inline">Sign in with Google</span>
                  <span className="sm:hidden">Sign In</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} navLinks={navLinks} />
    </header>
  );
}
