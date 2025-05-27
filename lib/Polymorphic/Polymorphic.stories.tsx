import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentPropsWithRef, ElementType } from 'react';
import { Polymorphic, type PolymorphicProps } from './Polymorphic';
import { Button } from '@/lib/Button/Button';

function Text<T extends ElementType = 'p'>(props: PolymorphicProps<T>) {
  const { as = 'p', className, children, ...restProps } = props;

  return (
    <Polymorphic
      as={as}
      className={`text-lg font-medium text-gray-900 ${className}`}
      {...restProps}
    >
      {children}
    </Polymorphic>
  );
}

const meta = {
  title: 'components/Polymorphic',
  component: Polymorphic,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      'A flexible component that can render as different HTML elements or React components',
    docs: {
      description: {
        component:
          'The Polymorphic component is a foundational building block in GDOM-UI that enables flexible rendering of components as different HTML elements or custom React components. This pattern is used throughout the library to maximize component flexibility and reusability.',
      },
      source: {
        type: 'dynamic',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: [
        'div',
        'section',
        'article',
        'main',
        'aside',
        'header',
        'footer',
        'nav',
        'button',
        'a',
        'span',
        'p',
      ],
      description: 'The HTML element or React component to render as',
      table: {
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'div' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the element',
      table: {
        disable: true,
      },
    },
    children: {
      control: 'text',
      description: 'The content to render inside the element',
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<typeof Polymorphic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'By default, the Polymorphic component renders as a `div` element. This is useful when you need a simple container without any specific semantic meaning.',
      },
    },
  },
  render: (args: ComponentPropsWithRef<typeof Polymorphic>) => (
    <Polymorphic {...args}>
      <div className="flex items-center gap-2">
        <span>Rendered as:</span>
        <code className="rounded bg-gray-100 px-2 py-1">{args['as'] || 'div'}</code>
      </div>
    </Polymorphic>
  ),
};

export const AsLink: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Rendering as an anchor tag (`<a>`) demonstrates how the component handles element-specific props like `href`. The component maintains proper TypeScript types for all element-specific props.',
      },
    },
    controls: { disable: true },
  },
  args: {
    as: 'a',
    href: 'https://example.com',
    children: 'Visit Example.com',
    className: 'text-blue-500 hover:text-blue-600 underline',
  },
};

export const AsSection: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The component can render as semantic HTML elements like `section`, maintaining proper accessibility and document structure. This example shows how to use it with nested content.',
      },
    },
    controls: { disable: true },
  },
  args: {
    as: 'section',
    children: (
      <>
        <h2 className="mb-2 text-xl font-bold">Section Title</h2>
        <p>This is a section element with nested content.</p>
      </>
    ),
    className: 'p-4 border rounded-lg',
  },
};

export const WithCustomComponent: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The Polymorphic component can render as custom React components, allowing for composition and reuse of component logic. This example shows how to use it with the [Button](/docs/components-button--docs) component.',
      },
      source: {
        type: 'dynamic',
        transform: (code: string) => {
          // Replace the function reference with the Button component name
          return code.replace(/as=\{\(\) => \{\}\}/g, 'as={Button}');
        },
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <Polymorphic
      as={Button}
      variant="primary"
      size="lg"
    >
      CTA Text
    </Polymorphic>
  ),
};

export const WithTailwindClasses: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'The component uses `twMerge` to intelligently merge Tailwind classes, preventing conflicts and maintaining proper specificity. This example demonstrates how conflicting classes are resolved when a Text component (built with Polymorphic) is used with custom classes that override its base styles.',
      },
    },
    controls: { disable: true },
  },
  render: () => (
    <div className="space-y-8">
      <Text>Default text with base styles</Text>
      <Text className="text-2xl">Larger text size (overrides text-lg)</Text>
      <Text className="text-blue-600">Blue text color (preserves text-lg)</Text>
      <Text className="text-3xl font-bold text-red-600">
        Multiple overrides (size, weight, and color)
      </Text>
    </div>
  ),
};
