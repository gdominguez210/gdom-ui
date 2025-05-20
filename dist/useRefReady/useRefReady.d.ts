export type RefReadyResult<T> = [(node: T | null) => void, boolean, React.RefObject<T | null>];
/**
 * A hook that tracks whether a ref has been set
 * @param initialValue Optional initial value
 * @returns [setRef, isReady, ref] - A callback ref function, boolean state, and the actual ref object
 */
export declare function useRefReady<T>(initialValue?: T | null): RefReadyResult<T>;
