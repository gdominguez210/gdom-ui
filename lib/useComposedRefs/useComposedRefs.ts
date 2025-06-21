import { useCallback, type Ref, type RefCallback } from 'react';

/**
 * Type representing any valid React ref input that can be composed
 */
export type ComposableRef<T> = Ref<T> | undefined | null;

/**
 * Sets a value on a ref, handling both callback refs and object refs.
 * Returns any cleanup function provided by callback refs.
 */
function setRef<T>(ref: ComposableRef<T>, instance: T | null) {
  if (!ref) return undefined;

  if (typeof ref === 'function') {
    const result = ref(instance);
    if (typeof result === 'function') {
      return result;
    }
  } else if ('current' in ref) {
    ref.current = instance;
  }

  return undefined;
}

/**
 * Composes multiple refs into a single ref callback function.
 * Returns a function that, when called with an instance, will apply
 * the instance to all provided refs and return a cleanup function.
 */
export function composeRefs<T>(...refs: ComposableRef<T>[]) {
  return (instance: T | null) => {
    const evaluatedRefs = refs.map((ref) => setRef(ref, instance));

    return () => {
      evaluatedRefs.forEach((value, index) => {
        if (typeof value === 'function') {
          value();
        } else {
          setRef(refs[index], null);
        }
      });
    };
  };
}

/**
 * A hook that composes multiple React refs into a single ref callback.
 * Useful for combining refs like forwarded refs with local refs.
 */
export function useComposedRefs<T>(...refs: ComposableRef<T>[]): RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(composeRefs<T>(...refs), refs);
}
