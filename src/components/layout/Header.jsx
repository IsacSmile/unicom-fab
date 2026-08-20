import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, LogOut, ShieldCheck, User } from 'lucide-react';
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
  const { totalQuantityCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
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
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 border-b border-[#E7E3DA] ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs py-3.5'
            : 'bg-[#FAF9F6] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 rounded-xl bg-[#101828] flex items-center justify-center text-[#B97832] font-serif font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
                  U
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl tracking-tight text-[#101828] leading-none">
                    UNICOM<span className="text-[#B97832]">FAB</span>
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-[#667085] uppercase leading-tight font-semibold mt-0.5">
                    B2B Wholesale
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
                      isActive ? 'text-[#101828] font-bold' : 'text-[#475467] hover:text-[#101828]'
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

            {/* Right Desktop: Search, Shopping Bag & Auth */}
            <div className="flex items-center gap-3">
              {/* Search Input Desktop */}
              <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative">
                <input
                  type="text"
                  placeholder="Search products or batch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-60 pl-9 pr-3 py-1.5 text-xs bg-[#F5F3EE] border border-[#E7E3DA] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#101828] focus:bg-white transition-all text-[#101828] placeholder:text-[#98A2B3]"
                />
                <Search className="w-3.5 h-3.5 text-[#667085] absolute left-3 top-2.5 pointer-events-none" />
              </form>

              {/* Shopping Bag / Cart Icon */}
              <Link
                to="/my-order"
                className="relative p-2 text-[#101828] hover:text-[#B97832] hover:bg-[#F5F3EE] rounded-xl transition-colors flex items-center justify-center group"
                title="View Wholesale Order"
                aria-label="View Wholesale Order"
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-105" />
                {totalQuantityCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#B97832] text-white text-[10px] font-bold rounded-full border-2 border-white shadow-xs animate-fade-in">
                    {totalQuantityCount}
                  </span>
                )}
              </Link>

              {/* User Account / Google Login Button Desktop */}
              <div className="hidden sm:block">
                {user ? (
                  <div className="relative group">
                    <button className="flex items-center gap-2 p-1.5 px-2.5 rounded-xl border border-[#E7E3DA] bg-white hover:bg-[#F5F3EE] transition-colors">
                      {user.picture ? (
                        <img
                          src={user.picture}
                          alt={user.name}
                          className="w-6 h-6 rounded-full object-cover border border-[#E7E3DA]"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-[#101828] text-white text-xs font-bold flex items-center justify-center">
                          {user.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-xs font-semibold text-[#101828] max-w-[90px] truncate">
                        {user.name.split(' ')[0]}
                      </span>
                    </button>

                    {/* Account Dropdown Menu */}
                    <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-[#E7E3DA] py-1 hidden group-hover:block z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-[#E7E3DA]">
                        <p className="text-xs font-bold text-[#101828] truncate">{user.name}</p>
                        <p className="text-[11px] text-[#667085] truncate">{user.email}</p>
                      </div>
                      {isAdmin ? (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#B97832] hover:bg-[#F5F3EE]"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#B97832]" /> Admin Portal
                        </Link>
                      ) : (
                        <Link
                          to="/my-order"
                          className="flex items-center gap-2 px-4 py-2 text-xs text-[#101828] hover:bg-[#F5F3EE]"
                        >
                          <ShoppingBag className="w-4 h-4 text-[#667085]" /> My Orders
                        </Link>
                      )}
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 text-left border-t border-[#E7E3DA]"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => promptGoogleAuth('/my-order')}
                    className="inline-flex items-center gap-2 bg-[#101828] text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold hover:bg-black transition-colors shadow-xs"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Sign in with Google</span>
                  </button>
                )}
              </div>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-[#101828] hover:bg-[#F5F3EE] transition-colors"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Mobile Drawer (Right to Left) */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </header>
  );
}
