import type { StoryObj, Meta } from '@storybook/react-vite';
import {
  AudioWaveformEnvelopeRectangles,
  type AudioWaveformEnvelopeRectanglesProps,
} from '@/lib/AudioWaveformEnvelopeRectangles/AudioWaveformEnvelopeRectangles';
import { CollapseCategory } from '@storybook-decorators/CollapseCategory/CollapseCategory';
import { DeferredRender } from '@/.storybook/components/DeferredRender/DeferredRender';
import { audioData } from '@/data/audio/58730401-c910-4a77-935e-83d71d5d1a52';
import { GRADIENT_MODE } from '@/types/colors';

const sampleWaveformData = audioData.data[2].peaks;

function AudioWaveformEnvelopeRectanglesWrapper(props: AudioWaveformEnvelopeRectanglesProps) {
  return (
    <DeferredRender height={150}>
      <AudioWaveformEnvelopeRectangles
        className="max-h-[150px]"
        {...props}
        data={sampleWaveformData}
      />
    </DeferredRender>
  );
}
AudioWaveformEnvelopeRectanglesWrapper.displayName = 'AudioWaveformEnvelopeRectangles';

export default {
  title: 'components/AudioWaveformEnvelopeRectangles',
  component: AudioWaveformEnvelopeRectangles,
  parameters: {
    docs: {
      description: {
        component:
          'A customizable audio waveform visualization component that renders envelope data as filled rectangular segments, with optional per-segment color, gradients, and responsive sampling.',
      },
      source: {
        type: 'dynamic',
        transform: (code: string) => {
          return code.replace(
            /data=\{[^}]+\}/,
            'data={[/* Array of envelope segments or raw audio data */]}',
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
      description: 'Height of waveform envelope as a proportion of canvas height',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Appearance',
      },
    },
    segmentMinWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum width per segment in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Appearance',
      },
    },
    gapWidthPercent: {
      control: { type: 'range', min: 0, max: 0.2, step: 0.01 },
      description: 'Gap width as a percentage of the display width',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.1' },
        category: 'Appearance',
      },
    },
    gapMinWidth: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Minimum gap width in pixels',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Appearance',
      },
    },
    gapMaxWidth: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: 'Maximum gap width in pixels',
      table: {
        type: { summary: 'number' },
        category: 'Appearance',
      },
    },

    // Color
    color: {
      control: 'color',
      description: 'Color of the envelope segments (used if function is not provided)',
      table: {
        type: {
          summary: 'string | ((segmentInfo: EnvelopeSegmentInfo) => ColorResult)',
          detail: `type EnvelopeSegmentInfo = {
  position: number;        // Position in the waveform (0-1)
  min: number;            // Minimum value of the envelope segment
  max: number;            // Maximum value of the envelope segment
  index: number;          // Index in the segments array
  widthPercentage: number; // Width of this segment as a percentage of total width (0-1)
  widthPixels: number;    // Width of this segment in pixels
  amplitudeRange: number; // Amplitude range (Math.abs(max - min))
  heightPixels: number;   // Actual rendered height in pixels
}

type ColorResult = string | {
  type: 'gradient';
  mode?: 'global' | 'local';  // Default: 'global'
  stops: Array<{
    offset: number;  // Value between 0 and 1
    color: string;   // CSS color value
  }>;
}`,
        },
        defaultValue: { summary: '#9f9fa9' },
        category: 'Appearance',
      },
    },

    // Advanced
    data: {
      control: false,
      description: 'Audio data from the Web Audio API or pre-processed envelope segments',
      table: {
        type: { summary: 'AudioData' },
        category: 'Advanced',
      },
    },
    interpolationFn: {
      control: false,
      description: 'Function to interpolate values when upsampling with raw audio data',
      table: {
        type: { summary: 'RawAudioInterpolationFn' },
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
} as Meta<typeof AudioWaveformEnvelopeRectangles>;

export const Basic: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: '#9f9fa9',
    heightScale: 0.8,
    gapWidthPercent: 0,
    segmentMinWidth: 1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Basic envelope rectangles visualization with no gaps between segments. Creates a continuous filled waveform.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const CustomColors: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: '#03C988',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Envelope rectangles with custom color scheme and no gaps.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const SmallGaps: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: '#2b7fff',
    gapWidthPercent: 0.1,
    gapMinWidth: 1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Envelope rectangles with small gaps (0.1% of display width) between segments.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const MediumGaps: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: '#2b7fff',
    gapWidthPercent: 0.35,
    gapMinWidth: 1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Envelope rectangles with medium gaps (0.35% of display width) between segments.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const LargeGaps: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: '#2b7fff',
    gapWidthPercent: 0.75,
    gapMinWidth: 1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Envelope rectangles with large gaps (0.75% of display width) between segments.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const DynamicColors: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: ({ amplitudeRange }) => {
      if (amplitudeRange > 0.9) return '#ff3300'; // High dynamic range
      if (amplitudeRange > 0.5) return '#ff9900'; // Medium dynamic range
      return '#cccccc'; // Low dynamic range
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Envelope rectangles with dynamic colors based on amplitude range values.',
      },
      source: {
        code: `<AudioWaveformEnvelopeRectangles
  color={({ amplitudeRange }) => {
    if (amplitudeRange > 0.9) return '#ff3300'; // High dynamic range
    if (amplitudeRange > 0.5) return '#ff9900'; // Medium dynamic range
    return '#cccccc'; // Low dynamic range
  }}
/>`,
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const GradientFill: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: () => ({
      type: 'gradient' as const,
      mode: GRADIENT_MODE.GLOBAL,
      stops: [
        { offset: 0, color: '#03C988' },
        { offset: 0.95, color: '#026442' },
      ],
    }),
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Global gradient mode with continuous segments. All segments sample from the same canvas-height gradient, creating a unified appearance with smooth color transitions.',
      },
      source: {
        code: `<AudioWaveformEnvelopeRectangles
  color={() => ({
    type: 'gradient',
    mode: 'global',
    stops: [
      { offset: 0, color: '#03C988' },
      { offset: 0.95, color: '#026442' },
    ],
  })}
/>`,
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const GlobalGradientWithGaps: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: () => ({
      type: 'gradient' as const,
      mode: GRADIENT_MODE.GLOBAL,
      stops: [
        { offset: 0, color: '#ff8c42' },
        { offset: 1, color: '#d45500' },
      ],
    }),
    gapWidthPercent: 0.15,
    gapMinWidth: 1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Global gradient mode with segmented bars. Uses the same canvas-height gradient approach but with gaps between segments, maintaining visual cohesion while showing distinct bars.',
      },
      source: {
        code: `<AudioWaveformEnvelopeRectangles
  color={() => ({
    type: 'gradient',
    mode: 'global',
    stops: [
      { offset: 0, color: '#ff8c42' },
      { offset: 1, color: '#d45500' },
    ],
  })}
  gapWidthPercent={0.15}
  gapMinWidth={1}
/>`,
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const LocalGradientIndividualBars: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: ({ amplitudeRange }) => ({
      type: 'gradient' as const,
      mode: GRADIENT_MODE.LOCAL,
      stops: [
        { offset: 0, color: amplitudeRange > 0.7 ? '#ff6b6b' : '#4ecdc4' },
        { offset: 1, color: amplitudeRange > 0.7 ? '#c92a2a' : '#26a69a' },
      ],
    }),
    gapWidthPercent: 0.2,
    gapMinWidth: 1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Local gradient mode where each segment gets its own gradient from top to bottom. High-amplitude segments get red gradient, low-amplitude get teal. Useful for creating distinct visual effects per segment.',
      },
      source: {
        code: `<AudioWaveformEnvelopeRectangles
  color={({ amplitudeRange }) => ({
    type: 'gradient',
    mode: 'local',
    stops: [
      { offset: 0, color: amplitudeRange > 0.7 ? '#ff6b6b' : '#4ecdc4' },
      { offset: 1, color: amplitudeRange > 0.7 ? '#c92a2a' : '#26a69a' },
    ],
  })}
  gapWidthPercent={0.2}
  gapMinWidth={1}
/>`,
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const MinWidth1px: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: '#2b7fff',
    segmentMinWidth: 1,
    gapWidthPercent: 0.05,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'High-resolution waveform with minimum 1px segment width. Provides maximum detail but may appear dense on wide displays.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const MinWidth3px: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: '#2b7fff',
    segmentMinWidth: 3,
    gapWidthPercent: 0.1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Balanced waveform with minimum 3px segment width. Good balance between detail and visual clarity.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const MinWidth8px: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: '#2b7fff',
    segmentMinWidth: 8,
    gapWidthPercent: 0.15,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Bold waveform with minimum 8px segment width. Creates chunky, bold visualization suitable for large displays or when fewer segments are preferred.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};

export const MinWidthComparison: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: ({ index }) => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
      return colors[index % colors.length] || '#9f9fa9';
    },
    segmentMinWidth: 5,
    gapWidthPercent: 0.1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Demonstration of different segment minimum widths with colors cycling through segments to show individual segments clearly.',
      },
      source: {
        code: `<AudioWaveformEnvelopeRectangles
  color={({ index }) => {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    return colors[index % colors.length] || '#9f9fa9';
  }}
  segmentMinWidth={5}
  gapWidthPercent={0.1}
/>`,
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeRectanglesWrapper {...args} />,
};
