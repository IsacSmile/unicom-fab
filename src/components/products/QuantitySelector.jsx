import React, { useState, useRef, useEffect } from 'react';
import { Plus, Minus, Layers, ChevronDown } from 'lucide-react';
import { calculateAllowedQuantities } from '../../lib/utils';

function CustomQuantitySelect({ value, onChange, options, minOrderQuantity }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative font-neue" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="py-2.5 pl-3.5 pr-8 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all flex items-center justify-between shadow-2xs cursor-pointer min-w-[155px]"
      >
        <span className="truncate">
          {value} PCS {value === minOrderQuantity ? '(MOQ)' : ''}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-slate-900' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-48 max-h-48 overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 p-1.5 space-y-1 font-neue animate-fade-in custom-scrollbar">
          {options.map((qty) => {
            const isSel = qty === value;
            return (
              <button
                key={qty}
                type="button"
                onClick={() => {
                  onChange(qty);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                  isSel
                    ? 'bg-slate-950 text-white font-bold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                }`}
              >
                <span>{qty} PCS</span>
                {qty === minOrderQuantity && (
                  <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold ${
                    isSel ? 'bg-amber-400/20 text-amber-300' : 'bg-amber-100 text-amber-800'
                  }`}>
                    MOQ
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

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

        {/* Custom Glassmorphic Dropdown Picker */}
        <CustomQuantitySelect
          value={quantity}
          onChange={onChange}
          options={allowed}
          minOrderQuantity={minOrderQuantity}
        />
      </div>

      <p className="text-[11px] text-slate-400">
        Minimum Order Quantity starts at <strong className="text-slate-700">{minOrderQuantity} PCS</strong> and scales in steps of <strong className="text-slate-700">{quantityStep} PCS</strong>.
      </p>
    </div>
  );
}
