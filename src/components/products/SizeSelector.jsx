import React from 'react';
import { Ruler, Check } from 'lucide-react';

export function SizeSelector({ sizes = [], selectedSize, onSelect }) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-1.5">
          <Ruler className="w-4 h-4 text-amber-700" />
          <span>Select Size Batch</span>
        </span>
        <span className="text-slate-500 font-mono">{selectedSize || 'Select size'}</span>
      </label>

      <div className="flex flex-wrap gap-2">
        {sizes.map((sz) => {
          const isSelected = selectedSize === sz;
          return (
            <button
              key={sz}
              type="button"
              onClick={() => onSelect(sz)}
              className={`min-w-[42px] px-3 py-2 rounded-xl text-xs font-bold font-mono transition-all border flex items-center justify-center gap-1 ${
                isSelected
                  ? 'bg-brand-950 text-white border-brand-950 shadow-md ring-2 ring-brand-950/20'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              {isSelected && <Check className="w-3 h-3 text-luxury-gold" />}
              <span>{sz}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
