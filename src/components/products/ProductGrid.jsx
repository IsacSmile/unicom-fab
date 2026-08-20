import React from 'react';
import { ProductCard } from './ProductCard';
import { ProductGridSkeleton } from '../common/SkeletonLoaders';
import { EmptyState } from '../common/EmptyState';

export function ProductGrid({ products, loading, emptyTitle, emptyDesc, onClearFilters }) {
  if (loading) {
    return <ProductGridSkeleton count={8} />;
  }

  if (!products || products.length === 0) {
    return (
      <EmptyState
        title={emptyTitle || 'No products available'}
        description={emptyDesc || 'No products matched your specified filter criteria.'}
        actionText={onClearFilters ? 'Clear All Filters' : null}
        onAction={onClearFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
