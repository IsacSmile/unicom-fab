import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Layers, Award } from 'lucide-react';
import { Button } from '../common/Button';

export function Hero({ onOpenEnquiry }) {
  return (
    <section className="relative bg-brand-950 text-white overflow-hidden py-16 md:py-24 border-b border-brand-800">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-slate-700/20 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-900 border border-brand-700 text-luxury-gold text-xs font-mono font-semibold uppercase tracking-wider">
              <Award className="w-4 h-4 text-amber-400" />
              Direct Manufacturer B2B Wholesale Platform
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              WHOLESALE,<br />
              <span className="text-luxury-gold italic font-normal">WITHOUT THE FRICTION.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-light leading-relaxed">
              Discover curated apparel lines built for retailers, resellers, and global businesses. Browse verified stock, inspect batch specifications, and submit your bulk orders in minutes with guaranteed MOQ tiers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/catalogue">
                <Button size="lg" variant="gold" icon={ArrowRight} className="font-bold">
                  Explore Catalogue
                </Button>
              </Link>
              <Button
                onClick={onOpenEnquiry}
                size="lg"
                variant="outline"
                className="text-white border-slate-600 hover:border-white hover:bg-white hover:text-brand-950 font-semibold"
              >
                Send Wholesale Enquiry
              </Button>
            </div>

            {/* Key Value Micro Badges */}
            <div className="pt-8 border-t border-brand-800/80 grid grid-cols-3 gap-4 text-slate-400 text-xs font-mono">
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-base font-display">30 PCS</span>
                <span className="text-[11px] uppercase tracking-wider">Minimum Order</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-base font-display">100% Verified</span>
                <span className="text-[11px] uppercase tracking-wider">Batch Inspections</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white font-bold text-base font-display">Pan-India</span>
                <span className="text-[11px] uppercase tracking-wider">Express Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column Editorial Image Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image Card */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-brand-700/60 shadow-2xl aspect-[4/5] group">
                <img
                  src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1000"
                  alt="UNICOM FAB Luxury Heavyweight Hoodie Line"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent opacity-80" />

                {/* Overlaid Floating Batch Card */}
                <div className="absolute bottom-6 left-6 right-6 glass-dark p-4 rounded-xl text-white space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono text-luxury-gold">
                    <span>BATCH-2026-08-HEAVY</span>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 rounded text-[10px] font-bold">
                      IN STOCK
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-white">450 GSM Heavy French Terry Hoodie</h4>
                  <p className="text-xs text-slate-300 font-mono">Wholesale: ₹1,150 / PC • MOQ 30 PCS</p>
                </div>
              </div>

              {/* Decorative Accent Card */}
              <div className="hidden sm:block absolute -top-6 -right-6 bg-luxury-cream text-brand-950 p-4 rounded-2xl shadow-2xl border border-amber-300 max-w-[200px] z-20">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4 text-amber-700" /> GST Verified
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  Direct commercial invoices for registered resellers and enterprise businesses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
