import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Send } from 'lucide-react';
import { Button } from '../common/Button';

export function Hero({ onOpenEnquiry }) {
  return (
    <section className="relative bg-[#0F172A] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Copy, CTAs, Trust Metrics */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1E293B]/80 border border-slate-700/80 text-[#B97832] text-[11px] font-mono font-semibold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#B97832]" />
              <span>Direct Manufacturer B2B Wholesale Platform</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              WHOLESALE,<br />
              WITHOUT THE <span className="text-[#B97832] italic font-normal">FRICTION.</span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl font-light leading-relaxed">
              Discover curated apparel for retailers, resellers, and global businesses. Browse verified stock, inspect batch details, and place wholesale orders with confidence.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/catalogue">
                <Button size="lg" variant="gold" icon={ArrowRight} className="font-bold shadow-md">
                  Explore Catalogue
                </Button>
              </Link>
              <Button
                onClick={onOpenEnquiry}
                size="lg"
                variant="outline"
                icon={Send}
                className="text-white border-slate-600 hover:border-white hover:bg-white hover:text-[#0F172A] font-semibold"
              >
                Send Wholesale Enquiry
              </Button>
            </div>

            {/* Trust Metrics Row */}
            <div className="pt-8 border-t border-slate-800 grid grid-cols-3 gap-4 text-slate-400 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-white font-bold text-base sm:text-lg font-display block">30 PCS</span>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Minimum Order</span>
              </div>
              <div className="space-y-1">
                <span className="text-white font-bold text-base sm:text-lg font-display block">100% Verified</span>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Batch Inspections</span>
              </div>
              <div className="space-y-1">
                <span className="text-white font-bold text-base sm:text-lg font-display block">Pan-India</span>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 block">Express Dispatch</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual & Overlay Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Fashion Editorial Card */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl aspect-[4/5] group bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1000"
                  alt="UNICOM FAB Luxury Apparel Line"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-85" />

                {/* Floating Batch Spec Card */}
                <div className="absolute bottom-5 left-5 right-5 bg-[#0F172A]/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 text-white space-y-1 shadow-xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#B97832]">
                    <span>BATCH 2026-08-HEAVY</span>
                    <span className="px-2 py-0.5 bg-emerald-950/90 text-emerald-400 border border-emerald-800/60 rounded text-[10px] font-bold">
                      IN STOCK
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-white">450 GSM Heavy French Terry Hoodie</h4>
                  <p className="text-xs text-slate-300 font-mono">Wholesale: ₹1,150 / PC • MOQ 30 PCS</p>
                </div>
              </div>

              {/* Floating GST Verified Card */}
              <div className="hidden sm:block absolute -top-5 -right-5 bg-white text-[#101828] p-4 rounded-2xl shadow-xl border border-[#E7E3DA] max-w-[210px] z-20">
                <div className="flex items-center gap-1.5 text-[#B97832] font-bold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#B97832]" /> GST VERIFIED
                </div>
                <p className="text-[11px] text-[#667085] leading-snug font-normal">
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
