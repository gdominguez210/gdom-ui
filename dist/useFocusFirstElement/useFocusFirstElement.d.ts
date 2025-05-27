import { RefObject } from 'react';
interface UseFocusFirstElementProps {
    containerRef: RefObject<HTMLElement | null>;
    shouldFocus: boolean;
}
/**
 * Finds the first focusable element within the provided container
 */
export declare function getFirstFocusableElement(element: HTMLElement): HTMLElement | null;
/**
 * Hook to focus the first focusable element within a container
 * Automatically handles focusing after transitions or animations if the container has them
 *
 * @param containerRef - Reference to the container element
 * @param shouldFocus - Whether the element should be focused
 */
export declare function useFocusFirstElement({ containerRef, shouldFocus }: UseFocusFirstElementProps): {
    focus: () => void;
    hasFocusableElement: () => boolean;
};
export {};
