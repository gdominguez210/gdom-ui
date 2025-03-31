import { type RefObject, useEffect } from 'react';

interface UseFocusElementProps {
  /**
   * Container element that might have animations/transitions
   */
  containerRef: RefObject<HTMLElement | null>;

  /**
   * Specific element to focus
   */
  elementToFocus: RefObject<HTMLElement | null>;

  /**
   * Whether the focus should be activated
   */
  shouldFocus: boolean;
}

/**
 * Hook to focus a specific element, waiting for container animations/transitions to complete
 *
 * @param containerRef - Reference to the container with potential animations/transitions
 * @param elementToFocus - Reference to the element that should receive focus
 * @param shouldFocus - Whether the element should be focused
 */
export function useFocusElement({
  containerRef,
  elementToFocus,
  shouldFocus,
}: UseFocusElementProps) {
  useEffect(() => {
    if (!containerRef.current || !elementToFocus.current || !shouldFocus) return;

    const container = containerRef.current;
    const element = elementToFocus.current;

    // Check for animations/transitions
    const styles = window.getComputedStyle(container);
    const hasTransition = parseFloat(styles.transitionDuration) > 0;
    const hasAnimation =
      parseFloat(styles.animationDuration) > 0 && styles.animationName !== 'none';

    const handleVisualEffectEnd = (e: Event) => {
      if (e.target === containerRef.current && element) {
        element.focus();
      }
    };

    if (hasTransition) {
      container.addEventListener('transitionend', handleVisualEffectEnd);
    }

    if (hasAnimation) {
      container.addEventListener('animationend', handleVisualEffectEnd);
    }

    if (!hasTransition && !hasAnimation) {
      element.focus();
    }

    return () => {
      container.removeEventListener('transitionend', handleVisualEffectEnd);
      container.removeEventListener('animationend', handleVisualEffectEnd);
    };
  }, [containerRef, elementToFocus, shouldFocus]);

  return {
    focus: () => {
      if (elementToFocus.current) {
        elementToFocus.current.focus();
      }
    },
  };
}
