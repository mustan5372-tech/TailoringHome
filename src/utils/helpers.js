/**
 * General Utility Helpers
 */

/**
 * Combines class names safely (similar to clsx).
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Truncate a text string safely.
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

/**
 * Generate a slug from a title string.
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};
