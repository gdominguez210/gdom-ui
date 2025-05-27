import type { StoryObj, Meta } from '@storybook/react-vite';
import { AudioWaveform, type AudioWaveformProps } from '@/lib/AudioWaveform/AudioWaveform';
import { waveformData } from '@/data/waveformData';
import { CollapseCategory } from '@storybook-decorators/CollapseCategory/CollapseCategory';
import { DeferredRender } from '@/.storybook/components/DeferredRender/DeferredRender';

const sampleWaveformData = waveformData['58730401-c910-4a77-935e-83d71d5d1a52'] || [];

function AudioWaveformWrapper(props: AudioWaveformProps) {
  return (
    <DeferredRender height={150}>
      <AudioWaveform
        className="max-h-[150px]"
        {...props}
      />
    </DeferredRender>
  );
}
AudioWaveformWrapper.displayName = 'AudioWaveform';

export default {
  title: 'components/AudioWaveform',
  component: AudioWaveform,
  parameters: {
    docs: {
      description: {
        component:
          'A customizable audio waveform visualization component that renders amplitude data as vertical bars.',
      },
      source: {
        type: 'dynamic',
        transform: (code: string) => {
          // Replace array literal with placeholder
          return code.replace(
            /waveformData=\{[^}]+\}/,
            'waveformData={[/* Array of amplitude values */]}',
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
      description: 'Height of waveform as a proportion of canvas height',
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
    barColor: {
      control: 'color',
      description: 'Color of the waveform bars',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#9f9fa9' },
        category: 'Color',
      },
    },
    getBarColor: {
      control: false,
      description: 'Function to determine bar color based on state',
      table: {
        type: {
          summary: '(barInfo: WaveformBarInfo) => string | WaveformBarColorResult',
          detail: `type WaveformBarInfo = {
  position: number;  // Position in the waveform (0-1)
  value: number;     // Amplitude value (0-1)
  index: number;     // Index in the waveform data array
  width: number;     // Width of this specific bar as a percentage of total width (0-1)
}

type WaveformBarColorResult = string | {
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
    waveformData: {
      control: false,
      description: 'Array of normalized amplitude values between 0-1',
      table: {
        type: { summary: 'number[]' },
        category: 'Advanced',
      },
    },
    drawOnCanvasReady: {
      control: 'boolean',
      description: 'Whether to draw the waveform when the canvas ref is set',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Advanced',
      },
    },

    className: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof AudioWaveform>;

export const Basic: StoryObj<typeof AudioWaveform> = {
  args: {
    barColor: '#9f9fa9',
    barGapRatio: 0.0035,
    heightScale: 0.8,
    minBarGapPercent: 0.001,
    minBarWidth: 1,
    waveformData: sampleWaveformData,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Basic waveform visualization with default settings. Uses a blue color scheme and balanced bar width/spacing.',
      },
    },
  },
  render: (args) => <AudioWaveformWrapper {...args} />,
};

export const CustomColors: StoryObj<typeof AudioWaveform> = {
  args: {
    barColor: '#03C988',
    barGapRatio: 0.0035,
    heightScale: 0.8,
    minBarWidth: 1,
    waveformData: sampleWaveformData,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Waveform with custom color scheme.',
      },
    },
  },
  render: (args) => <AudioWaveformWrapper {...args} />,
};

export const DynamicColors: StoryObj<typeof AudioWaveform> = {
  args: {
    barGapRatio: 0.0035,
    getBarColor: (barInfo) => {
      if (barInfo.value > 0.7) return '#ff3300'; // Loud sections
      if (barInfo.value > 0.4) return '#ff9900'; // Medium sections
      return '#cccccc'; // Quiet sections
    },
    heightScale: 0.8,
    minBarWidth: 1,
    waveformData: sampleWaveformData,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Waveform with dynamic colors based on amplitude values.',
      },
    },
  },
  render: (args) => <AudioWaveformWrapper {...args} />,
};

export const HighResolution: StoryObj<typeof AudioWaveform> = {
  args: {
    barColor: '#9f9fa9',
    barGapRatio: 0.001,
    heightScale: 0.8,
    minBarWidth: 1,
    waveformData: sampleWaveformData,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'High-resolution waveform with minimal gaps between bars.',
      },
    },
  },
  render: (args) => <AudioWaveformWrapper {...args} />,
};

export const LowResolution: StoryObj<typeof AudioWaveform> = {
  args: {
    barColor: '#9f9fa9',
    barGapRatio: 0.015,
    heightScale: 0.8,
    minBarWidth: 3,
    waveformData: sampleWaveformData,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Low-resolution waveform with wider bars and larger gaps.',
      },
    },
  },
  render: (args) => <AudioWaveformWrapper {...args} />,
};
