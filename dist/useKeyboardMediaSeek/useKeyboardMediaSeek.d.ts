import { KeyboardEvent, RefObject } from 'react';
type HTMLMediaElement = HTMLAudioElement | HTMLVideoElement;
export type UseKeyboardMediaSeekOptions = {
    /**
     * Reference to the media element (audio or video)
     */
    mediaRef: RefObject<HTMLMediaElement>;
    /**
     * The total duration of the media in seconds
     */
    duration: number;
    /**
     * Callback fired when a seek operation is completed.
     * @param time The new time position in seconds (can be used if needed)
     */
    onSeekComplete?: (time: number) => void;
    /**
     * Initial amount of time (in seconds) to seek when using keyboard navigation
     * @default 1
     */
    seekIncrement?: number;
    /**
     * Maximum amount of time (in seconds) to seek when holding down arrow keys
     * @default 30
     */
    maxSeekIncrement?: number;
    /**
     * Rate at which seek increment increases when holding down arrow keys
     * @default 1.5
     */
    seekAcceleration?: number;
    /**
     * Delay in milliseconds before seek acceleration begins
     * @default 500
     */
    seekAccelerationDelay?: number;
    /**
     * Custom label for the media control element
     * @default "Media player. Use arrow keys to navigate."
     */
    ariaLabel?: string;
    /**
     * Interval in milliseconds between seek operations when holding a key
     * @default 100
     */
    seekInterval?: number;
};
export type UseKeyboardMediaSeekReturn = {
    /**
     * Current seek increment amount (changes while accelerating)
     */
    currentSeekIncrement: number;
    /**
     * Handler for keydown events
     */
    handleKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
    /**
     * Handler for keyup events
     */
    handleKeyUp: (event: KeyboardEvent<HTMLElement>) => void;
    /**
     * Accessibility attributes to apply to the focusable element
     */
    a11yProps: {
        /**
         * Make the element keyboard focusable
         */
        tabIndex: number;
        /**
         * ARIA role for the control
         */
        role: string;
        /**
         * Description of the control for screen readers
         */
        'aria-label': string;
        /**
         * Minimum value of the slider
         */
        'aria-valuemin': number;
        /**
         * Maximum value of the slider
         */
        'aria-valuemax': number;
        /**
         * Current value of the slider
         */
        'aria-valuenow': number;
        /**
         * Text representation of the current value
         */
        'aria-valuetext'?: string;
    };
};
/**
 * Hook to handle keyboard-based seeking for audio or video elements.
 * Provides accelerated seeking when arrow keys are held down.
 */
export declare function useKeyboardMediaSeek({ mediaRef, duration, onSeekComplete, seekIncrement, maxSeekIncrement, seekAcceleration, seekAccelerationDelay, ariaLabel, seekInterval, }: UseKeyboardMediaSeekOptions): UseKeyboardMediaSeekReturn;
export {};
