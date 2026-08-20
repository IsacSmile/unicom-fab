import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm p-4 flex flex-col gap-3">
      <div className="w-full aspect-[4/5] rounded-lg animate-shimmer" />
      <div className="h-4 w-3/4 animate-shimmer rounded" />
      <div className="h-3 w-1/2 animate-shimmer rounded" />
      <div className="flex justify-between items-center pt-2 border-t border-slate-100">
        <div className="h-4 w-1/3 animate-shimmer rounded" />
        <div className="h-6 w-16 animate-shimmer rounded-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="w-full space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 w-full animate-shimmer rounded-lg" />
      ))}
    </div>
  );
}
