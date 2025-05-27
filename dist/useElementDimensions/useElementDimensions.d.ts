import { RefObject } from 'react';
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
export declare function useElementDimensions(): UseElementDimensionsReturn;
