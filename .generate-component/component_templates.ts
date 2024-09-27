// component.tsx
export const component = (name: string) => {
  return `export interface ${name}Props {}

export function ${name}(props: ${name}Props){
  return <div>Hello 👋, I am a ${name} component.</div>;
};
`;
};

// component.stories.jsx
export const story = (name: string) => `import type { StoryObj, Meta } from '@storybook/react';
import { ${name} as ${name}Component } from  '@lib/${name}/${name}';

export default {
  title: 'components/${name}',
  component: ${name}Component,
} as Meta<typeof ${name}Component>;

export const ${name}: StoryObj<typeof ${name}Component> = {
  args: {}
};
`;

// component.test.tsx
export const test = (name: string) => `import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ${name} } from '@lib/${name}';

describe('${name} should...', () => {
  test('match the snapshot', () => {
    const { container } = render(<${name} />);
    expect(container).toMatchSnapshot();
  });
});
`;

// index.ts
export const barrel = (name: string, relative?: boolean) =>
  `export * from '${relative ? './' : ''}${name}';`;
