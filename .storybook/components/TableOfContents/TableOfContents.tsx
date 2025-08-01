import { useState, useRef, uesCallback, useCallback } from 'react';
import { styled } from 'storybook/theming';
import { cn } from '@/utils/cn';
import { Button } from '@/lib/Button/Button';
import { IconArrowRightSLine } from '@/lib/IconArrowRightSLine/IconArrowRightSLine';
import { useDocumentationNavItems } from './useTableOfContents';
import { TableOfContentsItem } from './TableOfContentsItem';
import { baseCommon } from '@/.storybook/components/Typography/config';

const StyledTableOfContents = styled.div(baseCommon);

export function TableOfContents() {
  const [isOpen, setIsOpen] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { items, handleClick, activeSection } = useDocumentationNavItems();

  const scrollToActiveItem = useCallback((element: HTMLAnchorElement | null) => {
    if (element && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const elementRect = element.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const isVisible =
        elementRect.top >= containerRect.top && elementRect.bottom <= containerRect.bottom;

      if (!isVisible) {
        const elementOffsetTop = element.offsetTop;
        const containerHeight = container.clientHeight;
        const elementHeight = element.clientHeight;

        const targetScrollTop = elementOffsetTop - containerHeight / 2 + elementHeight / 2;

        container.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <StyledTableOfContents className="sb-unstyled fixed top-3 right-4 z-1000 flex max-h-[calc(100vh-var(--spacing)*6)] w-48 flex-col rounded-lg border-2 border-slate-200 bg-white shadow-xs">
      <Button
        className="flex justify-between font-bold text-inherit"
        variant="tertiary"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        On This Page
        <span className="text-lg">
          <IconArrowRightSLine
            className={cn('rotate-90 transform transition-transform', { 'rotate-270': isOpen! })}
          />
        </span>
      </Button>
      <div
        ref={scrollContainerRef}
        className="scrollbar-thin scrollbar-thumb-blue-100 scrollbar-track-transparent overflow-y-auto"
      >
        <nav
          className={cn('flex flex-col gap-1 py-1 text-base transition-all duration-200', {
            flex: isOpen,
            hidden: !isOpen,
          })}
        >
          {items.map((item, index) => (
            <TableOfContentsItem
              ref={isOpen && activeSection === item.id ? scrollToActiveItem : undefined}
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item)}
              active={activeSection ? activeSection === item.id : index === 0}
              title={item.textContent ?? ''}
            >
              {item.textContent}
            </TableOfContentsItem>
          ))}
        </nav>
      </div>
    </StyledTableOfContents>
  );
}
