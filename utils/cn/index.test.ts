import { describe, it, expect } from 'vitest';
import { cn } from '@/utils/cn';

describe('cn utility should...', () => {
  it('combine basic string classes', () => {
    const result = cn('px-4', 'py-2', 'bg-blue-500');
    expect(result).toBe('px-4 py-2 bg-blue-500');
  });

  it('handle conditional classes with objects', () => {
    const result = cn('px-4', { 'py-2': true, 'bg-red-500': false });
    expect(result).toBe('px-4 py-2');
  });

  it('handle array inputs', () => {
    const result = cn(['px-4', 'py-2'], ['bg-blue-500']);
    expect(result).toBe('px-4 py-2 bg-blue-500');
  });

  it('handle mixed input types', () => {
    const result = cn(
      'base-class',
      ['array-class-1', 'array-class-2'],
      { 'conditional-true': true, 'conditional-false': false },
      'final-class',
    );
    expect(result).toBe('base-class array-class-1 array-class-2 conditional-true final-class');
  });

  it('ignore falsy values', () => {
    const result = cn('px-4', null, undefined, false, '', 'py-2');
    expect(result).toBe('px-4 py-2');
  });

  it('handle empty inputs gracefully', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
    expect(cn(null, undefined, false)).toBe('');
  });

  it('merge conflicting Tailwind classes intelligently', () => {
    // Test padding conflicts - later value should win
    const paddingResult = cn('px-2', 'px-4');
    expect(paddingResult).toBe('px-4');

    // Test multiple conflicts
    const multipleResult = cn('px-2 py-1', 'px-4 py-3');
    expect(multipleResult).toBe('px-4 py-3');
  });

  it('merge conflicting background colors', () => {
    const result = cn('bg-red-500', 'bg-blue-600');
    expect(result).toBe('bg-blue-600');
  });

  it('merge conflicting text colors', () => {
    const result = cn('text-red-500', 'text-blue-600');
    expect(result).toBe('text-blue-600');
  });

  it('preserve non-conflicting classes when merging', () => {
    const result = cn('px-4 text-white font-bold', 'py-2 bg-red-500', 'px-6');
    expect(result).toBe('text-white font-bold py-2 bg-red-500 px-6');
  });

  it('handle responsive classes correctly', () => {
    const result = cn('px-4 md:px-6', 'lg:px-8');
    expect(result).toBe('px-4 md:px-6 lg:px-8');
  });

  it('merge conflicting responsive classes', () => {
    const result = cn('px-4 md:px-6', 'md:px-8');
    expect(result).toBe('px-4 md:px-8');
  });

  it('handle hover and focus states', () => {
    const result = cn('bg-blue-500 hover:bg-blue-600', 'focus:bg-blue-700');
    expect(result).toBe('bg-blue-500 hover:bg-blue-600 focus:bg-blue-700');
  });

  it('merge conflicting hover states', () => {
    const result = cn('hover:bg-red-500', 'hover:bg-blue-500');
    expect(result).toBe('hover:bg-blue-500');
  });

  it('handle complex conditional logic', () => {
    const isActive = true;
    const isDisabled = false;
    const isLarge = true;

    const result = cn(
      'btn',
      {
        'btn-active': isActive,
        'btn-disabled': isDisabled,
        'btn-sm': !isLarge,
        'btn-lg': isLarge,
      },
      isActive && 'active-state',
      'final-class',
    );

    expect(result).toBe('btn btn-active btn-lg active-state final-class');
  });

  it('handle nested arrays', () => {
    const result = cn('base', ['array1', ['nested1', 'nested2']], 'final');
    expect(result).toBe('base array1 nested1 nested2 final');
  });

  it('maintain class order for non-conflicting classes', () => {
    const result = cn('z-10', 'absolute', 'top-0', 'left-0');
    expect(result).toBe('z-10 absolute top-0 left-0');
  });

  it('handle margin conflicts correctly', () => {
    const result = cn('m-2', 'mx-4', 'ml-6');
    expect(result).toBe('m-2 mx-4 ml-6');
  });

  it('work with component className prop pattern', () => {
    // Simulate common component pattern
    const baseClasses = 'px-4 py-2 rounded bg-blue-500';
    const userClasses = 'px-6 bg-red-500 shadow-lg';

    const result = cn(baseClasses, userClasses);
    expect(result).toBe('py-2 rounded px-6 bg-red-500 shadow-lg');
  });

  it('handle whitespace correctly', () => {
    const result = cn('  px-4  ', '  py-2  ', '  bg-blue-500  ');
    expect(result).toBe('px-4 py-2 bg-blue-500');
  });

  it('handle duplicate non-conflicting classes', () => {
    const result = cn('px-4 py-2', 'px-4 bg-blue-500');
    expect(result).toBe('py-2 px-4 bg-blue-500');
  });

  it('work with arbitrary values', () => {
    const result = cn('px-[20px]', 'px-[30px]');
    expect(result).toBe('px-[30px]');
  });

  it('handle CSS variables and arbitrary properties', () => {
    const result = cn('[--custom:20px]', 'px-4', '[--custom:30px]');
    expect(result).toBe('px-4 [--custom:30px]');
  });
});
