import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatCurrency, getStockBadge } from '../../lib/utils';

const COLOR_MAP = {
  black: '#18181B',
  white: '#FFFFFF',
  offwhite: '#F8F8F0',
  navy: '#1E3A8A',
  blue: '#2563EB',
  lightblue: '#93C5FD',
  sky: '#38BDF8',
  red: '#DC2626',
  maroon: '#800000',
  wine: '#58111A',
  beige: '#E5DDC8',
  cream: '#FFFDD0',
  ivory: '#FFFFF0',
  gold: '#D97706',
  yellow: '#EAB308',
  green: '#16A34A',
  olive: '#556B2F',
  emerald: '#059669',
  sage: '#9CAF88',
  grey: '#6B7280',
  gray: '#6B7280',
  charcoal: '#374151',
  pink: '#EC4899',
  rose: '#F43F5E',
  purple: '#9333EA',
  violet: '#7C3AED',
  brown: '#78350F',
  tan: '#D2B48C',
  rust: '#B7410E',
  orange: '#EA580C',
  mustard: '#E1AD01',
  teal: '#0D9488',
};

function getColorHex(colorName) {
  if (!colorName) return '#CBD5E1';
  const clean = colorName.toLowerCase().replace(/[^a-z]/g, '');
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (clean.includes(key)) return hex;
  }
  return '#94A3B8';
}

export function ProductCard({ product }) {
  const mainImage = product.images && product.images[0]
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800';

  const stockInfo = getStockBadge(product.stockQuantity, product.minOrderQuantity);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xl hover:border-[#B97832]/60 transition-all duration-300 flex flex-col font-neue">
      
      {/* Ambient Golden Border Glow on Hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl border-2 border-transparent group-hover:border-[#B97832]/40 transition-colors z-20" />

      {/* Image Container (Reduced height ratio for compact luxury presentation) */}
      <div className="relative aspect-[4/4.2] bg-slate-100 overflow-hidden rounded-t-2xl z-10">
        <img
          src={mainImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
        />

        {/* Floating Glassmorphism Badges (Trending / New Arrival) */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          {product.isTrending && <Badge variant="trending">Trending</Badge>}
          {product.isNewArrival && <Badge variant="new">New Arrival</Badge>}
        </div>

        {/* Stock Badge Overlay Top Right */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className={`px-2 py-0.5 rounded-md text-[9px] font-neue font-bold border uppercase tracking-wider backdrop-blur-md shadow-2xs ${stockInfo.color}`}>
            {stockInfo.label}
          </span>
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="w-full py-2 bg-slate-950 text-white text-[11px] font-semibold uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-[#B97832] transition-colors"
          >
            <span>View Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Compact Content Details Area */}
      <div className="p-3.5 sm:p-4 flex flex-col gap-2 relative z-10 bg-white rounded-b-2xl">
        {/* Category & Batch Header (Fixed in Same Line) */}
        <div className="flex items-center justify-between gap-2 text-xs whitespace-nowrap overflow-hidden">
          <span className="uppercase tracking-wider font-neue font-bold text-[10px] text-[#B97832] truncate">{product.category}</span>
          <span className="text-[10px] text-slate-400 font-mono shrink-0">{product.batchNumber}</span>
        </div>

        {/* Sharp & Smooth Neue Product Title */}
        <h3 className="font-neue font-semibold text-sm sm:text-[15px] text-slate-900 group-hover:text-[#B97832] transition-colors duration-200 line-clamp-2 leading-snug tracking-tight antialiased">
          {product.name}
        </h3>

        {/* Wholesale Spec Meta */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          {/* Colours Swatches */}
          {product.colours && product.colours.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-neue font-bold uppercase tracking-wider text-slate-400">Colours:</span>
              <div className="flex items-center gap-1.5">
                {product.colours.map((col, i) => {
                  const hex = getColorHex(col);
                  const isLast = i === product.colours.length - 1;
                  const isFirst = i === 0;

                  let tooltipAlign = "left-1/2 -translate-x-1/2";
                  let arrowAlign = "left-1/2 -translate-x-1/2";
                  if (isLast && product.colours.length > 1) {
                    tooltipAlign = "right-0 translate-x-1";
                    arrowAlign = "right-2.5";
                  } else if (isFirst && product.colours.length > 1) {
                    tooltipAlign = "left-0 -translate-x-1";
                    arrowAlign = "left-2.5";
                  }

                  return (
                    <div key={i} className="group/swatch relative flex items-center justify-center">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs cursor-pointer transition-transform duration-200 group-hover/swatch:scale-125 group-hover/swatch:ring-2 group-hover/swatch:ring-[#B97832]"
                        style={{ backgroundColor: hex }}
                      />
                      {/* Smart Color Name Tooltip (No edge clipping) */}
                      <div className={`pointer-events-none absolute bottom-full mb-1.5 ${tooltipAlign} whitespace-nowrap bg-slate-900 text-white text-[10px] font-medium px-2 py-0.5 rounded shadow-lg opacity-0 group-hover/swatch:opacity-100 transition-all duration-200 z-50`}>
                        {col}
                        <div className={`absolute top-full ${arrowAlign} border-4 border-transparent border-t-slate-900`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sizes Available */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-neue font-bold uppercase tracking-wider text-slate-400">Sizes:</span>
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar whitespace-nowrap justify-end">
                {product.sizes.map((sz, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 rounded text-[10px] font-neue font-bold text-slate-700 shrink-0">
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price & MOQ (Increased Price Size + Compact MOQ Badge) */}
          <div className="flex items-center justify-between pt-1.5 gap-2 whitespace-nowrap">
            <div className="flex items-baseline gap-1">
              <span className="font-neue font-bold text-base sm:text-lg text-slate-950 leading-none">
                {formatCurrency(product.wholesalePrice)}
              </span>
              <span className="text-xs font-neue font-medium text-slate-500">/ pc</span>
            </div>
            <div className="shrink-0">
              <Badge variant="moq">MOQ: {product.minOrderQuantity} PCS</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
