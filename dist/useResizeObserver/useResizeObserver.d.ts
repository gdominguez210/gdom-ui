/**
 * Hook to observe an element's size changes
 *
 * @param callback Standard ResizeObserver callback function
 * @returns Object with a setRef function to attach to the element you want to observe
 */
export declare function useResizeObserver(callback: ResizeObserverCallback): {
    setRef: (node: Element | null) => void;
};
