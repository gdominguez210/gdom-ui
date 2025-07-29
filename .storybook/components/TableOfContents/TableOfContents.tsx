import { useState } from 'react';
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

  const { items, handleClick, activeSection } = useDocumentationNavItems();

  if (items.length === 0) return null;

  return (
    <StyledTableOfContents className="sb-unstyled fixed top-3 right-4 z-1000 flex w-48 flex-col gap-1 rounded-lg border-2 border-slate-200 bg-white shadow-xs">
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
      <nav
        className={cn('flex flex-col gap-1 text-base transition-all duration-200', {
          flex: isOpen,
          hidden: !isOpen,
        })}
      >
        {items.map((item, index) => (
          <TableOfContentsItem
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
    </StyledTableOfContents>
  );
}
