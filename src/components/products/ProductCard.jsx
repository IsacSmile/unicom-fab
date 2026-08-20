import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Package, Check } from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatCurrency, getStockBadge } from '../../lib/utils';

export function ProductCard({ product }) {
  const mainImage = product.images && product.images[0]
    ? product.images[0]
    : 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800';

  const stockInfo = getStockBadge(product.stockQuantity, product.minOrderQuantity);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-editorial-hover transition-all duration-300 flex flex-col justify-between h-full">
      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
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
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-brand-950/80 via-brand-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            to={`/product/${product.id}`}
            className="w-full py-2.5 bg-white text-brand-950 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors"
          >
            <span>View Wholesale Specs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
            <span>{product.category}</span>
            <span>{product.batchNumber}</span>
          </div>

          <h3 className="font-serif font-bold text-base text-brand-950 group-hover:text-amber-800 transition-colors line-clamp-2 mb-2">
            {product.name}
          </h3>
        </div>

        {/* Wholesale Spec Meta */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          {/* Colours Available */}
          {product.colours && product.colours.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="text-[11px] font-semibold uppercase text-slate-400">Colours:</span>
              <div className="flex items-center gap-1">
                {product.colours.slice(0, 3).map((col, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-700">
                    {col}
                  </span>
                ))}
                {product.colours.length > 3 && (
                  <span className="text-[10px] text-slate-400 font-medium">+{product.colours.length - 3}</span>
                )}
              </div>
            </div>
          )}

          {/* Sizes Available */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="text-[11px] font-semibold uppercase text-slate-400">Sizes:</span>
              <div className="flex items-center gap-1">
                {product.sizes.slice(0, 4).map((sz, i) => (
                  <span key={i} className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-medium text-slate-700 font-mono">
                    {sz}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Price & MOQ */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Wholesale Rate</span>
              <span className="font-display font-bold text-lg text-brand-950">
                {formatCurrency(product.wholesalePrice)}
                <span className="text-xs font-normal text-slate-500"> / PC</span>
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
