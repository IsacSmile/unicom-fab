import React from 'react';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon: Icon,
  className = '',
  ...props
}) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-900 text-white hover:bg-brand-950 focus:ring-brand-900 shadow-md hover:shadow-lg',
    secondary: 'bg-white text-brand-900 border border-brand-300 hover:bg-brand-50 focus:ring-brand-500',
    gold: 'bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500 shadow-md',
    outline: 'bg-transparent text-brand-900 border border-brand-900 hover:bg-brand-900 hover:text-white',
    ghost: 'bg-transparent text-brand-700 hover:bg-brand-100 hover:text-brand-900',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base font-semibold',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`${base} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : Icon ? (
        <Icon className="w-4 h-4 mr-2 shrink-0" />
      ) : null}
      {children}
    </button>
  );
}
