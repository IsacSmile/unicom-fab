import React from 'react';
import { Ruler } from 'lucide-react';

export function SizeSelector({ sizes = [], selectedSize, onSelect }) {
  if (!sizes || sizes.length === 0) return null;

  return (
    <div className="space-y-2 font-neue">
      <label className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-1.5">
          <Ruler className="w-4 h-4 text-[#B97832]" />
          <span>Select Size Batch</span>
        </span>
      </label>

      <div className="flex flex-wrap gap-2">
        {sizes.map((sz) => {
          const isSelected = selectedSize === sz;
          return (
            <button
              key={sz}
              type="button"
              onClick={() => onSelect(sz)}
              className={`min-w-[42px] px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all duration-200 border flex items-center justify-center ${
                isSelected
                  ? 'bg-slate-950 text-white border-slate-950 shadow-sm ring-1 ring-slate-950/20 scale-[1.02]'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{sz}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
