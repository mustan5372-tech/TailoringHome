import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable Design System Button
 *
 * Supports boutique colour palette variants:
 * - primary: Maroon fill with subtle gold/ivory highlights
 * - secondary: Deep chocolate fill with ivory text
 * - gold: Champagne gold fill with deep chocolate text
 * - outline: Chocolate border & text with warm cream hover
 * - maroonOutline: Maroon border & text with blush hover
 * - ghost: Subtle text button with soft cream hover
 */
export const Button = ({
  children,
  to,
  href,
  variant = 'primary', // 'primary' | 'secondary' | 'gold' | 'outline' | 'maroonOutline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  // Base button ergonomics and accessible focus rings
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 ease-out ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700/50 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory ' +
    'disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed tracking-wide select-none active:scale-[0.98]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-sm gap-1.5 min-h-[34px]',
    md: 'text-sm px-5 py-2.5 rounded-sm gap-2 min-h-[42px]',
    lg: 'text-base px-7 py-3.5 rounded-sm gap-2.5 min-h-[48px]',
  }[size] || 'text-sm px-5 py-2.5 rounded-sm gap-2 min-h-[42px]';

  const variantStyles = {
    primary:
      'bg-maroon-800 text-ivory hover:bg-maroon-700 active:bg-maroon-900 shadow-xs hover:shadow-sm border border-maroon-700/90',
    secondary:
      'bg-chocolate-800 text-ivory hover:bg-chocolate-700 active:bg-chocolate-900 shadow-xs hover:shadow-sm border border-chocolate-700/90',
    gold:
      'bg-gold text-chocolate-900 font-semibold hover:bg-gold-light active:bg-gold-dark shadow-xs hover:shadow-sm border border-gold-dark/40 focus-visible:ring-gold-dark/60 focus-visible:ring-offset-chocolate-900',
    outline:
      'bg-transparent text-chocolate-800 border border-chocolate-300 hover:bg-cream-soft hover:border-chocolate-500 active:bg-cream-muted',
    maroonOutline:
      'bg-transparent text-maroon-800 border border-maroon-300 hover:bg-maroon-50 hover:border-maroon-600 active:bg-maroon-100',
    ghost:
      'bg-transparent text-chocolate-700 hover:bg-cream-soft hover:text-chocolate-900 active:bg-cream-muted border border-transparent',
  }[variant] || 'bg-maroon-800 text-ivory hover:bg-maroon-700 border border-maroon-700';

  const widthStyle = fullWidth ? 'w-full' : '';

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`.trim();

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`group ${combinedClasses}`} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={`group ${combinedClasses}`}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={`group ${combinedClasses}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
