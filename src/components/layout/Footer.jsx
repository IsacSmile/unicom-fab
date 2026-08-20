import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ShieldCheck, Truck, Lock, CreditCard, ArrowUpRight, Award } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      addToast('Thank you for subscribing to UNICOM FAB B2B Stock Dispatch Alerts!', 'success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#0F172A] text-slate-300 pt-16 pb-12 border-t border-slate-800 font-sans relative overflow-hidden">
      {/* Background Subtle Golden Halo Ambient Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#B97832]/10 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Section: Newsletter / Dispatch Alerts & Brand Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[#B97832] text-[10px] font-mono uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-[#B97832]" />
              <span>DIRECT WHOLESALE DISPATCH ALERTS</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Stay ahead of new garment batch drops & stock releases.
            </h3>
            <p className="text-sm text-slate-400 font-light max-w-lg">
              Get immediate alerts when new GSM fabric weights, trending lines, and wholesale batch drops are made available.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md lg:ml-auto">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="Enter business email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900/90 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#B97832] focus:border-[#B97832] transition-all"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#B97832] text-white text-xs font-bold rounded-xl hover:bg-[#a06629] transition-colors shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Navigation Grid (Shopify Editorial Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand Info & Quality Assurance */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#101828] border border-slate-700 flex items-center justify-center text-[#B97832] font-serif font-bold text-xl shadow-xs group-hover:scale-105 transition-transform">
                U
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                UNICOM<span className="text-[#B97832]">FAB</span>
              </span>
            </Link>
            
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-light">
              Premium B2B wholesale apparel & textile platform connecting verified garment manufacturing mills with retailers, brand owners, and global resellers across India.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[#B97832]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B97832]" /> GST REGISTERED
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                <Truck className="w-3.5 h-3.5 text-slate-400" /> EXPRESS LOGISTICS
              </span>
            </div>
          </div>

          {/* Column 2: Catalogue & Collections */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#B97832] mb-4 font-bold">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/catalogue" className="hover:text-white transition-colors">
                  All Catalogue
                </Link>
              </li>
              <li>
                <Link to="/catalogue?trending=true" className="hover:text-white transition-colors">
                  Trending Lines
                </Link>
              </li>
              <li>
                <Link to="/catalogue?newArrival=true" className="hover:text-white transition-colors">
                  New Batch Arrivals
                </Link>
              </li>
              <li>
                <Link to="/catalogue?category=Hoodies" className="hover:text-white transition-colors">
                  Heavyweight Hoodies
                </Link>
              </li>
              <li>
                <Link to="/catalogue?category=Shirts" className="hover:text-white transition-colors">
                  Oxford Cotton Shirts
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Wholesale & Procurement */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#B97832] mb-4 font-bold">
              Wholesale Sourcing
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/my-order" className="hover:text-white transition-colors">
                  Review Cart Order
                </Link>
              </li>
              <li>
                <Link to="/about#enquiry" className="hover:text-white transition-colors">
                  Custom Fabric Enquiry
                </Link>
              </li>
              <li>
                <span className="text-slate-500">Minimum Order: 30 PCS</span>
              </li>
              <li>
                <span className="text-slate-500">GSM Lab Inspected</span>
              </li>
              <li>
                <Link to="/admin" className="text-[#B97832] hover:text-amber-400 font-semibold inline-flex items-center gap-1">
                  <span>Admin Control Portal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Corporate & Company */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#B97832] mb-4 font-bold">
              Corporate
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About UNICOM FAB
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Manufacturing Mills
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Quality Standards
                </Link>
              </li>
              <li>
                <a href="mailto:wholesale@unicomfab.com" className="hover:text-white transition-colors">
                  wholesale@unicomfab.com
                </a>
              </li>
              <li>
                <span className="text-slate-500">+91 1800-890-FAB (Toll Free)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar (Shopify Clean Standard) */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 pt-4">
          <p>© {new Date().getFullYear()} UNICOM FAB B2B Wholesale Platform. All rights reserved.</p>

          {/* Payment / Commercial Badges */}
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#B97832]" /> GST Invoiced
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-[#B97832]" /> Commercial NEFT/RTGS
            </span>
            <span>•</span>
            <span>Pan-India Dispatch</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
