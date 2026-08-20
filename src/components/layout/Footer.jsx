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
    <footer className="bg-white text-slate-700 pt-16 pb-12 border-t border-slate-200/90 font-sans relative overflow-hidden font-neue">
      {/* Background Subtle Golden Ambient Glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-t from-[#B97832]/8 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Top Section: Newsletter / Dispatch Alerts & Brand Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-200/80 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B97832]/10 border border-[#B97832]/20 text-[#B97832] text-[10px] font-mono uppercase tracking-widest font-bold">
              <Award className="w-3.5 h-3.5 text-[#B97832]" />
              <span>DIRECT WHOLESALE DISPATCH ALERTS</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900">
              Stay ahead of new garment batch drops & stock releases.
            </h3>
            <p className="text-sm text-slate-500 font-light max-w-lg">
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
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#B97832] focus:border-[#B97832] focus:bg-white transition-all shadow-2xs"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
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

        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200/80">
          
          {/* Column 1: Brand Info & Quality Assurance */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <img
                src="/unicom-fab-main-logo.png"
                alt="UNICOM FAB"
                className="h-9 w-auto object-contain rounded-lg shadow-2xs group-hover:scale-105 transition-transform"
              />
            </Link>
            
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed font-light">
              Premium B2B wholesale apparel & textile platform connecting verified garment manufacturing mills with retailers, brand owners, and global resellers across India.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-[#B97832] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B97832]" /> GST REGISTERED
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
                <Truck className="w-3.5 h-3.5 text-slate-500" /> EXPRESS LOGISTICS
              </span>
            </div>
          </div>

          {/* Column 2: Catalogue & Collections */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#B97832] mb-4 font-bold">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <Link to="/catalogue" className="hover:text-slate-950 transition-colors">
                  All Catalogue
                </Link>
              </li>
              <li>
                <Link to="/catalogue?trending=true" className="hover:text-slate-950 transition-colors">
                  Trending Lines
                </Link>
              </li>
              <li>
                <Link to="/catalogue?newArrival=true" className="hover:text-slate-950 transition-colors">
                  New Batch Arrivals
                </Link>
              </li>
              <li>
                <Link to="/catalogue?category=Hoodies" className="hover:text-slate-950 transition-colors">
                  Heavyweight Hoodies
                </Link>
              </li>
              <li>
                <Link to="/catalogue?category=Shirts" className="hover:text-slate-950 transition-colors">
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
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <Link to="/my-order" className="hover:text-slate-950 transition-colors">
                  Review Cart Order
                </Link>
              </li>
              <li>
                <Link to="/about#enquiry" className="hover:text-slate-950 transition-colors">
                  Custom Fabric Enquiry
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Minimum Order: 30 PCS</span>
              </li>
              <li>
                <span className="text-slate-400">GSM Lab Inspected</span>
              </li>
              <li>
                <Link to="/admin" className="text-[#B97832] hover:text-amber-900 font-bold inline-flex items-center gap-1">
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
            <ul className="space-y-2.5 text-xs text-slate-600 font-medium">
              <li>
                <Link to="/about" className="hover:text-slate-950 transition-colors">
                  About UNICOM FAB
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-950 transition-colors">
                  Manufacturing Mills
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-950 transition-colors">
                  Quality Standards
                </Link>
              </li>
              <li>
                <a href="mailto:wholesale@unicomfab.com" className="hover:text-slate-950 transition-colors">
                  wholesale@unicomfab.com
                </a>
              </li>
              <li>
                <span className="text-slate-400">+91 1800-890-FAB (Toll Free)</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 pt-4">
          <p>© {new Date().getFullYear()} UNICOM FAB B2B Wholesale Platform. All rights reserved.</p>

          {/* Payment / Commercial Badges */}
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Lock className="w-3 h-3 text-[#B97832]" /> GST Invoiced
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <CreditCard className="w-3 h-3 text-[#B97832]" /> Commercial NEFT/RTGS
            </span>
            <span>•</span>
            <span className="font-semibold text-slate-700">Pan-India Dispatch</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
