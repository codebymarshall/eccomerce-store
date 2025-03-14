/**
 * Format a price as a currency string
 * @param price - The price to format
 * @returns The formatted price string
 */
export function formatPrice(price: number | string | { toString(): string }): string {
  // Convert to number
  let numericPrice: number;
  
  if (typeof price === 'number') {
    numericPrice = price;
  } else if (typeof price === 'string') {
    numericPrice = parseFloat(price);
  } else {
    // Object with toString method
    numericPrice = parseFloat(price.toString());
  }
  
  // Handle NaN
  if (isNaN(numericPrice)) {
    numericPrice = 0;
  }
      
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(numericPrice);
}

/**
 * Format a date in a human-readable format
 * @param date - The date to format
 * @returns The formatted date string
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Truncate a string to a maximum length
 * @param str - The string to truncate
 * @param maxLength - The maximum length
 * @returns The truncated string
 */
export function truncateString(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
} 