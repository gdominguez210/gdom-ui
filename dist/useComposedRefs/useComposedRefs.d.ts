import { Ref, RefCallback } from 'react';
/**
 * Type representing any valid React ref input that can be composed
 */
export type ComposableRef<T> = Ref<T> | undefined | null;
/**
 * Composes multiple refs into a single ref callback function.
 * Returns a function that, when called with an instance, will apply
 * the instance to all provided refs and return a cleanup function.
 */
export declare function composeRefs<T>(...refs: ComposableRef<T>[]): (instance: T | null) => () => void;
/**
 * A hook that composes multiple React refs into a single ref callback.
 * Useful for combining refs like forwarded refs with local refs.
 */
export declare function useComposedRefs<T>(...refs: ComposableRef<T>[]): RefCallback<T>;
