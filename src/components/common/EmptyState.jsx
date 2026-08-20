import React from 'react';
import { PackageX } from 'lucide-react';
import { Button } from './Button';

export function EmptyState({
  title = 'No products found',
  description = 'Try adjusting your search criteria or clear active filters.',
  actionText,
  onAction,
  icon: Icon = PackageX,
}) {
  return (
    <div className="py-16 px-4 text-center flex flex-col items-center justify-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 border border-slate-200">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-serif font-bold text-brand-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button onClick={onAction} variant="secondary">
          {actionText}
        </Button>
      )}
    </div>
  );
}
