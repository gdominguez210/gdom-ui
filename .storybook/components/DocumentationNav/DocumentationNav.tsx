import { useState, useEffect, type ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type NavItem = {
  label: string;
  href: string;
};

interface NavLinkProps extends ComponentPropsWithoutRef<'a'> {
  active?: boolean;
}

function NavLink({ active, className, children, ...props }: NavLinkProps) {
  return (
    <a
      className={twMerge(
        clsx(
          'block truncate overflow-hidden text-sm text-ellipsis text-blue-400 no-underline transition-colors',
          {
            'text-blue-700 underline': active,
            'hover:text-blue-700 hover:underline': !active,
          },
        ),
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export type DocumentationNavProps = {
  items?: NavItem[];
};

export function DocumentationNav({ items: providedItems }: DocumentationNavProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');
  const [items, setItems] = useState<NavItem[]>(providedItems || []);
  const [isNavigatingViaLink, setIsNavigatingViaLink] = useState(false);

  useEffect(() => {
    if (!providedItems) {
      const headings = Array.from(document.querySelectorAll('h1, h2'));
      const navItems = headings
        .map((heading) => ({
          label: heading.textContent || '',
          href: `#${heading.id}`,
        }))
        .filter((item) => item.href !== '#');
      setItems(navItems);
    }
  }, [providedItems]);

  useEffect(() => {
    if (items.length === 0 || isNavigatingViaLink) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-10% 0px -90% 0px',
      },
    );

    items.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items, isNavigatingViaLink]);

  useEffect(() => {
    if (!isNavigatingViaLink) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsNavigatingViaLink(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isNavigatingViaLink]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      setIsNavigatingViaLink(true);
      setActiveSection(href.slice(1));
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="sb-unstyled fixed top-6 right-6 z-1000 w-48 rounded-lg border border-slate-200 bg-white p-4 shadow-xs">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-sm font-bold text-slate-600 hover:text-blue-700"
      >
        Table of Contents
        <svg
          className={clsx('h-4 w-4 transform transition-transform', {
            'rotate-180': isOpen,
          })}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <nav
        className={clsx('mt-4 flex flex-col gap-2 transition-all duration-200', {
          block: isOpen,
          hidden: !isOpen,
        })}
      >
        {items.map((item: NavItem) => (
          <NavLink
            key={item.href}
            href={item.href}
            onClick={(e) => handleClick(e, item.href)}
            active={activeSection === item.href.slice(1)}
            title={item.label}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
