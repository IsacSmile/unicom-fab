import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export function Hero({ onOpenEnquiry }) {
  return (
    <section className="relative bg-[#0B1120] text-white overflow-hidden py-12 sm:py-16 lg:py-20 border-b border-slate-800/80 font-neue">
      {/* Background Soft Golden & Sapphire Glow Effects */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[600px] h-[400px] bg-gradient-to-br from-[#B97832]/15 via-amber-500/5 to-transparent blur-3xl rounded-full -z-0" />
      <div className="pointer-events-none absolute bottom-0 right-10 w-[500px] h-[350px] bg-gradient-to-tl from-blue-900/10 to-transparent blur-3xl rounded-full -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Minimalist B2B Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Minimal Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-[#D4AF37] text-[11px] font-mono font-semibold uppercase tracking-widest backdrop-blur-md shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B97832]" />
              <span>DIRECT MANUFACTURER B2B WHOLESALE</span>
            </div>

            {/* Premium Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] sm:leading-[1.08]">
              WHOLESALE FABRICATION,<br />
              <span className="bg-gradient-to-r from-amber-200 via-[#B97832] to-amber-400 bg-clip-text text-transparent italic font-normal">
                WITHOUT THE FRICTION.
              </span>
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl font-light leading-relaxed">
              Curated apparel manufacturing lines for boutique retailers, brands, and enterprise resellers. Inspected batch standards, tier pricing, and direct Pan-India logistics.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/catalogue" className="w-full sm:w-auto">
                <Button size="lg" variant="gold" icon={ArrowRight} className="w-full sm:w-auto font-bold shadow-lg py-3.5 px-7 text-sm rounded-xl">
                  Explore Catalogue
                </Button>
              </Link>
              <Button
                onClick={onOpenEnquiry}
                size="lg"
                variant="outline"
                icon={Send}
                className="w-full sm:w-auto text-white border-slate-700 bg-slate-900/60 hover:bg-white hover:text-slate-950 hover:border-white font-semibold py-3.5 px-6 text-sm rounded-xl backdrop-blur-md transition-all"
              >
                Send Wholesale Enquiry
              </Button>
            </div>

            {/* Key Commercial Metrics Row */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-3 text-slate-400 text-xs font-mono">
              <div className="space-y-0.5">
                <span className="text-white font-bold text-sm sm:text-base font-display block">30 PCS</span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 block">Low MOQ Limit</span>
              </div>
              <div className="space-y-0.5 border-l border-slate-800 pl-3">
                <span className="text-white font-bold text-sm sm:text-base font-display block">100% Inspected</span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 block">Verified Batches</span>
              </div>
              <div className="space-y-0.5 border-l border-slate-800 pl-3">
                <span className="text-white font-bold text-sm sm:text-base font-display block">Pan-India</span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-400 block">Direct Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Luxury Showcase Visual */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Luxury Apparel Showcase Card */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-700/70 shadow-2xl aspect-[4/4.5] group bg-slate-900">
                <img
                  src="/hero-apparel-showcase.png"
                  alt="UNICOM FAB Luxury Apparel Manufacturing Line"
                  className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-90" />

                {/* Floating Live Batch Spec Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 bg-slate-950/90 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-slate-800 text-white space-y-1.5 shadow-2xl">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#B97832]">
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#B97832]" /> BATCH 2026-AUTUMN
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-950/90 text-emerald-400 border border-emerald-800/80 rounded-md text-[10px] font-bold tracking-wider">
                      IN STOCK
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-white">
                    Minimalist Luxury Apparel & Tailored Lines
                  </h4>
                  <div className="flex items-center justify-between text-xs text-slate-300 font-mono pt-0.5">
                    <span>Wholesale: <strong className="text-white font-display">₹680 - ₹1,450</strong> / PC</span>
                    <span className="text-[10px] text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/50">MOQ 30 PCS</span>
                  </div>
                </div>
              </div>

              {/* Floating GST Commercial Badge Top Right */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-white text-slate-900 p-3.5 rounded-2xl shadow-2xl border border-slate-200 max-w-[210px] z-20 items-start gap-2.5">
                <div className="p-2 bg-amber-50 rounded-xl text-[#B97832] shrink-0 border border-amber-200">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-950 flex items-center gap-1">
                    GST Invoice <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </span>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Instant B2B tax invoice & credit input for resellers.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
