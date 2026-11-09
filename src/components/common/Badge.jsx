import React from 'react';

/**
 * Reusable Design System Badge
 *
 * Provides status, category, shop entity, and metadata indicators
 * following the boutique colour palette and typography rules.
 */
export const Badge = ({
  children,
  variant = 'maroon', // 'maroon' | 'chocolate' | 'gold' | 'cream' | 'dark' | 'neutral'
  size = 'sm', // 'xs' | 'sm' | 'md'
  icon: Icon,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 tracking-wider uppercase font-semibold gap-1',
    sm: 'text-xs px-2.5 py-0.5 tracking-wide font-medium gap-1.5',
    md: 'text-sm px-3.5 py-1 tracking-wide font-medium gap-1.5',
  }[size] || 'text-xs px-2.5 py-0.5 tracking-wide font-medium gap-1.5';

  const variantStyles = {
    maroon:
      'bg-maroon-50 text-maroon-800 border border-maroon-200/70 shadow-2xs',
    chocolate:
      'bg-chocolate-50 text-chocolate-800 border border-chocolate-200/70 shadow-2xs',
    gold:
      'bg-amber-50/80 text-gold-dark border border-gold/40 shadow-2xs',
    cream:
      'bg-cream text-chocolate-700 border border-cream-border',
    dark:
      'bg-chocolate-900 text-ivory border border-gold/30 shadow-xs',
    neutral:
      'bg-stone-100 text-stone-700 border border-stone-200',
  }[variant] || 'bg-maroon-50 text-maroon-800 border border-maroon-200/70';

  return (
    <span
      className={`inline-flex items-center rounded-sm font-sans select-none ${sizeStyles} ${variantStyles} ${className}`.trim()}
      {...props}
    >
      {Icon && <Icon className="h-3 w-3 shrink-0" />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
