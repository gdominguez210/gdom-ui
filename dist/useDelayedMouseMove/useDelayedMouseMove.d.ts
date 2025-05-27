import { MouseEventHandler } from 'react';
/**
 * Options for the useDelayedMouseMove hook
 */
export type UseDelayedMouseMoveOptions<T extends HTMLElement> = {
    /**
     * Delay in milliseconds before mouse move events are processed
     */
    initialDelay?: number;
    /**
     * Callback function to execute after the initial delay
     */
    onMouseMove: MouseEventHandler<T>;
    /**
     * Optional callback for when mouse leaves the element
     */
    onMouseLeave?: MouseEventHandler<T>;
};
/**
 * Hook that delays processing mouse move events until after an initial delay period
 * Useful for preventing flickering effects during quick mouse movements
 */
export declare function useDelayedMouseMove<T extends HTMLElement>({ initialDelay, onMouseMove, onMouseLeave, }: UseDelayedMouseMoveOptions<T>): {
    handleMouseEnter: MouseEventHandler<T>;
    handleMouseMove: MouseEventHandler<T>;
    handleMouseOut: MouseEventHandler<T>;
};
