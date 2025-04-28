import { useRef, useCallback, type RefObject } from 'react';
import { useIntersectionObserver } from '@lib/useIntersectionObserver';

export type ElementDimensions = {
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;
  x: number;
  y: number;
};

export type UseElementDimensionsReturn = {
  dimensions: ElementDimensions;
  dimensionsRef: RefObject<ElementDimensions>;
  elementRef: (node: Element | null) => void;
};

export function useElementDimensions(): UseElementDimensionsReturn {
  const dimensionsRef = useRef<ElementDimensions>({
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    x: 0,
    y: 0,
  });

  const intersectionCallback = useCallback((entries: IntersectionObserverEntry[]) => {
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
          y: rect.y,
        };
      }
    }
  }, []);

  const { setRef: elementRef } = useIntersectionObserver(intersectionCallback);

  return {
    dimensions: dimensionsRef.current,
    dimensionsRef,
    elementRef,
  };
}
