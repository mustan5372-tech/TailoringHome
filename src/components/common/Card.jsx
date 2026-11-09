import React from 'react';

/**
 * Reusable Design System Card
 *
 * Provides consistent surfaces, borders, elevations, and hover transitions.
 *
 * Variants:
 * - default: Crisp white card with subtle cream border and boutique shadow
 * - cream: Tactile warm cream card
 * - chocolate: Luxury deep chocolate surface with ivory text and gold accents
 * - maroon: Royal deep maroon surface with ivory text
 * - outlined: Minimal transparent card with defined boundary
 */
export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  variant = 'default', // 'default' | 'cream' | 'chocolate' | 'maroon' | 'outlined'
  padding = 'md', // 'none' | 'sm' | 'md' | 'lg'
  onClick,
  ...props
}) => {
  const variantStyles = {
    default:
      'bg-white border border-cream-border text-chocolate shadow-xs hover:border-cream-dark/80',
    cream:
      'bg-cream text-chocolate border border-cream-border/80 shadow-xs hover:border-cream-dark',
    chocolate:
      'bg-chocolate-900 text-ivory border border-chocolate-800 shadow-md',
    maroon:
      'bg-maroon-900 text-ivory border border-maroon-800/80 shadow-md',
    outlined:
      'bg-transparent border border-chocolate-200/80 text-chocolate',
  }[variant] || 'bg-white border border-cream-border text-chocolate shadow-xs';

  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-7',
    lg: 'p-8 sm:p-10',
  }[padding] || 'p-6 sm:p-7';

  const hoverClasses = hoverEffect
    ? 'transition-all duration-300 ease-out hover:shadow-md hover:-translate-y-0.5'
    : 'transition-colors duration-200';

  const interactiveClasses = onClick
    ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700/50'
    : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-sm ${variantStyles} ${paddingStyles} ${hoverClasses} ${interactiveClasses} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
