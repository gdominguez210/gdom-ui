import { useState } from 'react';
import { cn } from '@/utils/cn';
import { styled } from '@storybook/theming';
import { Button } from '@/lib/Button/Button';
import { IconArrowRightSLine } from '@/lib/IconArrowRightSLine/IconArrowRightSLine';
import { useDocumentationNavItems } from './useDocumentationNavItems';
import { DocumentationNavItem } from './DocumentationNavItem';
import { baseCommon } from '@storybook-components/Typography/config';

const StyledDocumentationNav = styled.div(baseCommon);

export function DocumentationNav() {
  const [isOpen, setIsOpen] = useState(true);

  const { items, handleClick, activeSection } = useDocumentationNavItems();

  if (items.length === 0) return null;

  return (
    <StyledDocumentationNav className="sb-unstyled fixed top-3 right-4 z-1000 flex w-48 flex-col gap-1 rounded-lg border-2 border-slate-200 bg-white shadow-xs">
      <Button
        className="flex justify-between font-bold text-inherit"
        variant="tertiary"
        size="md"
        onClick={() => setIsOpen(!isOpen)}
      >
        Table of Contents
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
          <DocumentationNavItem
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item)}
            active={activeSection ? activeSection === item.id : index === 0}
            title={item.textContent ?? ''}
          >
            {item.textContent}
          </DocumentationNavItem>
        ))}
      </nav>
    </StyledDocumentationNav>
  );
}
