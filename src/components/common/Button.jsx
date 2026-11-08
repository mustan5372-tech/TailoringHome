import React from 'react';
import { Link } from 'react-router-dom';

export const Button = ({
  children,
  to,
  href,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'maroon' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-maroon/30 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 rounded-sm gap-1.5',
    md: 'text-sm px-5 py-2.5 rounded-sm gap-2',
    lg: 'text-base px-7 py-3.5 rounded-sm gap-2.5',
  }[size];

  const variantStyles = {
    primary:
      'bg-maroon-800 text-ivory hover:bg-maroon-700 active:bg-maroon-900 shadow-xs border border-maroon-700',
    secondary:
      'bg-chocolate-800 text-ivory hover:bg-chocolate-700 active:bg-chocolate-900 shadow-xs border border-chocolate-700',
    outline:
      'bg-transparent text-chocolate-800 border border-chocolate-300 hover:bg-cream-soft hover:border-chocolate-500',
    maroonOutline:
      'bg-transparent text-maroon-800 border border-maroon-300 hover:bg-maroon-50 hover:border-maroon-600',
    gold:
      'bg-gold text-chocolate-900 font-semibold hover:bg-gold-light active:bg-gold-dark shadow-xs border border-gold-dark/30',
    ghost:
      'bg-transparent text-chocolate-700 hover:bg-cream-soft hover:text-chocolate-900',
  }[variant];

  const combinedClasses = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="h-4 w-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer" {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
