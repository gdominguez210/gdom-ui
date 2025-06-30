'use strict';

const React = require('react');

function findFocusableElements(element) {
  const selector = 'a[href]:not([disabled]):not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([type="hidden"]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), details:not([disabled]):not([tabindex="-1"]), [tabindex]:not([disabled]):not([tabindex="-1"])';
  return Array.from(element.querySelectorAll(selector));
}
function useFocusTrap({
  containerRef,
  isActive,
  onEscape,
  onOutsideClick,
  preventOutsideClicks = true
}) {
  const focusableElementsRef = React.useRef([]);
  const firstElementRef = React.useRef(null);
  const lastElementRef = React.useRef(null);
  const updateFocusableElements = React.useCallback(() => {
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
    firstElementRef.current = null;
    lastElementRef.current = null;
    return false;
  }, [containerRef]);
  React.useEffect(() => {
    if (!isActive) {
      focusableElementsRef.current = [];
      firstElementRef.current = null;
      lastElementRef.current = null;
      return;
    }
    updateFocusableElements();
  }, [containerRef, isActive, updateFocusableElements]);
  const handleKeyDown = React.useCallback(
    (event) => {
      if (event.key === "Tab") {
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
      if (event.key === "Escape") {
        onEscape?.();
      }
    },
    [onEscape]
  );
  const handleOutsideClick = React.useCallback(
    (event) => {
      if (!containerRef.current || !isActive) return;
      const target = event.target;
      if (containerRef.current.contains(target)) {
        return;
      }
      if (preventOutsideClicks) {
        event.preventDefault();
        event.stopPropagation();
      }
      onOutsideClick?.(event);
    },
    [containerRef, isActive, preventOutsideClicks, onOutsideClick]
  );
  React.useEffect(() => {
    if (!isActive || !containerRef.current) return;
    document.addEventListener("keydown", handleKeyDown);
    if (preventOutsideClicks || onOutsideClick) {
      document.addEventListener("click", handleOutsideClick, { capture: true });
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (preventOutsideClicks || onOutsideClick) {
        document.removeEventListener("click", handleOutsideClick, { capture: true });
      }
    };
  }, [
    isActive,
    handleKeyDown,
    handleOutsideClick,
    containerRef,
    preventOutsideClicks,
    onOutsideClick
  ]);
  const getFocusableElements = React.useCallback(() => {
    return [...focusableElementsRef.current];
  }, []);
  const getFirstElement = React.useCallback(() => {
    return firstElementRef.current;
  }, []);
  const getLastElement = React.useCallback(() => {
    return lastElementRef.current;
  }, []);
  return {
    isTrapped: isActive && !!containerRef.current,
    refresh: updateFocusableElements,
    getFocusableElements,
    getFirstElement,
    getLastElement
  };
}

exports.useFocusTrap = useFocusTrap;
