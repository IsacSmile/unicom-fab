import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/products/ProductGrid';
import { FilterDrawer } from '../components/products/FilterDrawer';
import { Button } from '../components/common/Button';
import { api } from '../lib/api';
import { Search, SlidersHorizontal, X, Sparkles, ChevronDown } from 'lucide-react';

export function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sentinelRef = useRef(null);

  // Filter States from URL search params
  const category = searchParams.get('category') || '';
  const size = searchParams.get('size') || '';
  const colour = searchParams.get('colour') || '';
  const inStockOnly = searchParams.get('inStock') === 'true';
  const trendingOnly = searchParams.get('trending') === 'true';
  const newArrivalOnly = searchParams.get('newArrival') === 'true';
  const searchQuery = searchParams.get('search') || '';
  const sortOption = searchParams.get('sort') || 'newest';
  const page = parseInt(searchParams.get('page') || '1');

  // UI state
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [filterOptions, setFilterOptions] = useState({ categories: [], colours: [], sizes: [] });
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Load Meta Filter Options once
  useEffect(() => {
    async function loadMeta() {
      try {
        const meta = await api.getFilterOptions();
        setFilterOptions(meta);
      } catch (err) {
        console.error('Failed to load filter metadata:', err);
      }
    }
    loadMeta();
  }, []);

  // Fetch Products whenever filters change
  useEffect(() => {
    async function fetchCatalogueProducts() {
      setLoading(true);
      try {
        const params = {};
        if (category) params.category = category;
        if (size) params.size = size;
        if (colour) params.colour = colour;
        if (inStockOnly) params.inStock = 'true';
        if (trendingOnly) params.trending = 'true';
        if (newArrivalOnly) params.newArrival = 'true';
        if (searchQuery) params.search = searchQuery;
        if (sortOption) params.sort = sortOption;
        params.page = page;
        params.limit = 12;

        const res = await api.getProducts(params);
        if (page > 1) {
          setProducts((prev) => [...prev, ...res.products]);
        } else {
          setProducts(res.products || []);
        }
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 1);
      } catch (err) {
        console.error('Catalogue fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCatalogueProducts();
  }, [category, size, colour, inStockOnly, trendingOnly, newArrivalOnly, searchQuery, sortOption, page]);

  // Automatic Infinite Scroll Observer for Lazy Loading
  useEffect(() => {
    if (loading || page >= totalPages) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page < totalPages && !loading) {
          updateParam('page', (page + 1).toString());
        }
      },
      { threshold: 0.1, rootMargin: '250px' }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
  }, [loading, page, totalPages]);

  // Helper to update individual URL query params
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  const resetAllFilters = () => {
    setSearchParams({});
  };

  // Active Filter Count calculation
  const activeFilterCount = [
    category,
    size,
    colour,
    inStockOnly ? 'inStock' : null,
    trendingOnly ? 'trending' : null,
    newArrivalOnly ? 'newArrival' : null,
    searchQuery ? 'search' : null,
  ].filter(Boolean).length;

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="relative min-h-screen py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Background Golden Halo Glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#B97832]/12 via-amber-200/10 to-transparent blur-3xl -z-10 rounded-full" />
      <div className="pointer-events-none absolute top-96 right-0 w-[450px] h-[450px] bg-gradient-to-br from-[#B97832]/8 to-transparent blur-3xl -z-10 rounded-full" />

      {/* Hero Catalogue Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#B97832]/10 border border-[#B97832]/20 rounded-full text-amber-800 text-xs font-mono font-bold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#B97832]" />
          <span>UNICOM WHOLESALE CATALOGUE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
          Curated Apparel Lines
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto font-light">
          Premium B2B wholesale manufacturing lines. Verified batch standards, tier-based pricing, and Pan-India direct dispatch.
        </p>
      </div>

      {/* Minimalist Top Filter Controls Bar */}
      <div className="sticky top-20 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Horizontal Quick Selector Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => updateParam('category', '')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                !category
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              All Apparel ({total})
            </button>
            {filterOptions.categories.map((cat) => {
              const isSelected = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => updateParam('category', isSelected ? '' : cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#B97832] text-white shadow-xs'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar & Filter Drawer Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search catalogue..."
                value={searchQuery}
                onChange={(e) => updateParam('search', e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B97832] bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => updateParam('search', '')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Sort Dropdown */}
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="py-2 pl-3 pr-8 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#B97832] appearance-none cursor-pointer shadow-2xs hover:border-slate-300 transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="stock">High Stock</option>
                <option value="name-asc">Name A-Z</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3 pointer-events-none stroke-[2]" />
            </div>

            {/* Slide-over Filter Trigger Button */}
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-2xs ${
                hasActiveFilters
                  ? 'bg-[#B97832] text-white'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 bg-white text-[#B97832] rounded-full text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Active Filter Badges Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-xs">
            <span className="font-mono font-bold text-slate-400 text-[10px] uppercase">Active:</span>

            {category && (
              <span className="px-2.5 py-1 bg-slate-900 text-white rounded-lg font-medium flex items-center gap-1.5">
                Category: {category}
                <button onClick={() => updateParam('category', '')} className="hover:text-amber-400">×</button>
              </span>
            )}
            {size && (
              <span className="px-2.5 py-1 bg-slate-900 text-white rounded-lg font-medium flex items-center gap-1.5">
                Size: {size}
                <button onClick={() => updateParam('size', '')} className="hover:text-amber-400">×</button>
              </span>
            )}
            {colour && (
              <span className="px-2.5 py-1 bg-slate-900 text-white rounded-lg font-medium flex items-center gap-1.5">
                Colour: {colour}
                <button onClick={() => updateParam('colour', '')} className="hover:text-amber-400">×</button>
              </span>
            )}
            {inStockOnly && (
              <span className="px-2.5 py-1 bg-emerald-800 text-white rounded-lg font-medium flex items-center gap-1.5">
                In Stock Only
                <button onClick={() => updateParam('inStock', '')} className="hover:text-amber-400">×</button>
              </span>
            )}
            {trendingOnly && (
              <span className="px-2.5 py-1 bg-amber-800 text-white rounded-lg font-medium flex items-center gap-1.5">
                Trending Lines
                <button onClick={() => updateParam('trending', '')} className="hover:text-amber-400">×</button>
              </span>
            )}
            {newArrivalOnly && (
              <span className="px-2.5 py-1 bg-blue-900 text-white rounded-lg font-medium flex items-center gap-1.5">
                New Arrivals
                <button onClick={() => updateParam('newArrival', '')} className="hover:text-amber-400">×</button>
              </span>
            )}
            {searchQuery && (
              <span className="px-2.5 py-1 bg-[#B97832] text-white rounded-lg font-medium flex items-center gap-1.5">
                "{searchQuery}"
                <button onClick={() => updateParam('search', '')} className="hover:text-slate-200">×</button>
              </span>
            )}

            <button
              onClick={resetAllFilters}
              className="text-xs text-red-600 hover:text-red-800 font-bold ml-auto underline"
            >
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Main Catalogue Product Grid (100% Clean & Wide View) */}
      <div className="space-y-10">
        <ProductGrid
          products={products}
          loading={loading && page === 1}
          onClearFilters={resetAllFilters}
        />

        {/* Automatic Infinite Scroll Lazy Loading Sentinel */}
        {page < totalPages && (
          <div ref={sentinelRef} className="py-12 text-center flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-2xs text-xs text-slate-600 font-mono">
              <span className="w-3.5 h-3.5 border-2 border-[#B97832] border-t-transparent rounded-full animate-spin" />
              <span>Lazy loading catalogue lines ({total - products.length} remaining)...</span>
            </div>
          </div>
        )}
        {page >= totalPages && total > 0 && (
          <div className="py-8 text-center text-xs font-mono text-slate-400 uppercase tracking-widest border-t border-slate-100">
            ✓ You have reached the end of the catalogue ({total} total products)
          </div>
        )}
      </div>

      {/* Clean Slide-over Filter Drawer */}
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        filterOptions={filterOptions}
        selectedCategory={category}
        setSelectedCategory={(val) => updateParam('category', val)}
        selectedSize={size}
        setSelectedSize={(val) => updateParam('size', val)}
        selectedColour={colour}
        setSelectedColour={(val) => updateParam('colour', val)}
        inStockOnly={inStockOnly}
        setInStockOnly={(val) => updateParam('inStock', val ? 'true' : '')}
        trendingOnly={trendingOnly}
        setTrendingOnly={(val) => updateParam('trending', val ? 'true' : '')}
        newArrivalOnly={newArrivalOnly}
        setNewArrivalOnly={(val) => updateParam('newArrival', val ? 'true' : '')}
        sortOption={sortOption}
        setSortOption={(val) => updateParam('sort', val)}
        onResetFilters={resetAllFilters}
      />
    </div>
  );
}
