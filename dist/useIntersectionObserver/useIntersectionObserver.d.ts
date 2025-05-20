/**
 * Hook to observe an element's intersection with the viewport
 *
 * @param callback Standard IntersectionObserver callback function
 * @param options IntersectionObserver options
 * @returns Object with a setRef function to attach to the element you want to observe
 */
export declare function useIntersectionObserver(callback: IntersectionObserverCallback, options?: IntersectionObserverInit): {
    setRef: (node: Element | null) => void;
};
