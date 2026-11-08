import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  variant = 'default', // 'default' | 'cream' | 'chocolate' | 'outlined'
}) => {
  const variantStyles = {
    default: 'bg-white border border-cream-border text-chocolate',
    cream: 'bg-cream text-chocolate border border-cream-border/70',
    chocolate: 'bg-chocolate-900 text-ivory border border-chocolate-800',
    outlined: 'bg-transparent border border-chocolate-200/80',
  }[variant];

  const hoverClasses = hoverEffect
    ? 'transition-all duration-300 hover:shadow-md hover:-translate-y-0.5'
    : '';

  return (
    <div className={`rounded-sm p-6 ${variantStyles} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
