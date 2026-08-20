import React from 'react';
import { Sparkles } from 'lucide-react';

export function BrandMarquee({ marqueeText }) {
  const defaultItems = [
    'WHOLESALE READY',
    'BULK ORDERS',
    'PREMIUM FABRICS',
    'GUARANTEED MOQS',
    'PAN-INDIA LOGISTICS',
    'DIRECT MANUFACTURER',
    'VERIFIED B2B SUPPLY',
    'GST INVOICING AVAILABLE'
  ];

  const items = marqueeText
    ? marqueeText.split('•').map(s => s.trim())
    : defaultItems;

  const doubleItems = [...items, ...items, ...items];

  return (
    <div className="bg-brand-900 text-luxury-gold py-3.5 border-y border-brand-800 overflow-hidden select-none">
      <div className="flex w-max animate-marquee space-x-8 items-center font-mono text-xs font-bold tracking-widest uppercase">
        {doubleItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-8">
            <span className="hover:text-white transition-colors">{item}</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500/60 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
