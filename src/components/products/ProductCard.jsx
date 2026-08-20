import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatCurrency, getStockBadge } from '../../lib/utils';

export function ProductCard({ product }) {
  const mainImage = product.images && product.images[0]
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800';

  const stockInfo = getStockBadge(product.stockQuantity, product.minOrderQuantity);

  return (
    <div className="group relative bg-white rounded-2xl border border-[#E7E3DA] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#B97832]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
      
      {/* Card Ambient Golden Halo Glow on Hover */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#B97832]/10 via-amber-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md z-0" />

      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-[#F5F3EE] overflow-hidden z-10">
        <img
          src={mainImage}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isTrending && <Badge variant="trending">Trending</Badge>}
          {product.isNewArrival && <Badge variant="new">New Arrival</Badge>}
        </div>

        {/* Stock Badge Overlay Top Right */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`px-2 py-1 rounded-md text-[10px] font-bold border uppercase ${stockInfo.color}`}>
            {stockInfo.label}
          </span>
        </div>

        {/* Quick View / Action Button overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#101828]/85 via-[#101828]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="w-full py-2.5 bg-white text-[#101828] text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-[#B97832] hover:text-white transition-colors"
          >
            <span>View Wholesale Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <div className="flex items-center justify-between text-xs text-[#667085] font-mono mb-1">
            <span>{product.category}</span>
            <span>{product.batchNumber}</span>
          </div>

          <h3 className="font-serif font-bold text-base text-[#101828] group-hover:text-[#B97832] transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </div>

        {/* Wholesale Spec Meta */}
        <div className="pt-3 border-t border-[#E7E3DA] space-y-2">
          {/* Colours Available */}
          {product.colours && product.colours.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-[#475467]">
              <span className="text-[11px] font-semibold uppercase text-[#98A2B3]">Colours:</span>
              <div className="flex items-center gap-1">
                {product.colours.slice(0, 3).map((col, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-[#F5F3EE] rounded text-[10px] font-medium text-[#344054]">
                    {col}
                  </span>
                ))}
                {product.colours.length > 3 && (
                  <span className="text-[10px] text-[#98A2B3] font-medium">+{product.colours.length - 3}</span>
                )}
              </div>
            </div>
          )}

          {/* Sizes Available */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-[#475467]">
              <span className="text-[11px] font-semibold uppercase text-[#98A2B3]">Sizes:</span>
              <div className="flex items-center gap-1">
                {product.sizes.slice(0, 4).map((sz, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-[#F5F3EE] rounded text-[10px] font-medium text-[#344054] font-mono">
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price & MOQ */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs text-[#667085] block font-medium">Wholesale Rate</span>
              <span className="font-display font-bold text-lg text-[#101828]">
                {formatCurrency(product.wholesalePrice)}
                <span className="text-xs font-normal text-[#667085]"> / PC</span>
              </span>
            </div>
            <div className="text-right">
              <Badge variant="moq">MOQ: {product.minOrderQuantity} PCS</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
