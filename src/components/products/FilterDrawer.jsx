import React from 'react';
import { Filter, X, RotateCcw, Check, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '../common/Button';

export function FilterDrawer({
  isOpen,
  onClose,
  filterOptions,
  selectedCategory,
  setSelectedCategory,
  selectedSize,
  setSelectedSize,
  selectedColour,
  setSelectedColour,
  inStockOnly,
  setInStockOnly,
  trendingOnly,
  setTrendingOnly,
  newArrivalOnly,
  setNewArrivalOnly,
  sortOption,
  setSortOption,
  onResetFilters,
}) {
  const content = (
    <div className="space-y-6 text-slate-800 text-sm">
      {/* Header Actions */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <h3 className="font-serif font-bold text-lg text-brand-950 flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-700" /> Filter Wholesale Catalogue
        </h3>
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset All
        </button>
      </div>

      {/* Merchandising Toggles */}
      <div className="space-y-2.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Merchandising Badges
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-brand-900 focus:ring-brand-900"
            />
            <span>In Stock Only</span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
            <input
              type="checkbox"
              checked={trendingOnly}
              onChange={(e) => setTrendingOnly(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-brand-900 focus:ring-brand-900"
            />
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" /> Trending Items Only
            </span>
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
            <input
              type="checkbox"
              checked={newArrivalOnly}
              onChange={(e) => setNewArrivalOnly(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-brand-900 focus:ring-brand-900"
            />
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> New Arrivals Only
            </span>
          </label>
        </div>
      </div>

      {/* Sorting */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Sort Products
        </label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full py-2 px-3 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-900"
        >
          <option value="newest">Newest Additions</option>
          <option value="popular">Popular / Trending First</option>
          <option value="stock">Highest Stock Available</option>
          <option value="name-asc">Product Name (A-Z)</option>
          <option value="name-desc">Product Name (Z-A)</option>
        </select>
      </div>

      {/* Categories */}
      {filterOptions?.categories?.length > 0 && (
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Category
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                !selectedCategory ? 'bg-brand-950 text-white border-brand-950 font-bold' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              All Categories
            </button>
            {filterOptions.categories.map((cat) => {
              const isSel = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(isSel ? '' : cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    isSel ? 'bg-brand-950 text-white border-brand-950 font-bold' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Colours */}
      {filterOptions?.colours?.length > 0 && (
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Colour Filter
          </label>
          <div className="flex flex-wrap gap-1.5">
            {filterOptions.colours.map((col) => {
              const isSel = selectedColour === col;
              return (
                <button
                  key={col}
                  onClick={() => setSelectedColour(isSel ? '' : col)}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                    isSel ? 'bg-brand-950 text-white border-brand-950 font-bold' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {col}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Sizes */}
      {filterOptions?.sizes?.length > 0 && (
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
            Size Filter
          </label>
          <div className="flex flex-wrap gap-1.5 font-mono">
            {filterOptions.sizes.map((sz) => {
              const isSel = selectedSize === sz;
              return (
                <button
                  key={sz}
                  onClick={() => setSelectedSize(isSel ? '' : sz)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-colors ${
                    isSel ? 'bg-brand-950 text-white border-brand-950' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {sz}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );

  // Desktop Inline Version vs Mobile Modal Drawer
  if (!isOpen) return <div className="hidden lg:block bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">{content}</div>;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-brand-950/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto animate-slide-up flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-4">
            <span className="font-serif font-bold text-lg text-brand-950">Filters</span>
            <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-800">
              <X className="w-5 h-5" />
            </button>
          </div>
          {content}
        </div>
        <div className="pt-4 border-t border-slate-200 mt-6">
          <Button onClick={onClose} variant="primary" className="w-full">
            Apply Filters
          </Button>
        </div>
      </div>
    </div>
  );
}
