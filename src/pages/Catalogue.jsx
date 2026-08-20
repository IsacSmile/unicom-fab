import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/products/ProductGrid';
import { FilterDrawer } from '../components/products/FilterDrawer';
import { Button } from '../components/common/Button';
import { api } from '../lib/api';
import { Filter, Search, RotateCcw, SlidersHorizontal } from 'lucide-react';

export function Catalogue() {
  const [searchParams, setSearchParams] = useSearchParams();

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
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

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

  // Helper to update individual URL query params
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to page 1 on filter change
    setSearchParams(newParams);
  };

  const resetAllFilters = () => {
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    category || size || colour || inStockOnly || trendingOnly || newArrivalOnly || searchQuery
  );

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8 pb-6 border-b border-slate-200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase">
              B2B WHOLESALE CATALOGUE
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-950 mt-1">
              Explore Apparel Lines & Batches
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Showing {products.length} of {total} verified wholesale items
            </p>
          </div>

          {/* Search Bar Inline */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-72">
              <input
                type="text"
                placeholder="Search catalogue by name or batch..."
                value={searchQuery}
                onChange={(e) => updateParam('search', e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-950 bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden p-2 bg-brand-950 text-white rounded-xl flex items-center gap-1.5 text-xs font-bold shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>

        {/* Active Filter Pills */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-4 mt-4 border-t border-slate-100">
            <span className="text-xs font-semibold text-slate-400 uppercase">Active Filters:</span>
            {category && (
              <span className="px-2.5 py-1 bg-brand-900 text-white text-xs rounded-full font-medium flex items-center gap-1">
                Cat: {category}
                <button onClick={() => updateParam('category', '')}>×</button>
              </span>
            )}
            {size && (
              <span className="px-2.5 py-1 bg-brand-900 text-white text-xs rounded-full font-medium flex items-center gap-1">
                Size: {size}
                <button onClick={() => updateParam('size', '')}>×</button>
              </span>
            )}
            {colour && (
              <span className="px-2.5 py-1 bg-brand-900 text-white text-xs rounded-full font-medium flex items-center gap-1">
                Colour: {colour}
                <button onClick={() => updateParam('colour', '')}>×</button>
              </span>
            )}
            {inStockOnly && (
              <span className="px-2.5 py-1 bg-emerald-800 text-white text-xs rounded-full font-medium flex items-center gap-1">
                In Stock Only
                <button onClick={() => updateParam('inStock', '')}>×</button>
              </span>
            )}
            {searchQuery && (
              <span className="px-2.5 py-1 bg-amber-800 text-white text-xs rounded-full font-medium flex items-center gap-1">
                Query: "{searchQuery}"
                <button onClick={() => updateParam('search', '')}>×</button>
              </span>
            )}
            <button
              onClick={resetAllFilters}
              className="text-xs text-red-600 hover:text-red-800 font-bold ml-2 underline"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Layout Grid: Sidebar Filters (Desktop) + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block">
          <FilterDrawer
            isOpen={false}
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

        {/* Product Grid & Load More */}
        <div className="lg:col-span-3 space-y-8">
          <ProductGrid
            products={products}
            loading={loading && page === 1}
            onClearFilters={resetAllFilters}
          />

          {/* Pagination / Load More Button */}
          {page < totalPages && (
            <div className="text-center pt-6">
              <Button
                onClick={() => updateParam('page', (page + 1).toString())}
                loading={loading}
                variant="outline"
                size="lg"
                className="min-w-[200px]"
              >
                Load More Products ({total - products.length} Remaining)
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      <FilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
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
