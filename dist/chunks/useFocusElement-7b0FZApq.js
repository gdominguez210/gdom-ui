'use strict';

const React = require('react');

function useFocusElement({
  containerRef,
  elementToFocus,
  shouldFocus
}) {
  React.useEffect(() => {
    if (!containerRef.current || !elementToFocus.current || !shouldFocus) return;
    const container = containerRef.current;
    const element = elementToFocus.current;
    const styles = window.getComputedStyle(container);
    const hasTransition = parseFloat(styles.transitionDuration) > 0;
    const hasAnimation = parseFloat(styles.animationDuration) > 0 && styles.animationName !== "none";
    const handleVisualEffectEnd = (e) => {
      if (e.target === containerRef.current && element) {
        element.focus();
      }
    };
    if (hasTransition) {
      container.addEventListener("transitionend", handleVisualEffectEnd);
    }
    if (hasAnimation) {
      container.addEventListener("animationend", handleVisualEffectEnd);
    }
    if (!hasTransition && !hasAnimation) {
      element.focus();
    }
    return () => {
      container.removeEventListener("transitionend", handleVisualEffectEnd);
      container.removeEventListener("animationend", handleVisualEffectEnd);
    };
  }, [containerRef, elementToFocus, shouldFocus]);
  return {
    focus: () => {
      if (elementToFocus.current) {
        elementToFocus.current.focus();
      }
    }
  };
}

exports.useFocusElement = useFocusElement;
