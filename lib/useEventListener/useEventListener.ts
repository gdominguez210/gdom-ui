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
};

export function useEventListener<T extends Event = Event>(options: UseEventListenerOptions<T>) {
  const { target, event, handler, options: eventOptions } = options;

  const handlerRef = useLatest(handler);

  useEffect(() => {
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
    };
  }, [target, event, handlerRef, eventOptions]);
}
