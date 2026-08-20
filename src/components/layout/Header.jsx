import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, LogOut, ShieldCheck, User, X } from 'lucide-react';
import { AnnouncementBar } from './AnnouncementBar';
import { MobileMenu } from './MobileMenu';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

function UserAvatar({ picture, name, size = 'sm' }) {
  const [imgError, setImgError] = useState(false);
  const initial = name && name.trim() ? name.trim().charAt(0).toUpperCase() : 'U';

  const isLarge = size === 'lg';
  const dimensionClass = isLarge ? 'w-9 h-9 min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px]' : 'w-7 h-7 min-w-[28px] min-h-[28px] max-w-[28px] max-h-[28px]';

  if (picture && !imgError) {
    return (
      <img
        src={picture}
        alt={name || 'User'}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${dimensionClass} rounded-full object-cover border border-slate-300 ring-2 ring-emerald-500/30 shrink-0 block`}
      />
    );
  }

  return (
    <div
      className={`${dimensionClass} ${isLarge ? 'text-xs' : 'text-[11px]'} rounded-full bg-slate-950 text-white font-bold flex items-center justify-center border border-slate-300 ring-2 ring-emerald-500/30 shrink-0 shadow-xs`}
    >
      {initial}
    </div>
  );
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, promptGoogleAuth, isAdmin } = useAuth();
  const { totalQuantityCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowMobileSearch(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'About', path: '/about' },
    { name: 'My Order', path: '/my-order' },
  ];

  return (
    <header className="sticky top-1.5 z-40 w-full px-2 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300 font-neue">
      {/* Unified Single-Border Header Container (0 Double-Line Artifacts) */}
      <div className="rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200/90 bg-white/95 backdrop-blur-md transition-all duration-300">
        
        {/* Top Announcement Bar (Rounded Top Clip) */}
        <div className="rounded-t-2xl sm:rounded-t-3xl overflow-hidden">
          <AnnouncementBar />
        </div>

        {/* Main Navigation Bar */}
        <div
          className={`w-full transition-all duration-300 px-3.5 sm:px-6 rounded-b-2xl sm:rounded-b-3xl ${
            isScrolled ? 'py-2 sm:py-2.5 bg-white/95' : 'py-2.5 sm:py-3 bg-[#FAF9F6]/80'
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/" className="flex items-center gap-2 group">
                <img
                  src="/unicom-fab-main-logo.png"
                  alt="UNICOM FAB"
                  className="h-8 sm:h-9 w-auto object-contain rounded-lg shadow-2xs group-hover:scale-105 transition-transform"
                />
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
                      isActive ? 'text-slate-900 font-bold' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B97832] rounded-full transition-all duration-300" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Desktop & Mobile Action Icons */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search Input Desktop */}
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-40 lg:w-52 pl-8 pr-3 py-1 text-xs bg-slate-100/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400 font-neue"
                />
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2 pointer-events-none stroke-[1.75]" />
              </form>

              {/* Mobile Search Icon Button */}
              <button
                type="button"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden p-1.5 text-slate-900 hover:text-[#B97832] hover:bg-slate-100/80 rounded-xl transition-colors flex items-center justify-center border border-slate-200/80 bg-white/80"
                aria-label="Toggle Mobile Search"
                title="Search products"
              >
                <Search className="w-5 h-5 stroke-[1.75]" />
              </button>

              {/* Cart / Wholesale Order Box Link */}
              <Link
                to="/my-order"
                className="p-1.5 text-slate-900 hover:text-[#B97832] hover:bg-slate-100/80 rounded-xl transition-all flex items-center gap-1.5 relative border border-slate-200/80 bg-white/80 shadow-2xs group"
                aria-label="View Wholesale Cart Order"
                title="My Wholesale Order"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.75] text-slate-900 group-hover:text-[#B97832] transition-colors" />
                {totalQuantityCount > 0 ? (
                  <span className="bg-[#B97832] text-white text-[10px] font-bold font-mono px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none shadow-xs">
                    {totalQuantityCount}
                  </span>
                ) : (
                  <span className="hidden sm:inline-block text-[11px] font-semibold text-slate-500 group-hover:text-slate-900 pr-1">
                    Order
                  </span>
                )}
              </Link>

              {/* Account Icon Button & Hover Card */}
              <div className="relative group">
                <button
                  onClick={() => {
                    if (!user) promptGoogleAuth('/my-order');
                  }}
                  className="p-1.5 text-slate-900 hover:text-[#B97832] hover:bg-slate-100/80 rounded-xl transition-colors flex items-center justify-center relative"
                  title={user ? user.name : "Sign in with Google"}
                  aria-label="User Account"
                >
                  {user ? (
                    <UserAvatar picture={user.picture} name={user.name} size="sm" />
                  ) : (
                    <User className="w-5 h-5 stroke-[1.75]" />
                  )}
                  {user && (
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                  )}
                </button>

                {/* User Profile Hover Dropdown Popup */}
                {user && (
                  <div className="absolute right-0 top-full pt-2 w-72 hidden group-hover:block z-50">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3.5 space-y-3 font-neue animate-fade-in backdrop-blur-md overflow-hidden">
                      
                      {/* Logo & User Email Profile Card */}
                      <div className="p-3 bg-[#FAF9F6] border border-slate-200/80 rounded-xl space-y-2.5 overflow-hidden">
                        <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/60 min-w-0">
                          <img
                            src="/unicom-fab-main-logo.png"
                            alt="UNICOM FAB"
                            className="h-6 w-auto max-w-[130px] object-contain rounded-md shrink-0"
                          />
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
                            Verified
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 pt-0.5 min-w-0">
                          <UserAvatar picture={user.picture} name={user.name} size="lg" />
                          <div className="flex flex-col min-w-0">
                            <p className="text-xs font-bold text-slate-950 truncate leading-tight">{user.name}</p>
                            <p className="text-[11px] text-slate-500 truncate leading-tight font-mono">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Links */}
                      <div className="space-y-1">
                        <Link
                          to="/my-order"
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 hover:text-[#B97832] transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <ShoppingBag className="w-4 h-4 text-slate-500" />
                            <span>My Order</span>
                          </span>
                          <span className="px-2 py-0.5 bg-[#B97832] text-white text-[10px] font-bold rounded-full">
                            {totalQuantityCount > 0 ? `${totalQuantityCount} PCS` : '0'}
                          </span>
                        </Link>

                        {isAdmin && (
                          <Link
                            to="/admin"
                            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#B97832] hover:bg-amber-50 transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-[#B97832]" />
                              <span>Admin Portal</span>
                            </span>
                            <span className="text-[9px] font-mono uppercase bg-amber-100 px-1.5 py-0.5 rounded font-bold">Admin</span>
                          </Link>
                        )}
                      </div>

                      {/* Sign Out Button */}
                      <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-50 hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 rounded-xl text-xs font-semibold transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>



              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-1.5 rounded-xl text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5.5 h-5.5 stroke-[1.75]" />
              </button>
            </div>
          </div>

          {/* Expandable Mobile Search Bar */}
          {showMobileSearch && (
            <div className="md:hidden px-3.5 pb-2.5 pt-1 animate-fade-in border-t border-slate-100">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search catalogue products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-8 py-2 text-xs bg-slate-100/90 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B97832] focus:bg-white text-slate-900 placeholder:text-slate-400 font-neue"
                />
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5 pointer-events-none stroke-[1.75]" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Full-Screen Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </header>
  );
}
