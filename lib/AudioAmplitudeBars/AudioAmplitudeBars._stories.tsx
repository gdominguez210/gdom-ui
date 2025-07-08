import type { StoryObj, Meta } from '@storybook/react-vite';
import {
  AudioAmplitudeBars,
  type AudioAmplitudeBarsProps,
} from '@/lib/AudioAmplitudeBars/AudioAmplitudeBars';
import { amplitudeData } from '@/data/amplitudeData';
import { CollapseCategory } from '@storybook-decorators/CollapseCategory/CollapseCategory';
import { DeferredRender } from '@/.storybook/components/DeferredRender/DeferredRender';

const sampleAmplitudeData = amplitudeData['58730401-c910-4a77-935e-83d71d5d1a52'] || [];

function AudioAmplitudeBarsWrapper(props: AudioAmplitudeBarsProps) {
  return (
    <DeferredRender height={150}>
      <AudioAmplitudeBars
        className="max-h-[150px]"
        {...props}
      />
    </DeferredRender>
  );
}
AudioAmplitudeBarsWrapper.displayName = 'AudioAmplitudeBars';

export default {
  title: 'components/AudioAmplitudeBars',
  component: AudioAmplitudeBars,
  parameters: {
    docs: {
      description: {
        component:
          'A customizable audio amplitude visualization component that renders amplitude data as vertical bars.',
      },
      source: {
        type: 'dynamic',
        transform: (code: string) => {
          // Replace array literal with placeholder
          return code.replace(
            /amplitudeData=\{[^}]+\}/,
            'amplitudeData={[/* Array of amplitude values (normalized between 0-1) */]}',
          );
        },
      },
      controls: {
        sort: 'alpha',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  decorators: [CollapseCategory('Advanced')],
  argTypes: {
    // Appearance
    heightScale: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
      description: 'Height of amplitude bars as a proportion of canvas height',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Appearance',
      },
    },
    barGapRatio: {
      control: { type: 'range', min: 0, max: 0.02, step: 0.001 },
      description: 'Gap between bars as a proportion of canvas width',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.0035' },
        category: 'Appearance',
      },
    },
    minBarWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum width for each bar in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Appearance',
      },
    },
    minBarGapPercent: {
      control: { type: 'range', min: 0, max: 0.02, step: 0.001 },
      description: 'Minimum gap between bars as a percentage of canvas width',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.001' },
        category: 'Appearance',
      },
    },

    // Color
    color: {
      control: 'color',
      description: 'Color of the amplitude bars',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#9f9fa9' },
        category: 'Color',
      },
    },
    getColor: {
      control: false,
      description: 'Function to determine bar color based on state',
      table: {
        type: {
          summary: '(barInfo: AmplitudeBarInfo) => string | ColorResult',
          detail: `type AmplitudeBarInfo = {
  position: number;  // Position in the waveform (0-1)
  value: number;     // Amplitude value (0-1)
  index: number;     // Index in the waveform data array
  width: number;     // Width of this specific bar as a percentage of total width (0-1)
}

type ColorResult = string | {
  type: 'gradient';
  stops: Array<{
    offset: number;  // Value between 0 and 1
    color: string;   // CSS color value
  }>;
}`,
        },
        category: 'Color',
      },
    },

    // Advanced
    amplitudeData: {
      control: false,
      description: 'Array of normalized amplitude values between 0-1',
      table: {
        type: { summary: 'number[]' },
        category: 'Advanced',
      },
    },
    drawOnCanvasReady: {
      control: 'boolean',
      description: 'Whether to draw the amplitude bars when the canvas ref is set',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Advanced',
      },
    },
    resolutionMode: {
      control: { type: 'radio' },
      options: ['auto', 'high', 'low'],
      description:
        'Canvas resolution strategy. "auto" uses native display resolution, "high" supersamples fractional DPR for crisp rendering, "low" downsamples to 1x for maximum performance.',
      table: {
        type: { summary: "'auto' | 'high' | 'low'" },
        defaultValue: { summary: 'auto' },
        category: 'Advanced',
      },
    },
    devicePixelRatio: {
      control: { type: 'range', min: 1, max: 4, step: 0.25 },
      description:
        'Manual device pixel ratio override (takes precedence over resolutionMode). Useful for power users who need precise control.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'window.devicePixelRatio' },
        category: 'Advanced',
      },
    },

    className: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof AudioAmplitudeBars>;

export const Basic: StoryObj<typeof AudioAmplitudeBars> = {
  args: {
    color: '#9f9fa9',
    barGapRatio: 0.0035,
    heightScale: 0.8,
    minBarGapPercent: 0.001,
    minBarWidth: 1,
    amplitudeData: sampleAmplitudeData,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Basic amplitude bars visualization with default settings. Uses a blue color scheme and balanced bar width/spacing.',
      },
    },
  },
  render: (args) => <AudioAmplitudeBarsWrapper {...args} />,
};

export const CustomColors: StoryObj<typeof AudioAmplitudeBars> = {
  args: {
    color: '#03C988',
    barGapRatio: 0.0035,
    heightScale: 0.8,
    minBarWidth: 1,
    amplitudeData: sampleAmplitudeData,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Amplitude bars with custom color scheme.',
      },
    },
  },
  render: (args) => <AudioAmplitudeBarsWrapper {...args} />,
};

export const DynamicColors: StoryObj<typeof AudioAmplitudeBars> = {
  args: {
    barGapRatio: 0.0035,
    getColor: (barInfo) => {
      if (barInfo.value > 0.7) return '#ff3300'; // Loud sections
      if (barInfo.value > 0.4) return '#ff9900'; // Medium sections
      return '#cccccc'; // Quiet sections
    },
    heightScale: 0.8,
    minBarWidth: 1,
    amplitudeData: sampleAmplitudeData,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Amplitude bars with dynamic colors based on amplitude values.',
      },
    },
  },
  render: (args) => <AudioAmplitudeBarsWrapper {...args} />,
};

export const HighResolution: StoryObj<typeof AudioAmplitudeBars> = {
  args: {
    color: '#9f9fa9',
    barGapRatio: 0.001,
    heightScale: 0.8,
    minBarWidth: 1,
    amplitudeData: sampleAmplitudeData,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'High-resolution amplitude bars with minimal gaps between bars.',
      },
    },
  },
  render: (args) => <AudioAmplitudeBarsWrapper {...args} />,
};

export const LowResolution: StoryObj<typeof AudioAmplitudeBars> = {
  args: {
    color: '#9f9fa9',
    barGapRatio: 0.015,
    heightScale: 0.8,
    minBarWidth: 3,
    amplitudeData: sampleAmplitudeData,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Low-resolution amplitude bars with wider bars and larger gaps.',
      },
    },
  },
  render: (args) => <AudioAmplitudeBarsWrapper {...args} />,
};
