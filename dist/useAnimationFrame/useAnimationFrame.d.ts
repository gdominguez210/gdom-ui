import { DependencyList } from 'react';
export type useAnimationFrameOptions = {
    /**
     * Whether the animation should be running
     */
    isActive: boolean;
    /**
     * Callback function to execute on each animation frame
     */
    callback: (timestamp: number) => void;
    /**
     * Optional frame rate limit in frames per second
     * If not provided, runs at browser's native refresh rate
     */
    frameRate?: number;
    /**
     * Optional dependencies that should trigger a reset of the animation
     * when changed (similar to useEffect dependencies)
     */
    dependencies?: DependencyList;
    /**
     * Whether to automatically start/stop the animation based on isActive
     * If false, you must manually control the animation with start/stop methods
     * @default true
     */
    autoStart?: boolean;
};
export type useAnimationFrameReturn = {
    start: () => void;
    stop: () => void;
    restart: () => void;
};
export declare function useAnimationFrame(options: useAnimationFrameOptions): useAnimationFrameReturn;
