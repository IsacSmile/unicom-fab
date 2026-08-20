import React from 'react';

export function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs p-3 sm:p-4 flex flex-col gap-3 font-neue">
      {/* Brand Logo Skeleton Image Container */}
      <div className="relative w-full aspect-[4/4.2] rounded-xl bg-slate-100/80 border border-slate-200/50 flex items-center justify-center overflow-hidden p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100 via-slate-200/60 to-slate-100 animate-shimmer" />
        <img
          src="/unicom-fab-main-logo.png"
          alt="UNICOM FAB Loading"
          className="relative z-10 h-8 sm:h-10 w-auto object-contain opacity-40 animate-pulse grayscale"
        />
      </div>

      {/* Category & Batch Skeleton */}
      <div className="flex justify-between items-center">
        <div className="h-3 w-1/3 bg-amber-100/60 rounded animate-pulse" />
        <div className="h-3 w-1/5 bg-slate-200/60 rounded animate-pulse" />
      </div>

      {/* Title Skeleton */}
      <div className="h-4 w-4/5 bg-slate-200/80 rounded animate-pulse" />

      {/* Footer Spec Skeleton */}
      <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
        <div className="h-5 w-1/3 bg-slate-200/90 rounded animate-pulse" />
        <div className="h-5 w-16 bg-amber-100/80 rounded-md animate-pulse" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5 }) {
  return (
    <div className="w-full space-y-3 font-neue">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 w-full bg-slate-100/80 border border-slate-200/60 animate-shimmer rounded-xl flex items-center px-4 justify-between">
          <img
            src="/unicom-fab-main-logo.png"
            alt="Loading"
            className="h-5 w-auto object-contain opacity-30 animate-pulse grayscale"
          />
        </div>
      ))}
    </div>
  );
}
