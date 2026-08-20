import React from 'react';
import { Filter, X, RotateCcw, Sparkles, TrendingUp, ChevronDown } from 'lucide-react';
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
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between">
        <div className="p-6">
          {/* Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 flex items-center justify-between pb-4 mb-6 border-b border-slate-200 -mx-6 px-6 pt-2">
            <h3 className="font-serif font-bold text-xl text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#B97832]" /> Filter Catalogue
            </h3>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onResetFilters}
                className="text-xs text-[#B97832] hover:text-amber-900 font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset All
              </button>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Close Filter"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
          </div>

          <div className="space-y-6 text-slate-800 text-sm">
            {/* Merchandising Toggles */}
            <div className="space-y-2.5">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Merchandising Badges
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#B97832] focus:ring-[#B97832]"
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={trendingOnly}
                    onChange={(e) => setTrendingOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#B97832] focus:ring-[#B97832]"
                  />
                  <span className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-amber-600" /> Trending Lines Only
                  </span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={newArrivalOnly}
                    onChange={(e) => setNewArrivalOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#B97832] focus:ring-[#B97832]"
                  />
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> New Arrivals Only
                  </span>
                </label>
              </div>
            </div>

            {/* Sorting */}
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                Sort Catalogue
              </label>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full py-2.5 pl-3 pr-8 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#B97832] appearance-none cursor-pointer shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <option value="newest">Newest Additions</option>
                  <option value="popular">Popular / Trending First</option>
                  <option value="stock">Highest Stock Available</option>
                  <option value="name-asc">Product Name (A-Z)</option>
                  <option value="name-desc">Product Name (Z-A)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3.5 pointer-events-none stroke-[2]" />
              </div>
            </div>

            {/* Categories */}
            {filterOptions?.categories?.length > 0 && (
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Categories
                </label>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      !selectedCategory ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
                          isSel ? 'bg-[#B97832] text-white border-[#B97832] font-bold' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Colour Options
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {filterOptions.colours.map((col) => {
                    const isSel = selectedColour === col;
                    return (
                      <button
                        key={col}
                        onClick={() => setSelectedColour(isSel ? '' : col)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                          isSel ? 'bg-slate-900 text-white border-slate-900 font-bold' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                  Size Options
                </label>
                <div className="flex flex-wrap gap-1.5 font-mono">
                  {filterOptions.sizes.map((sz) => {
                    const isSel = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(isSel ? '' : sz)}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold border transition-colors ${
                          isSel ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
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
        </div>

        <div className="pt-4 border-t border-slate-200 mt-6">
          <Button onClick={onClose} variant="primary" className="w-full bg-[#B97832] hover:bg-amber-800 text-white font-bold py-3 rounded-xl">
            View Filtered Lines
          </Button>
        </div>
      </div>
    </div>
  );
}
