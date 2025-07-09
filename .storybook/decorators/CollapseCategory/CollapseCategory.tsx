import type { StoryFn, Decorator } from '@storybook/react-vite';
import { useEffect } from 'react';

export const CollapseCategory =
  (...categoryNames: string[]): Decorator =>
  (Story: StoryFn, context) => {
    useEffect(() => {
      setTimeout(() => {
        categoryNames.forEach((categoryName) => {
          const tr = Array.from(document.querySelectorAll('tr')).find((tr) =>
            tr.getAttribute('title')?.startsWith(`Hide ${categoryName}`),
          );

          const button = tr?.querySelector('button[tabindex="0"]');

          if (button) {
            (button as HTMLElement).click();
          }
        });
      }, 0);
    }, []);

    return Story(context.args, context);
  };
