// component.tsx
export const component = (name: string) => {
  return `export interface ${name}Props {}

export function ${name}(props: ${name}Props){
  return <div>Hello 👋, I am a ${name} component.</div>;
};
`;
};

// component.stories.jsx
export const story = (
  name: string,
) => `/* eslint-disable import/no-extraneous-dependencies, react/jsx-props-no-spreading */
import type { StoryObj, Meta } from '@storybook/react';
import { ${name} as ${name}Component } from  '@lib/${name}';

export default {
  component: ${name}Component,
  parameters: { layout: "fullscreen" },
} as Meta<typeof ${name}Component>;

export const ${name}: StoryObj<typeof ${name}Component> = {
  args: {}
};
`;

// component.test.tsx
export const test = (name: string) => `

import { render } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ${name} } from '@lib/${name}';

describe('${name} should...', () => {
  test('it should match the snapshot', () => {
    const { container } = render(<${name} />);
    expect(container).toMatchSnapshot();
  });
});
`;

// index.ts
export const barrel = (name: string, relative?: boolean) =>
  `export * from '${relative ? './' : ''}${name}';`;
