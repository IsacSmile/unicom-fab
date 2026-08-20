import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

const HERO_SHOWCASE_SLIDES = [
  {
    image: '/hero-apparel-showcase.png',
    title: 'Minimalist Luxury Apparel Lines',
    batch: 'BATCH 2026-AUTUMN',
    price: '₹680 - ₹1,450',
    moq: '30 PCS',
  },
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    title: 'Italian Linen & Resort Wear Collection',
    batch: 'BATCH 2026-SUMMER',
    price: '₹450 - ₹1,120',
    moq: '50 PCS',
  },
  {
    image: '/kolkata-factory-story.png',
    title: 'Precision Tailored Outerwear & Blazers',
    batch: 'BATCH 2026-CRAFT',
    price: '₹950 - ₹2,300',
    moq: '25 PCS',
  },
  {
    image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80',
    title: 'Heavyweight Loopback Hoodies & Fleeces',
    batch: 'BATCH 2026-WINTER',
    price: '₹550 - ₹1,280',
    moq: '40 PCS',
  },
];

export function Hero({ onOpenEnquiry }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SHOWCASE_SLIDES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SHOWCASE_SLIDES[currentSlide];

  return (
    <section className="relative bg-[#FAF9F6] text-slate-900 overflow-hidden py-6 sm:py-8 lg:py-10 flex-1 flex items-center font-neue">
      {/* Background Soft Golden Warm Ambient Halo */}
      <div className="pointer-events-none absolute top-0 left-1/3 w-[600px] h-[350px] bg-gradient-to-b from-[#B97832]/10 via-amber-200/10 to-transparent blur-3xl rounded-full -z-0" />
      <div className="pointer-events-none absolute bottom-0 right-10 w-[500px] h-[300px] bg-gradient-to-tl from-[#B97832]/8 to-transparent blur-3xl rounded-full -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Minimalist B2B Headline & Actions */}
          <div className="lg:col-span-7 space-y-4 lg:space-y-5 text-left">
            
            {/* Minimal Eyebrow Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#B97832]/30 text-[#B97832] text-[11px] font-mono font-semibold uppercase tracking-widest shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B97832]" />
              <span>DIRECT MANUFACTURER B2B</span>
            </div>

            {/* Premium Concise Headline */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-950 leading-tight sm:leading-snug">
              Wholesale Apparel Manufacturing, <br className="hidden sm:inline" />
              <span className="text-[#B97832] font-normal italic">
                Direct From Factory.
              </span>
            </h1>

            {/* Concise Description */}
            <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-lg">
              Inspected wholesale apparel lines with transparent tier pricing and direct Pan-India logistics.
            </p>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link to="/catalogue" className="w-full sm:w-auto">
                <Button size="lg" variant="gold" icon={ArrowRight} className="w-full sm:w-auto font-bold shadow-md py-3 px-6 text-sm rounded-xl">
                  Explore Catalogue
                </Button>
              </Link>
              <Button
                onClick={onOpenEnquiry}
                size="lg"
                variant="outline"
                icon={Send}
                className="w-full sm:w-auto text-slate-900 border-slate-300 bg-white hover:bg-slate-950 hover:text-white hover:border-slate-950 font-semibold py-3 px-5 text-sm rounded-xl transition-all shadow-2xs"
              >
                Send Enquiry
              </Button>
            </div>

            {/* Key Commercial Metrics Row */}
            <div className="pt-3 border-t border-slate-200/80 grid grid-cols-3 gap-3 text-slate-600 text-xs font-mono">
              <div className="space-y-0.5">
                <span className="text-slate-950 font-bold text-sm sm:text-base font-display block">30 PCS</span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 block">Low MOQ</span>
              </div>
              <div className="space-y-0.5 border-l border-slate-200 pl-3">
                <span className="text-slate-950 font-bold text-sm sm:text-base font-display block">100% Inspected</span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 block">Quality Verified</span>
              </div>
              <div className="space-y-0.5 border-l border-slate-200 pl-3">
                <span className="text-slate-950 font-bold text-sm sm:text-base font-display block">Pan-India</span>
                <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-slate-500 block">Direct Shipping</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Luxury Showcase Visual */}
          <div className="lg:col-span-5 relative mt-2 lg:mt-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              
              {/* Luxury Apparel Showcase Card */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl aspect-square lg:max-h-[380px] xl:max-h-[420px] group bg-white mx-auto">
                
                {/* 3-Second Auto-Cycling Slideshow Images */}
                {HERO_SHOWCASE_SLIDES.map((slide, idx) => (
                  <img
                    key={idx}
                    src={slide.image}
                    alt={slide.title}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                      idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                    }`}
                  />
                ))}
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />

                {/* Top Slide Indicator Dots */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-slate-950/50 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                  {HERO_SHOWCASE_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? 'w-5 bg-[#B97832]' : 'w-1.5 bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Floating Live Batch Spec Card Overlay */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-slate-950/90 backdrop-blur-md p-3 sm:p-3.5 rounded-xl border border-slate-800 text-white space-y-1 shadow-2xl transition-all duration-500">
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#B97832]">
                    <span className="flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#B97832]" /> {activeSlide.batch}
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-950/90 text-emerald-400 border border-emerald-800/80 rounded-md text-[9px] font-bold tracking-wider">
                      IN STOCK
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-white transition-all">
                    {activeSlide.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono pt-0.5">
                    <span>Wholesale: <strong className="text-white font-display">{activeSlide.price}</strong> / PC</span>
                    <span className="text-[9px] text-amber-400 bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-800/50">MOQ {activeSlide.moq}</span>
                  </div>
                </div>
              </div>

              {/* Floating GST Commercial Badge Top Right */}
              <div className="hidden xl:flex absolute -top-3 -right-3 bg-white text-slate-900 p-3 rounded-2xl shadow-2xl border border-slate-200 max-w-[200px] z-20 items-start gap-2">
                <div className="p-1.5 bg-amber-50 rounded-xl text-[#B97832] shrink-0 border border-amber-200">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold text-slate-950 flex items-center gap-1">
                    GST Invoice <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  </span>
                  <p className="text-[9px] text-slate-500 leading-tight">
                    Instant B2B tax invoice & credit input.
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
