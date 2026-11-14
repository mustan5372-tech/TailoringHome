import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Reusable Scroll Reveal Wrapper Component (Day 16)
 *
 * Implements smooth, performance-friendly progressive viewport reveals.
 * - Animates primarily `opacity` and `transform` to prevent layout shifts.
 * - Disconnects observer once triggered (no infinite replaying).
 * - Immediately renders content if `prefers-reduced-motion` is detected.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.delay=0] - Transition delay in milliseconds
 * @param {'up'|'fade'|'none'} [props.direction='up'] - Animation trajectory
 * @param {string} [props.className='']
 * @param {keyof JSX.IntrinsicElements} [props.as='div']
 * @param {number} [props.threshold=0.1]
 * @param {string} [props.rootMargin='0px 0px -40px 0px']
 * @param {boolean} [props.once=true]
 */
export const ScrollReveal = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  as: Component = 'div',
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  once = true,
  ...props
}) => {
  const { ref, isRevealed } = useScrollReveal({
    threshold,
    rootMargin,
    once,
  });

  const getTransform = () => {
    if (isRevealed) return 'translateY(0)';
    if (direction === 'up') return 'translateY(22px)';
    return 'none';
  };

  const style = {
    opacity: isRevealed ? 1 : 0,
    transform: getTransform(),
    transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: delay > 0 ? `${delay}ms` : undefined,
    willChange: isRevealed ? 'auto' : 'opacity, transform',
  };

  return (
    <Component
      ref={ref}
      style={style}
      className={`scroll-reveal-container ${className}`.trim()}
      {...props}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;

