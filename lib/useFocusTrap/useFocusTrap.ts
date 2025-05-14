import { type RefObject, useEffect, useCallback, useRef } from 'react';

export type UseFocusTrapOptions = {
  /**
   * Reference to the container element to trap focus within
   */
  containerRef: RefObject<HTMLElement | null>;

  /**
   * Whether the focus trap should be active
   */
  isActive: boolean;

  /**
   * Optional callback function that gets triggered when the Escape key is pressed
   */
  onEscape?: () => void;

  /**
   * Optional callback function that gets triggered when clicking outside the container
   * If not provided, outside clicks will be prevented but no callback will be executed
   */
  onOutsideClick?: (event: MouseEvent) => void;

  /**
   * Whether to prevent clicks outside the container
   * @default true
   */
  preventOutsideClicks?: boolean;
};

/**
 * Find all focusable elements within a container
 */
function findFocusableElements(element: HTMLElement): HTMLElement[] {
  // Selector for all potentially focusable elements
  // Each element type needs its own :not([tabindex="-1"]) to catch elements with native
  // focusability that have been explicitly removed from the tab order
  const selector =
    'a[href]:not([disabled]):not([tabindex="-1"]), ' +
    'button:not([disabled]):not([tabindex="-1"]), ' +
    'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), ' +
    'textarea:not([disabled]):not([tabindex="-1"]), ' +
    'select:not([disabled]):not([tabindex="-1"]), ' +
    'details:not([disabled]):not([tabindex="-1"]), ' +
    // For elements that aren't natively focusable but have a positive tabindex
    '[tabindex]:not([disabled]):not([tabindex="-1"])';

  return Array.from(element.querySelectorAll(selector)) as HTMLElement[];
}

/**
 * Hook that traps keyboard focus within a container element when active
 * Prevents users from tabbing outside the container, maintaining keyboard accessibility
 * Also provides escape key handling through the optional onEscape callback
 * Optionally prevents clicks outside the container when active
 *
 * Note: This hook handles tab trapping, escape key and outside clicks. It does NOT handle:
 * - Initial focusing (use useFocusFirstElement for focusing first element)
 * - Focus restoration (use useFocusElement for returning focus to trigger elements)
 * - Waiting for animations/transitions (those hooks handle that)
 *
 * @param containerRef - Reference to the element to trap focus within
 * @param isActive - Whether the focus trap should be active
 * @param onEscape - Optional callback function triggered when Escape key is pressed
 * @param onOutsideClick - Optional callback function triggered when clicking outside the container
 * @param preventOutsideClicks - Whether to prevent clicks outside the container (default: true)
 */
export function useFocusTrap({
  containerRef,
  isActive,
  onEscape,
  onOutsideClick,
  preventOutsideClicks = true,
}: UseFocusTrapOptions) {
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const firstElementRef = useRef<HTMLElement | null>(null);
  const lastElementRef = useRef<HTMLElement | null>(null);

  const updateFocusableElements = useCallback(() => {
    if (!containerRef.current) {
      focusableElementsRef.current = [];
      firstElementRef.current = null;
      lastElementRef.current = null;
      return false;
    }

    focusableElementsRef.current = findFocusableElements(containerRef.current);

    if (focusableElementsRef.current.length > 0) {
      firstElementRef.current = focusableElementsRef.current[0] || null;
      const lastIndex = focusableElementsRef.current.length - 1;
      lastElementRef.current = focusableElementsRef.current[lastIndex] || null;
      return true;
    }

    // No focusable elements found
    firstElementRef.current = null;
    lastElementRef.current = null;
    return false;
  }, [containerRef]);

  useEffect(() => {
    if (!isActive) {
      focusableElementsRef.current = [];
      firstElementRef.current = null;
      lastElementRef.current = null;
      return;
    }

    updateFocusableElements();
  }, [containerRef, isActive, updateFocusableElements]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const firstElement = firstElementRef.current;
        const lastElement = lastElementRef.current;

        if (!firstElement || !lastElement) return;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }

      if (event.key === 'Escape') {
        onEscape?.();
      }
    },
    [onEscape],
  );

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (!containerRef.current || !isActive) return;

      const target = event.target as Node;
      if (containerRef.current.contains(target)) {
        return;
      }

      if (preventOutsideClicks) {
        event.preventDefault();
        event.stopPropagation();
      }

      onOutsideClick?.(event);
    },
    [containerRef, isActive, preventOutsideClicks, onOutsideClick],
  );

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    document.addEventListener('keydown', handleKeyDown);

    if (preventOutsideClicks || onOutsideClick) {
      document.addEventListener('click', handleOutsideClick, { capture: true });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (preventOutsideClicks || onOutsideClick) {
        document.removeEventListener('click', handleOutsideClick, { capture: true });
      }
    };
  }, [
    isActive,
    handleKeyDown,
    handleOutsideClick,
    containerRef,
    preventOutsideClicks,
    onOutsideClick,
  ]);

  // Create safe functions to access the element refs
  const getFocusableElements = useCallback(() => {
    return [...focusableElementsRef.current];
  }, []);

  const getFirstElement = useCallback(() => {
    return firstElementRef.current;
  }, []);

  const getLastElement = useCallback(() => {
    return lastElementRef.current;
  }, []);

  return {
    isTrapped: isActive && !!containerRef.current,
    refresh: updateFocusableElements,
    getFocusableElements,
    getFirstElement,
    getLastElement,
  };
}
