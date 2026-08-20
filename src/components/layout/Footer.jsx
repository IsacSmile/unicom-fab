import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Shield, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-brand-950 text-slate-300 pt-16 pb-8 border-t border-brand-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-luxury-gold flex items-center justify-center text-brand-950 font-serif font-bold text-xl">
                U
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white">
                UNICOM<span className="text-luxury-gold">FAB</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Ultra-premium wholesale B2B platform connecting top apparel manufacturers with retailers, resellers, and global brands. Engineered for low-friction bulk ordering, guaranteed batch quality, and transparent stock visibility.
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-luxury-gold">
                <Shield className="w-4 h-4" /> VERIFIED B2B SUPPLIER
              </span>
              <span>•</span>
              <span>GST REGISTERED</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-luxury-gold mb-4 font-semibold">
              Storefront
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
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
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Company & Logistics
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Wholesale & Terms */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-luxury-gold mb-4 font-semibold">
              Wholesale Info
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/my-order" className="hover:text-white transition-colors">
                  My Wholesale Order
                </Link>
              </li>
              <li>
                <Link to="/about#enquiry" className="hover:text-white transition-colors">
                  Guest Enquiry Form
                </Link>
              </li>
              <li>
                <span className="text-slate-400">Minimum Order: 30 PCS</span>
              </li>
              <li>
                <span className="text-slate-400">Batch Inspections Passed</span>
              </li>
              <li>
                <Link to="/admin" className="text-amber-400 hover:text-amber-300 font-medium inline-flex items-center gap-1">
                  Admin Portal <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-luxury-gold mb-4 font-semibold">
              Business Support
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>wholesale@unicomfab.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-luxury-gold shrink-0" />
                <span>+91 1800-890-FAB (Toll Free)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                <span>Textile Park Hub, Sector 62, NCR - 201301</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 UNICOM FAB Wholesale B2B Commerce Platform. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300">Wholesale Purchase Terms</a>
            <a href="#compliance" className="hover:text-slate-300">GST Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
