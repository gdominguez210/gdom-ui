import { RefObject } from 'react';
interface UseFocusElementProps {
    /**
     * Container element that might have animations/transitions
     */
    containerRef: RefObject<HTMLElement | null>;
    /**
     * Specific element to focus
     */
    elementToFocus: RefObject<HTMLElement | null>;
    /**
     * Whether the focus should be activated
     */
    shouldFocus: boolean;
}
/**
 * Hook to focus a specific element, waiting for container animations/transitions to complete
 *
 * @param containerRef - Reference to the container with potential animations/transitions
 * @param elementToFocus - Reference to the element that should receive focus
 * @param shouldFocus - Whether the element should be focused
 */
export declare function useFocusElement({ containerRef, elementToFocus, shouldFocus, }: UseFocusElementProps): {
    focus: () => void;
};
export {};
