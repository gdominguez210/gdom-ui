import { RefObject } from 'react';
export type UseFocusTrapOptions = {
    /**
     * Reference to the container element to trap focus within
     */
    containerRef: RefObject<HTMLElement | null>;
    /**
     * Whether the focus trap should be active
     */
    isActive: boolean;
    /**
     * Optional callback function that gets triggered when the Escape key is pressed
     */
    onEscape?: () => void;
    /**
     * Optional callback function that gets triggered when clicking outside the container
     * If not provided, outside clicks will be prevented but no callback will be executed
     */
    onOutsideClick?: (event: MouseEvent) => void;
    /**
     * Whether to prevent clicks outside the container
     * @default true
     */
    preventOutsideClicks?: boolean;
};
/**
 * Hook that traps keyboard focus within a container element when active
 * Prevents users from tabbing outside the container, maintaining keyboard accessibility
 * Also provides escape key handling through the optional onEscape callback
 * Optionally prevents clicks outside the container when active
 *
 * Note: This hook handles tab trapping, escape key and outside clicks. It does NOT handle:
 * - Initial focusing (use useFocusFirstElement for focusing first element)
 * - Focus restoration (use useFocusElement for returning focus to trigger elements)
 * - Waiting for animations/transitions (those hooks handle that)
 *
 * @param containerRef - Reference to the element to trap focus within
 * @param isActive - Whether the focus trap should be active
 * @param onEscape - Optional callback function triggered when Escape key is pressed
 * @param onOutsideClick - Optional callback function triggered when clicking outside the container
 * @param preventOutsideClicks - Whether to prevent clicks outside the container (default: true)
 */
export declare function useFocusTrap({ containerRef, isActive, onEscape, onOutsideClick, preventOutsideClicks, }: UseFocusTrapOptions): {
    isTrapped: boolean;
    refresh: () => boolean;
    getFocusableElements: () => HTMLElement[];
    getFirstElement: () => HTMLElement | null;
    getLastElement: () => HTMLElement | null;
};
