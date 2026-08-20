import React from 'react';
import { Star, Building, Quote } from 'lucide-react';

export function TrustSection() {
  const stories = [
    {
      company: 'Kuro Apparel Co.',
      location: 'Mumbai, MH',
      name: 'Vikramaditya S.',
      role: 'Head of Purchasing',
      quote: 'UNICOM FAB transformed our seasonal stocking. We placed a 500-piece order for Egyptian cotton tees and received verified batch testing reports within 24 hours.',
      order: '500 PCS • Monolith Tee Series',
      rating: 5,
    },
    {
      company: 'Aethel Urban Retailers',
      location: 'Bengaluru, KA',
      name: 'Ananya Roy',
      role: 'Founder & Retail Director',
      quote: 'The strict MOQ and step increment system makes budget planning predictable. The 450 GSM French Terry hoodies sold out in our boutique stores within a week.',
      order: '350 PCS • Heavy Hoodies',
      rating: 5,
    },
    {
      company: 'Vanguard Resorts & Apparel',
      location: 'Goa & New Delhi',
      name: 'Kabir Mehta',
      role: 'Merchandise Manager',
      quote: 'Finding reliable 100% linen resort shirts with consistent dye lots was impossible before UNICOM FAB. Their B2B portal handles instant order confirmations with GST invoices.',
      order: '250 PCS • Italian Linen Shirts',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-brand-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono font-bold tracking-widest text-luxury-gold uppercase">
            TRUSTED BY 250+ B2B BRANDS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Client Success & Reseller Stories
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            See how leading fashion boutiques, corporate procurement teams, and e-commerce labels rely on UNICOM FAB for bulk garment supply.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, i) => (
            <div
              key={i}
              className="bg-brand-900/90 border border-brand-800 p-8 rounded-2xl flex flex-col justify-between hover:border-amber-500/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: story.rating }).map((_, r) => (
                      <Star key={r} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-brand-800" />
                </div>

                <p className="text-sm text-slate-200 italic leading-relaxed font-light">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-brand-800/80 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-white">{story.name}</h4>
                  <p className="text-xs text-amber-400 font-mono">{story.company} • {story.location}</p>
                </div>
                <span className="px-2.5 py-1 bg-brand-950 border border-brand-800 text-[10px] font-mono text-slate-400 rounded-md">
                  {story.order}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
