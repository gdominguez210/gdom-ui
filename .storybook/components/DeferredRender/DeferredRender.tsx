import { useRef, useState, useCallback, type ComponentPropsWithRef } from 'react';
import { useIntersectionObserver } from '@/lib/useIntersectionObserver/useIntersectionObserver';

type DeferredRenderProps = ComponentPropsWithRef<'div'> & {
  height?: number;
  intersectionObserverOptions?: IntersectionObserverInit;
};

export function DeferredRender(props: DeferredRenderProps) {
  const {
    height,
    intersectionObserverOptions = {
      rootMargin: '300px 0px',
      threshold: 0,
    },
    ...restProps
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const wasVisibleRef = useRef(false);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (!entry) return;

    const currentlyVisible = entry.isIntersecting;
    setIsVisible(currentlyVisible);

    if (currentlyVisible && !wasVisibleRef.current) {
      wasVisibleRef.current = true;
    }
  }, []);

  const { setRef } = useIntersectionObserver(handleIntersection, intersectionObserverOptions);

  return (
    <div
      ref={setRef}
      {...restProps}
    >
      {isVisible || wasVisibleRef.current ? (
        props.children
      ) : (
        <div
          className="flex items-center justify-center rounded-lg bg-stone-300"
          style={height ? { height: `${height}px` } : undefined}
        />
      )}
    </div>
  );
}
