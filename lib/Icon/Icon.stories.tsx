import type { StoryObj, Meta } from '@storybook/react';
import { Icon } from '@lib/Icon';
import { ReactComponent as StarLineSvg } from '@lib/assets/svgs/star-line.svg';
import { ReactComponent as PlayLargeFillSvg } from '@lib/assets/svgs/play-large-fill.svg';
import { ReactComponent as VolumeUpFillSvg } from '@lib/assets/svgs/volume-up-fill.svg';
import { ReactComponent as CloseFillSvg } from '@lib/assets/svgs/close-fill.svg';
import { ReactComponent as Playlist2FillSvg } from '@lib/assets/svgs/play-list-2-fill.svg';
import { Button } from '@lib/Button';

function CustomSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        strokeWidth="2"
        stroke="currentColor"
      />
      <path
        d="M12 8v8M8 12h8"
        strokeWidth="2"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Define SVG components for the dropdown
const svgComponents = {
  StarLineSvg,
  PlayLargeFillSvg,
  VolumeUpFillSvg,
  CloseFillSvg,
  Playlist2FillSvg,
};

export default {
  title: 'components/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'A polymorphic icon component that renders SVG components with consistent styling and behavior. This component allows for tree-shaking of unused icons.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  argTypes: {
    as: {
      control: {
        type: 'select',
        labels: {
          StarLineSvg: 'StarLine',
          PlayLargeFillSvg: 'PlayLargeFill',
          VolumeUpFillSvg: 'VolumeUpFill',
          CloseFillSvg: 'CloseFill',
          Playlist2FillSvg: 'Playlist2Fill',
        },
      },
      options: Object.keys(svgComponents),
      mapping: svgComponents,
      description: 'The SVG component to render',
    },
  },
  args: {
    as: StarLineSvg,
  },
} as Meta<typeof Icon>;

export const IconSandbox: StoryObj<typeof Icon> = {
  parameters: {
    docs: {
      description: {
        story: 'Interactive sandbox for experimenting with the Icon component.',
      },
    },
  },
};

export const SizingOptions: StoryObj<typeof Icon> = {
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
              <Icon as={StarLineSvg} />
            </div>
            <div className={size.class}>
              <Icon as={PlayLargeFillSvg} />
            </div>
            <div className={size.class}>
              <Icon as={VolumeUpFillSvg} />
            </div>
            <code className="text-xs text-gray-500">{size.class}</code>
          </div>
        ))}
      </div>
    );
  },
};

export const ColoredIcons: StoryObj<typeof Icon> = {
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
              <Icon as={StarLineSvg} />
            </div>
            <code className="text-xs text-gray-500">{color.class || 'Default'}</code>
          </div>
        ))}
      </div>
    );
  },
};

export const IconsInButtons: StoryObj<typeof Icon> = {
  parameters: {
    docs: {
      description: {
        story: `Icons are commonly used within buttons to enhance usability and provide visual cues. When using icon-only buttons, always provide an \`aria-label\` for accessibility. The Button component's \`iconOnly\` prop ensures proper spacing and sizing for icon-only scenarios.`,
      },
      source: {
        type: 'dynamic',
      },
    },
  },
  render: () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">
            <Icon as={PlayLargeFillSvg} />
            Play Now
          </Button>

          <Button variant="secondary">
            <Icon as={VolumeUpFillSvg} />
            Adjust Volume
          </Button>

          <Button variant="destructive">
            <Icon as={CloseFillSvg} />
            Close
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button variant="linkColor">
            <Icon as={StarLineSvg} />
            Add to Favorites
          </Button>

          <Button
            variant="tertiary"
            size="lg"
          >
            <Icon as={Playlist2FillSvg} />
            View Playlist
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Button
            variant="primary"
            iconOnly
            aria-label="Play"
          >
            <Icon as={PlayLargeFillSvg} />
          </Button>

          <Button
            variant="secondary"
            iconOnly
            aria-label="Adjust Volume"
          >
            <Icon as={VolumeUpFillSvg} />
          </Button>

          <Button
            variant="destructive"
            iconOnly
            aria-label="Close"
          >
            <Icon as={CloseFillSvg} />
          </Button>

          <Button
            variant="linkColor"
            iconOnly
            aria-label="Add to Favorites"
          >
            <Icon as={StarLineSvg} />
          </Button>
        </div>
      </div>
    );
  },
};

export const CustomSvgExample: StoryObj<typeof Icon> = {
  parameters: {
    docs: {
      description: {
        story: 'Example of using a custom SVG with the Icon component.',
      },
    },
    source: {
      type: 'dynamic',
    },
  },
  render: () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Icon
            as={CustomSvg}
            className="h-8 w-8 text-purple-500"
          />
          <Icon
            as={CustomSvg}
            className="h-12 w-12 text-green-500"
          />
          <Icon
            as={CustomSvg}
            className="h-16 w-16 text-blue-500"
          />
        </div>
      </div>
    );
  },
};
