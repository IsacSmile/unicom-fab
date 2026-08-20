import React from 'react';
import { Sparkles } from 'lucide-react';

export function BrandMarquee({ marqueeText }) {
  const defaultItems = [
    'DIRECT MANUFACTURER B2B',
    'PAN-INDIA DIRECT LOGISTICS',
    'MINIMUM 30 PCS MOQ',
    '100% INSPECTED QUALITY BATCHES',
    'INSTANT GST INVOICING',
    'TRANSPARENT TIER PRICING',
    'VERIFIED WHOLESALE SUPPLY',
    'FAST DISPATCH GUARANTEED'
  ];

  const items = marqueeText
    ? marqueeText.split('•').map(s => s.trim())
    : defaultItems;

  // Duplicate items array multiple times to guarantee an endless smooth infinite marquee scroll
  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <section className="bg-[#101828] text-white py-3.5 border-y border-slate-800 overflow-hidden select-none relative z-10 shadow-inner">
      <div className="flex w-max animate-marquee-left items-center font-mono text-xs font-bold tracking-widest uppercase">
        {marqueeItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-8 px-4">
            <span className="text-slate-200 hover:text-[#B97832] transition-colors font-medium">
              {item}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#B97832] shrink-0 animate-pulse" />
          </div>
        ))}
      </div>
    </section>
  );
}
