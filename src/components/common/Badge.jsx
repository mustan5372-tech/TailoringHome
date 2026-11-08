import React from 'react';

export const Badge = ({
  children,
  variant = 'maroon', // 'maroon' | 'chocolate' | 'gold' | 'cream' | 'neutral'
  size = 'sm',
  className = '',
}) => {
  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 tracking-wider uppercase font-semibold',
    sm: 'text-xs px-2.5 py-0.5 tracking-wide',
    md: 'text-sm px-3 py-1',
  }[size];

  const variantStyles = {
    maroon: 'bg-maroon-50 text-maroon-800 border border-maroon-200/60',
    chocolate: 'bg-chocolate-50 text-chocolate-800 border border-chocolate-200/60',
    gold: 'bg-amber-50 text-gold-dark border border-gold/40',
    cream: 'bg-cream text-chocolate-700 border border-cream-border',
    neutral: 'bg-gray-100 text-gray-700 border border-gray-200',
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-sm font-medium ${sizeStyles} ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
