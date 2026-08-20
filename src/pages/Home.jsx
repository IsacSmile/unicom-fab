import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/home/Hero';
import { BrandMarquee } from '../components/home/BrandMarquee';
import { FeatureGrid } from '../components/home/FeatureGrid';
import { TrustSection } from '../components/home/TrustSection';
import { ProductGrid } from '../components/products/ProductGrid';
import { GuestEnquiryModal } from '../components/enquiry/GuestEnquiryModal';
import { Button } from '../components/common/Button';
import { api } from '../lib/api';
import { ArrowRight, Sparkles, TrendingUp, Send } from 'lucide-react';

export function Home() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);
  const [loadingNew, setLoadingNew] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [marqueeText, setMarqueeText] = useState('');

  useEffect(() => {
    async function loadHomeData() {
      try {
        const [trendRes, newRes, settingsRes] = await Promise.all([
          api.getProducts({ trending: 'true', limit: 8 }),
          api.getProducts({ newArrival: 'true', limit: 8 }),
          api.getSettings().catch(() => ({ settings: {} }))
        ]);

        setTrendingProducts(trendRes.products || []);
        setNewArrivals(newRes.products || []);

        if (settingsRes.settings && settingsRes.settings.brand_marquee) {
          setMarqueeText(settingsRes.settings.brand_marquee);
        }
      } catch (err) {
        console.error('Failed to load homepage products:', err);
      } finally {
        setLoadingTrending(false);
        setLoadingNew(false);
      }
    }
    loadHomeData();
  }, []);

  return (
    <div className="space-y-0">
      {/* First Screen Fold (100vh Hero + Docked Brand Marquee) */}
      <div className="lg:min-h-[calc(100vh-92px)] flex flex-col justify-between bg-[#FAF9F6]">
        <Hero onOpenEnquiry={() => setEnquiryModalOpen(true)} />
        <BrandMarquee marqueeText={marqueeText} />
      </div>

      {/* Merchandised Section 1: Trending Wholesale Lines */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" /> B2B MERCHANDISING
            </span>
            <h2 className="font-serif text-3xl font-bold text-brand-950 mt-1">
              Trending Wholesale Products
            </h2>
          </div>
          <Link to="/catalogue?trending=true">
            <Button variant="outline" size="sm" icon={ArrowRight}>
              View All Trending
            </Button>
          </Link>
        </div>

        <ProductGrid products={trendingProducts} loading={loadingTrending} />
      </section>

      {/* Merchandised Section 2: New Arrivals */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-slate-200 gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-700 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> FRESH BATCHES
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-950 mt-1">
                New Arrival Batches
              </h2>
            </div>
            <Link to="/catalogue?newArrival=true">
              <Button variant="outline" size="sm" icon={ArrowRight}>
                View All New Arrivals
              </Button>
            </Link>
          </div>

          <ProductGrid products={newArrivals} loading={loadingNew} />
        </div>
      </section>

      {/* Feature Grid */}
      <FeatureGrid />

      {/* Customer Trust Stories */}
      <TrustSection />

      {/* Bottom CTA Section */}
      <section className="py-16 sm:py-20 bg-[#FAF9F6] text-slate-900 text-center border-t border-slate-200/90 relative font-neue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <span className="text-xs font-mono font-bold tracking-widest text-[#B97832] uppercase">
            PAN-INDIA & GLOBAL WHOLESALE SUPPLY
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-950 tracking-tight">
            READY TO STOCK YOUR BUSINESS?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light leading-relaxed max-w-2xl mx-auto">
            Browse our complete catalogue of premium apparel, inspect detailed batch numbers, and place your bulk order online in minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link to="/catalogue">
              <Button size="lg" variant="gold" icon={ArrowRight} className="font-bold shadow-md">
                Browse Catalogue
              </Button>
            </Link>
            <Button
              onClick={() => setEnquiryModalOpen(true)}
              size="lg"
              variant="outline"
              icon={Send}
              className="text-slate-900 border-slate-300 bg-white hover:bg-slate-950 hover:text-white hover:border-slate-950 font-semibold shadow-2xs"
            >
              Send Wholesale Enquiry
            </Button>
          </div>
        </div>
      </section>

      {/* Guest Wholesale Enquiry Modal */}
      <GuestEnquiryModal isOpen={enquiryModalOpen} onClose={() => setEnquiryModalOpen(false)} />
    </div>
  );
}
