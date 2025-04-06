import type { StoryObj, Meta } from '@storybook/react';
import { Icon as IconComponent } from '@lib/Icon';
import { icons, type IconName } from './data';
import { Button } from '@lib/Button';

export default {
  title: 'components/Icon',
  component: IconComponent,
  parameters: {
    docs: {
      description: {
        component:
          'A versatile icon component that renders SVG icons with consistent styling and behavior.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
} as Meta<typeof IconComponent>;

export const IconSandbox: StoryObj<typeof IconComponent> = {
  args: {
    name: 'star-line',
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive sandbox for experimenting with the Icon component.',
      },
    },
  },
};

export const AllIcons: StoryObj<typeof IconComponent> = {
  parameters: {
    docs: {
      description: {
        story: 'Gallery of all available icons in the library.',
      },
    },
  },
  render: () => {
    const iconNames = Object.keys(icons) as IconName[];

    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {iconNames.map((name) => (
          <div
            key={name}
            className="flex flex-col items-center justify-center rounded-md border border-gray-200 p-4 hover:bg-gray-50"
          >
            <IconComponent
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

export const SizingOptions: StoryObj<typeof IconComponent> = {
  parameters: {
    docs: {
      description: {
        story:
          'Icons inherit their size from the parent text size by default (using 1em), but can be explicitly sized using CSS classes, such as the text- utility classes from Tailwind.',
      },
    },
  },
  render: () => {
    const sizes = [
      { name: 'XS', class: 'text-xs' },
      { name: 'Small', class: 'text-sm' },
      { name: 'Base', class: 'text-base' },
      { name: 'Large', class: 'text-lg' },
      { name: 'XL', class: 'text-xl' },
      { name: '2XL', class: 'text-2xl' },
      { name: '4XL', class: 'text-4xl' },
    ];

    return (
      <div className="space-y-4">
        {sizes.map((size) => (
          <div
            key={size.name}
            className="flex items-center space-x-4"
          >
            <div className="w-16 text-sm">{size.name}:</div>
            <div className={size.class}>
              <IconComponent name="star-line" />
            </div>
            <div className={size.class}>
              <IconComponent name="play-large-fill" />
            </div>
            <div className={size.class}>
              <IconComponent name="volume-up-fill" />
            </div>
            <code className="text-xs text-gray-500">{size.class}</code>
          </div>
        ))}
      </div>
    );
  },
};

export const ColoredIcons: StoryObj<typeof IconComponent> = {
  parameters: {
    docs: {
      description: {
        story: 'Icons can be colored using text color utilities from Tailwind.',
      },
    },
  },
  render: () => {
    const colors = [
      { name: 'Default', class: '' },
      { name: 'Primary', class: 'text-blue-500' },
      { name: 'Success', class: 'text-green-500' },
      { name: 'Warning', class: 'text-yellow-500' },
      { name: 'Danger', class: 'text-red-500' },
      { name: 'Gray', class: 'text-gray-500' },
    ];

    return (
      <div className="space-y-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className="flex items-center space-x-4"
          >
            <div className="w-16 text-sm">{color.name}:</div>
            <div className={`text-2xl ${color.class}`}>
              <IconComponent name="star-line" />
            </div>
            <code className="text-xs text-gray-500">{color.class || 'Default'}</code>
          </div>
        ))}
      </div>
    );
  },
};

export const IconsInButtons: StoryObj<typeof IconComponent> = {
  parameters: {
    docs: {
      description: {
        story: `Icons are commonly used within buttons to enhance usability and provide visual cues. When using icon-only buttons, always provide an \`aria-label\` for accessibility. The Button component's \`iconOnly\` prop ensures proper spacing and sizing for icon-only scenarios.`,
      },
    },
  },
  render: () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">
            <IconComponent name="play-large-fill" />
            Play Now
          </Button>

          <Button variant="secondary">
            <IconComponent name="volume-up-fill" />
            Adjust Volume
          </Button>

          <Button variant="destructive">
            <IconComponent name="close-fill" />
            Close
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="linkColor">
            <IconComponent name="star-line" />
            Add to Favorites
          </Button>

          <Button
            variant="tertiary"
            size="lg"
          >
            <IconComponent name="play-list-2-fill" />
            View Playlist
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            iconOnly
            aria-label="Play"
          >
            <IconComponent name="play-large-fill" />
          </Button>

          <Button
            variant="secondary"
            iconOnly
            aria-label="Adjust Volume"
          >
            <IconComponent name="volume-up-fill" />
          </Button>

          <Button
            variant="destructive"
            iconOnly
            aria-label="Close"
          >
            <IconComponent name="close-fill" />
          </Button>

          <Button
            variant="linkColor"
            iconOnly
            aria-label="Add to Favorites"
          >
            <IconComponent name="star-line" />
          </Button>
        </div>
      </div>
    );
  },
};
