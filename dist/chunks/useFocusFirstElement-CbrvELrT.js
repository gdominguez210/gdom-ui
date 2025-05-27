import { useRef, useEffect } from 'react';

function getFirstFocusableElement(element) {
  const selector = 'a[href]:not([disabled]), button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details:not([disabled]), [tabindex]:not([tabindex="-1"])';
  return element.querySelector(selector);
}
function useFocusFirstElement({ containerRef, shouldFocus }) {
  const firstFocusableElementRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current || !shouldFocus) return;
    const container = containerRef.current;
    firstFocusableElementRef.current = getFirstFocusableElement(container);
    if (!firstFocusableElementRef.current) return;
    const styles = window.getComputedStyle(container);
    const hasTransition = parseFloat(styles.transitionDuration) > 0;
    const hasAnimation = parseFloat(styles.animationDuration) > 0 && styles.animationName !== "none";
    const handleVisualEffectEnd = (e) => {
      if (e.target === containerRef.current && firstFocusableElementRef.current) {
        firstFocusableElementRef.current.focus();
      }
    };
    if (hasTransition) {
      container.addEventListener("transitionend", handleVisualEffectEnd);
    }
    if (hasAnimation) {
      container.addEventListener("animationend", handleVisualEffectEnd);
    }
    if (!hasTransition && !hasAnimation) {
      firstFocusableElementRef.current.focus();
    }
    return () => {
      container.removeEventListener("transitionend", handleVisualEffectEnd);
      container.removeEventListener("animationend", handleVisualEffectEnd);
    };
  }, [containerRef, shouldFocus]);
  return {
    focus: () => {
      if (firstFocusableElementRef.current) {
        firstFocusableElementRef.current.focus();
      }
    },
    hasFocusableElement: () => firstFocusableElementRef.current !== null
  };
}

export { getFirstFocusableElement as g, useFocusFirstElement as u };
