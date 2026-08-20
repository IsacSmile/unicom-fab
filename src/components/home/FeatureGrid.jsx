import React from 'react';
import { Layers, ShieldCheck, Zap, PackageCheck, Headset, Truck } from 'lucide-react';

export function FeatureGrid() {
  const features = [
    {
      icon: Zap,
      title: 'Low-Friction Bulk Ordering',
      description: 'Streamlined online purchase order workflow designed specifically for business buyers and enterprise purchasing agents.',
    },
    {
      icon: ShieldCheck,
      title: 'Reliable Stock Visibility',
      description: 'Real-time batch stock tracking prevents overbooking. What you see on our catalogue is available in our regional distribution warehouse.',
    },
    {
      icon: PackageCheck,
      title: 'Curated Apparel Lines',
      description: 'High-GSM cotton tees, loopback hoodies, Italian linen resort wear, Japanese selvedge denim, and commercial workwear basics.',
    },
    {
      icon: Layers,
      title: 'Wholesale-First Quantities',
      description: 'Transparent minimum order quantities (starting from 30 PCS) and consistent quantity step increments tailored for re-stocking.',
    },
    {
      icon: Truck,
      title: 'Pan-India & Global Express',
      description: 'Direct freight logistics partnerships with pallet tracking and expedited commercial shipping across India and international ports.',
    },
    {
      icon: Headset,
      title: 'Business-Focused Support',
      description: 'Dedicated B2B account managers assigned to handle custom sample requests, volume discounts, and corporate logistics.',
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase">
            WHY PARTNER WITH UNICOM FAB
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950">
            Engineered for Modern Retailers & Brands
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Eliminate traditional offline wholesale procurement hassles. Inspect digital specs, confirm batch numbers, and manage restocks seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-editorial-hover transition-all duration-300 space-y-4 group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-950 text-luxury-gold flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-xl text-brand-950">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
