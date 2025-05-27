import type { StoryFn, Decorator } from '@storybook/react-vite';
import { useEffect } from 'react';

export const CollapseCategory =
  (...categoryNames: string[]): Decorator =>
  (Story: StoryFn, context) => {
    useEffect(() => {
      setTimeout(() => {
        // Process each category
        categoryNames.forEach((categoryName) => {
          // Find the <tr> with a title starting with "Hide <category>"
          const tr = Array.from(document.querySelectorAll('tr')).find((tr) =>
            tr.getAttribute('title')?.startsWith(`Hide ${categoryName}`),
          );

          // Find the first button inside that <tr>
          const button = tr?.querySelector('button[tabindex="0"]');

          if (button) {
            (button as HTMLElement).click();
          }
        });
      }, 0);
    }, []);

    return Story(context.args, context);
  };
