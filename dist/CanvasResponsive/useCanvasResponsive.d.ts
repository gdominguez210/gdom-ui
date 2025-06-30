/**
 * Options for the useCanvasResponsive hook
 */
export type UseCanvasResponsiveOptions = {
    /**
     * Optional callback to be called when the canvas is resized
     */
    onResize?: () => void;
    /**
     * Optional frame rate limit for resize handling (fps)
     */
    frameRate?: number;
};
/**
 * Hook to create a canvas that automatically scales to its size and device pixel ratio
 */
export declare function useCanvasResponsive(options?: UseCanvasResponsiveOptions): {
    canvasRef: import('react').RefCallback<Element>;
};
