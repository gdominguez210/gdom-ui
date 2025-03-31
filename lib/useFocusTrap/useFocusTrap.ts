import { type RefObject, useEffect, useCallback, useRef } from 'react';

interface UseFocusTrapProps {
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
}

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
 *
 * Note: This hook ONLY handles the tab trapping behavior and escape key. It does NOT handle:
 * - Initial focusing (use useFocusFirstElement for focusing first element)
 * - Focus restoration (use useFocusElement for returning focus to trigger elements)
 * - Waiting for animations/transitions (those hooks handle that)
 *
 * @param containerRef - Reference to the element to trap focus within
 * @param isActive - Whether the focus trap should be active
 * @param onEscape - Optional callback function triggered when Escape key is pressed
 */
export function useFocusTrap({ containerRef, isActive, onEscape }: UseFocusTrapProps) {
  // Cache focusable elements to avoid re-querying on every keypress
  const focusableElementsRef = useRef<HTMLElement[]>([]);
  const firstElementRef = useRef<HTMLElement | null>(null);
  const lastElementRef = useRef<HTMLElement | null>(null);

  // Function to update the focusable elements cache
  const updateFocusableElements = useCallback(() => {
    if (!containerRef.current) {
      focusableElementsRef.current = [];
      firstElementRef.current = null;
      lastElementRef.current = null;
      return false;
    }

    // Cache the focusable elements
    focusableElementsRef.current = findFocusableElements(containerRef.current);

    // Cache first and last elements for quick access
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

  // Update the cached elements whenever the container changes or trap becomes active
  useEffect(() => {
    if (!isActive) {
      focusableElementsRef.current = [];
      firstElementRef.current = null;
      lastElementRef.current = null;
      return;
    }

    updateFocusableElements();
  }, [containerRef, isActive, updateFocusableElements]);

  // Handle keyboard events (tab for trapping focus and escape for callback)
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Handle tab key for focus trapping
      if (event.key === 'Tab') {
        const firstElement = firstElementRef.current;
        const lastElement = lastElementRef.current;

        if (!firstElement || !lastElement) return;

        // Check if shift key is being held down for reverse tabbing
        if (event.shiftKey) {
          // If focus is on first element and user presses Shift+Tab, wrap to last element
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // If focus is on last element and user presses Tab, wrap to first element
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

  // Set up and clean up the focus trap when active state changes
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    // Attach the keyboard event listener for trapping focus
    document.addEventListener('keydown', handleKeyDown);

    // Clean up on unmount or when trap becomes inactive
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, handleKeyDown, containerRef]);

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
