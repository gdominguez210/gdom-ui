import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines clsx and tailwind-merge into a single utility function
 *
 * This utility function combines the conditional class name functionality of clsx
 * with the intelligent Tailwind CSS class merging capabilities of tailwind-merge.
 *
 * @param args - Class name values to combine and merge
 * @returns Merged class names string
 */
export function cn(...args: ClassValue[]): string {
  return twMerge(clsx(args));
}
