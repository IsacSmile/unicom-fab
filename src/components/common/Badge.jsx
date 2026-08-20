import React from 'react';

export function Badge({ children, variant = 'default', className = '' }) {
  const baseStyle = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border';

  const variants = {
    default: 'bg-slate-100 text-slate-800 border-slate-200',
    trending: 'bg-amber-950 text-amber-300 border-amber-800',
    new: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    moq: 'bg-brand-900 text-slate-100 border-brand-700',
    gold: 'bg-amber-50 text-amber-900 border-amber-300 font-bold',
    outline: 'bg-transparent text-slate-700 border-slate-300',
    statusPending: 'bg-amber-100 text-amber-800 border-amber-300',
    statusConfirmed: 'bg-sky-100 text-sky-800 border-sky-300',
    statusProcessing: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    statusCompleted: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    statusCancelled: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <span className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
}
