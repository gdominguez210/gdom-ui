import { type RefObject, useEffect, useRef } from 'react';

interface UseFocusFirstElementProps {
  containerRef: RefObject<HTMLElement | null>;
  shouldFocus: boolean;
}

/**
 * Finds the first focusable element within the provided container
 */
export function getFirstFocusableElement(element: HTMLElement): HTMLElement | null {
  const selector =
    'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details:not([disabled]), [tabindex]:not([tabindex="-1"])';

  return element.querySelector(selector) as HTMLElement | null;
}

/**
 * Hook to focus the first focusable element within a container
 * Automatically handles focusing after transitions or animations if the container has them
 *
 * @param containerRef - Reference to the container element
 * @param shouldFocus - Whether the element should be focused
 */
export function useFocusFirstElement({ containerRef, shouldFocus }: UseFocusFirstElementProps) {
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !shouldFocus) return;

    const container = containerRef.current;

    firstFocusableElementRef.current = getFirstFocusableElement(container);

    if (!firstFocusableElementRef.current) return;

    const styles = window.getComputedStyle(container);
    const hasTransition = parseFloat(styles.transitionDuration) > 0;
    const hasAnimation =
      parseFloat(styles.animationDuration) > 0 && styles.animationName !== 'none';

    const handleVisualEffectEnd = () => {
      if (firstFocusableElementRef.current) {
        firstFocusableElementRef.current.focus();
      }
    };

    if (hasTransition) {
      container.addEventListener('transitionend', handleVisualEffectEnd);
    }

    if (hasAnimation) {
      container.addEventListener('animationend', handleVisualEffectEnd);
    }

    if (!hasTransition && !hasAnimation) {
      firstFocusableElementRef.current.focus();
    }

    return () => {
      container.removeEventListener('transitionend', handleVisualEffectEnd);
      container.removeEventListener('animationend', handleVisualEffectEnd);
    };
  }, [containerRef, shouldFocus]);

  return {
    focus: () => {
      if (firstFocusableElementRef.current) {
        firstFocusableElementRef.current.focus();
      }
    },
    hasFocusableElement: () => firstFocusableElementRef.current !== null,
  };
}
