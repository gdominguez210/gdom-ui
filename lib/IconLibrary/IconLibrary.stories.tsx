import type { StoryObj, Meta } from '@storybook/react-vite';
import { IconLibrary } from '@/lib/IconLibrary/IconLibrary';
import { icons, type IconName } from '@/lib/IconLibrary/data';

const iconNames = Object.keys(icons) as IconName[];

export default {
  title: 'components/IconLibrary',
  component: IconLibrary,
  parameters: {
    docs: {
      description: {
        component:
          'A versatile icon library component that allows using SVG icons by name. Convenient for internal use but includes all icons in your bundle.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    name: {
      control: {
        type: 'select',
      },
      options: iconNames,
      description: 'The name of the icon to display',
    },
  },
} as Meta<typeof IconLibrary>;

export const IconSandbox: StoryObj<typeof IconLibrary> = {
  args: {
    name: 'star-line',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive sandbox for experimenting with the IconLibrary component.',
      },
    },
  },
};

export const AllIcons: StoryObj<typeof IconLibrary> = {
  parameters: {
    docs: {
      description: {
        story: 'Gallery of all available icons in the library.',
      },
    },
  },
  render: () => {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {iconNames.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center rounded-md border border-gray-200 p-4 hover:bg-gray-50"
          >
            <IconLibrary
              name={name}
              className="mb-2 h-8 w-8"
            />
            <code className="text-xs text-gray-600">{name}</code>
          </div>
        ))}
      </div>
    );
  },
};
