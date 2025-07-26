import { useEventListener } from '@/lib/useEventListener';
import { useIntersectionObserver } from '@/lib/useIntersectionObserver';
import { useCallback, useEffect, useRef, useState } from 'react';

const observerOptions = {
  rootMargin: '-10% 0px -90% 0px',
};

const EXCLUDE_PREFIXES = ['-'];

export function useDocumentationNavItems() {
  const [activeSection, setActiveSection] = useState<string>('');
  const [items, setItems] = useState<Element[]>([]);
  const isNavigatingViaLinkRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    if (isNavigatingViaLinkRef.current) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveSection(entry.target.id);
      }
    });
  }, []);

  const { observe, disconnect } = useIntersectionObserver(handleIntersection, observerOptions);

  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('#storybook-docs :is(h1, h2)')).filter(
      (heading) => {
        if (!heading.id) return false;

        const isExcluded = EXCLUDE_PREFIXES.some((prefix) => heading.id.startsWith(prefix));

        return !isExcluded;
      },
    );
    setItems(headings);
  }, []);

  useEffect(() => {
    if (!items.length) return;

    disconnect();

    items.forEach((item) => {
      observe(item);
    });
  }, [items, observe, disconnect]);

  const handleScroll = useCallback(() => {
    if (!isNavigatingViaLinkRef.current) return;

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isNavigatingViaLinkRef.current = false;
    }, 150);
  }, []);

  useEventListener({
    target: document,
    event: 'scroll',
    handler: handleScroll,
    options: {
      passive: true,
    },
    cleanup: () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, element: Element) => {
    e.preventDefault();

    isNavigatingViaLinkRef.current = true;
    setActiveSection(element.id);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return {
    activeSection,
    items,
    handleClick,
  };
}
