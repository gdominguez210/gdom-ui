import { useEffect } from 'react';
import { useLatest } from '@/lib/useLatest/useLatest';

type EventListenerHandler<T extends Event = Event> =
  | ((event: T) => void)
  | { handleEvent: (event: T) => void };

export type UseEventListenerOptions<T extends Event = Event> = {
  target: EventTarget;
  event: string;
  handler: EventListenerHandler<T>;
  options?: boolean | AddEventListenerOptions;
  cleanup?: () => void;
};

/**
 * Hook that adds an event listener to a target element with automatic cleanup
 * Primarily designed for global objects like window, document, etc.
 *
 * @param options - The options for the event listener
 * @param options.target - The target element to add the event listener to
 * @param options.event - The event to listen for
 * @param options.handler - The handler function to call when the event is triggered
 * @param options.options - The options for the event listener
 * @param options.cleanup - A function to call when the event listener is removed
 */

export function useEventListener<T extends Event = Event>(options: UseEventListenerOptions<T>) {
  const { target, event, handler, options: eventOptions, cleanup } = options;

  const handlerRef = useLatest(handler);
  const cleanupRef = useLatest(cleanup);

  useEffect(() => {
    const currentCleanup = cleanupRef.current;

    const eventHandler = (event: Event) => {
      const currentHandler = handlerRef.current;

      if (typeof currentHandler === 'function') {
        currentHandler(event as T);
      } else if (currentHandler && typeof currentHandler.handleEvent === 'function') {
        currentHandler.handleEvent(event as T);
      }
    };

    target.addEventListener(event, eventHandler, eventOptions);

    return () => {
      target.removeEventListener(event, eventHandler, eventOptions);
      currentCleanup?.();
    };
  }, [target, event, handlerRef, eventOptions, cleanupRef]);
}
