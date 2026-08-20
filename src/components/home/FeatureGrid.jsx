import React from 'react';
import { Zap, ShieldCheck, PackageCheck, Layers, Truck, Headset } from 'lucide-react';

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
      description: 'Flexible MOQs, step increments, and volume pricing built around your business needs and forecasting.',
    },
    {
      icon: Truck,
      title: 'Pan-India & Global Express',
      description: 'Fast dispatch from India to 520+ districts and international shipping for global retailers and brands.',
    },
    {
      icon: Headset,
      title: 'Business-Focused Support',
      description: 'Dedicated account managers, quick resolutions, and proactive updates for smooth business operations.',
    },
  ];

  return (
    <section className="py-10 sm:py-16 bg-[#F5F3EE] border-t border-[#E7E3DA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 space-y-2">
          <span className="text-[11px] font-mono font-bold tracking-widest text-[#B97832] uppercase">
            WHY PARTNER WITH UNICOM FAB
          </span>
          <h2 className="font-serif text-xl sm:text-3xl font-bold text-[#101828]">
            Engineered for Modern Retailers & Brands
          </h2>
          <p className="text-[#667085] text-xs sm:text-sm leading-relaxed px-2">
            Eliminate traditional offline wholesale procurement hassles. Inspect digital specs, confirm batch numbers, and manage restocks seamlessly.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#E7E3DA] p-4 sm:p-5 rounded-xl shadow-2xs hover:shadow-md hover:border-[#B97832]/40 hover:-translate-y-0.5 transition-all duration-300 space-y-3 group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#F5F3EE] border border-[#E7E3DA] text-[#B97832] flex items-center justify-center group-hover:bg-[#B97832] group-hover:text-white group-hover:border-[#B97832] transition-colors duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#101828] group-hover:text-[#B97832] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#667085] leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
