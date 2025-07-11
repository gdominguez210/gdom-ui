import { useRef, useCallback, useEffect } from 'react';
import { u as useIntersectionObserver } from './useIntersectionObserver-DbqYRwNB.js';
import { u as useResizeObserver } from './useResizeObserver-ikTg3ekm.js';
import { u as useComposedRefs } from './useComposedRefs-DMyoGc1Z.js';
import { r as rafThrottle } from './index-BNcYsuFP.js';

function useElementDimensions() {
  const dimensionsRef = useRef({
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    x: 0,
    y: 0
  });
  const elementRef = useRef(null);
  const intersectionCallback = useCallback((entries) => {
    if (entries.length > 0) {
      const entry = entries[0];
      if (entry?.isIntersecting) {
        const rect = entry.boundingClientRect;
        dimensionsRef.current = {
          width: rect.width,
          height: rect.height,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          x: rect.x,
          y: rect.y
        };
      }
    }
  }, []);
  const resizeCallback = useCallback((entries) => {
    if (entries.length > 0) {
      const entry = entries[0];
      if (!entry) return;
      let width = 0;
      let height = 0;
      if (entry.borderBoxSize && entry.borderBoxSize[0]) {
        width = entry.borderBoxSize[0].inlineSize;
        height = entry.borderBoxSize[0].blockSize;
      } else if (entry.contentRect) {
        width = entry.contentRect.width;
        height = entry.contentRect.height;
      }
      dimensionsRef.current = {
        ...dimensionsRef.current,
        width,
        height
      };
    }
  }, []);
  const { setRef: intersectionRef } = useIntersectionObserver(intersectionCallback);
  const { setRef: resizeRef } = useResizeObserver(resizeCallback);
  const mergedRef = useComposedRefs(intersectionRef, resizeRef, elementRef);
  useEffect(() => {
    const measurePosition = () => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const current = dimensionsRef.current;
      if (rect.top === current.top && rect.right === current.right && rect.bottom === current.bottom && rect.left === current.left && rect.x === current.x && rect.y === current.y) {
        return;
      }
      requestAnimationFrame(() => {
        dimensionsRef.current = {
          ...dimensionsRef.current,
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          x: rect.x,
          y: rect.y
        };
      });
    };
    const throttledMeasurePosition = rafThrottle(measurePosition);
    window.addEventListener("resize", throttledMeasurePosition);
    return () => {
      window.removeEventListener("resize", throttledMeasurePosition);
    };
  }, []);
  const getElementDimensions = useCallback(() => dimensionsRef.current, []);
  return {
    getElementDimensions,
    elementRef: mergedRef
  };
}

export { useElementDimensions as u };
