import React from 'react';
import { Plus, Minus, Layers } from 'lucide-react';
import { calculateAllowedQuantities } from '../../lib/utils';

export function QuantitySelector({ quantity, onChange, minOrderQuantity = 30, quantityStep = 5, stockQuantity = 1000 }) {
  const allowed = calculateAllowedQuantities(minOrderQuantity, quantityStep, stockQuantity, 30);

  const handleIncrement = () => {
    const nextVal = quantity + quantityStep;
    if (nextVal <= stockQuantity) {
      onChange(nextVal);
    }
  };

  const handleDecrement = () => {
    const prevVal = quantity - quantityStep;
    if (prevVal >= minOrderQuantity) {
      onChange(prevVal);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span className="flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-amber-700" />
          <span>Select Bulk Quantity (PCS)</span>
        </span>
        <span className="text-slate-400 font-mono">
          Step Increment: +{quantityStep} PCS
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Step Buttons */}
        <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-white shadow-xs">
          <button
            type="button"
            onClick={handleDecrement}
            disabled={quantity <= minOrderQuantity}
            className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <div className="px-4 py-2 text-center font-display font-bold text-base text-brand-950 min-w-[70px]">
            {quantity} <span className="text-xs font-normal text-slate-500">PCS</span>
          </div>
          <button
            type="button"
            onClick={handleIncrement}
            disabled={quantity + quantityStep > stockQuantity}
            className="px-3 py-2.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Dropdown Picker */}
        <select
          value={quantity}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="py-2.5 px-3 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-brand-950"
        >
          {allowed.map((qty) => (
            <option key={qty} value={qty}>
              {qty} PCS {qty === minOrderQuantity ? '(MOQ Minimum)' : ''}
            </option>
          ))}
        </select>
      </div>

      <p className="text-[11px] text-slate-400">
        Minimum Order Quantity starts at <strong className="text-slate-700">{minOrderQuantity} PCS</strong> and scales in steps of <strong className="text-slate-700">{quantityStep} PCS</strong>.
      </p>
    </div>
  );
}
