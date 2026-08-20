import React from 'react';
import { Palette, Check } from 'lucide-react';

export function ColourSelector({ colours = [], selectedColour, onSelect }) {
  if (!colours || colours.length === 0) return null;

  return (
    <div className="space-y-2">
      <label className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-amber-700" />
          <span>Select Colour Variant</span>
        </span>
        <span className="text-slate-500 font-mono">{selectedColour || 'Select one'}</span>
      </label>

      <div className="flex flex-wrap gap-2">
        {colours.map((col) => {
          const isSelected = selectedColour === col;
          return (
            <button
              key={col}
              type="button"
              onClick={() => onSelect(col)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-brand-950 text-white border-brand-950 shadow-md ring-2 ring-brand-950/20'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              {isSelected && <Check className="w-3.5 h-3.5 text-luxury-gold" />}
              <span>{col}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
