import type { StoryObj, Meta } from '@storybook/react-vite';
import {
  AudioWaveformEnvelopeRectangles,
  type AudioWaveformEnvelopeRectanglesProps,
} from '@/lib/AudioWaveformEnvelopeRectangles/AudioWaveformEnvelopeRectangles';
import { CollapseCategory } from '@storybook-decorators/CollapseCategory/CollapseCategory';
import { DeferredRender } from '@/.storybook/components/DeferredRender/DeferredRender';
import { track1Peaks } from '@/data/peakOverviewData';
import { GRADIENT_MODE } from '@/types/colors';

const sampleWaveformData = track1Peaks;

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
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
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
      description:
        'Color of the envelope segments. For static colors (string), color transitions are supported. For dynamic colors (function), transitions should be handled within the function.',
      table: {
        type: {
          summary: 'string | ((segmentInfo: EnvelopeSegmentInfo) => ColorResult)',
          detail: `type EnvelopeSegmentInfo = {
  position: number;        // Position in the waveform (0-1)
  min: number;            // Minimum value of the envelope segment (-1 to 1)
  max: number;            // Maximum value of the envelope segment (-1 to 1)
  index: number;          // Index in the segments array
  widthPercentage: number; // Width of this segment as a percentage of total width (0-1)
  widthPixels: number;    // Width of this segment in pixels
  amplitudeRange: number; // Amplitude range of envelope segment (0 to 2)
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
        category: 'Color',
      },
    },

    // Color Transitions
    colorTransitionDuration: {
      control: { type: 'range', min: 100, max: 10000, step: 100 },
      description:
        'Duration in milliseconds for color transitions. Only applies when color is a string, not a function.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '500' },
        category: 'Color',
      },
      if: { arg: 'color', satisfies: (color: unknown) => typeof color === 'string' },
    },

    // Advanced
    data: {
      control: false,
      description: 'Audio data from the Web Audio API or pre-processed envelope segments',
      table: {
        type: {
          summary: 'AudioData',
          detail: `type AudioData = number[] | Float32Array | EnvelopeSegment[];

type EnvelopeSegment = {
  min: number;  // Minimum amplitude value in the segment (-1 to 1)
  max: number;  // Maximum amplitude value in the segment (-1 to 1)
};

// Raw audio data (number[] | Float32Array) should be in the range from -1 to 1`,
        },
      },
      type: { name: 'other', value: 'data', required: true },
    },
    interpolationFn: {
      control: false,
      description: 'Function to interpolate values when upsampling with raw audio data',
      table: {
        type: {
          summary: 'RawAudioInterpolationFn',
          detail: `type RawAudioInterpolationFn = (
  data: number[] | Float32Array,
  exactIndex: number,
  options?: EnvelopeSampleOptions,
) => EnvelopeSegment;

type EnvelopeSampleOptions = {
  numSamples?: number;      // Number of samples to use for interpolation window (default: 4)
  oversampleRate?: number;  // Number of interpolated points per sample interval (default: 4)
};

type EnvelopeSegment = {
  min: number;  // Minimum amplitude value (-1 to 1)
  max: number;  // Maximum amplitude value (-1 to 1)
};`,
        },
        category: 'Advanced',
      },
    },
    drawOnCanvasReady: {
      control: false,
      description: 'Whether to draw the waveform when the canvas ref is set',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Advanced',
      },
    },
    frameRate: {
      control: { type: 'range', min: 15, max: 120, step: 5 },
      description:
        'Frame rate for color transition animations. Only applies when color is a string.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '60' },
        category: 'Advanced',
      },
      if: { arg: 'color', satisfies: (color: unknown) => typeof color === 'string' },
    },
    resolutionMode: {
      control: { type: 'radio' },
      options: ['auto', 'high', 'low'],
      description:
        'Canvas resolution strategy. "auto" uses native display resolution, "high" supersamples fractional DPR for crisp rendering, "low" downsamples to 1x for maximum performance.',
      table: {
        type: { summary: "'auto' | 'high' | 'low'" },
        defaultValue: { summary: 'high' },
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
} as Meta<typeof AudioWaveformEnvelopeRectangles>;

export const Basic: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: '#9f9fa9',
    heightScale: 1,
    gapWidthPercent: 0,
    gapMinWidth: 0,
    gapMaxWidth: undefined,
    segmentMinWidth: 1,
    colorTransitionDuration: 500,
    frameRate: 60,
    devicePixelRatio: undefined,
    resolutionMode: 'high',
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
      if (amplitudeRange > 1.5) return '#ff3300'; // High dynamic range
      if (amplitudeRange > 1) return '#ff9900'; // Medium dynamic range
      if (amplitudeRange > 0.5) return '#ffcc00'; // Low dynamic range
      return '#cccccc'; // Very low dynamic range
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
      if (amplitudeRange > 1.5) return '#ff3300'; // High dynamic range
      if (amplitudeRange > 1) return '#ff9900'; // Medium dynamic range
      if (amplitudeRange > 0.5) return '#ffcc00'; // Low dynamic range
      return '#cccccc'; // Very low dynamic range
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

export const LocalGradientIndividualBars: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
  args: {
    color: ({ amplitudeRange }) => ({
      type: 'gradient' as const,
      mode: GRADIENT_MODE.LOCAL,
      stops: [
        { offset: 0, color: amplitudeRange > 1.2 ? '#ff6b6b' : '#4ecdc4' },
        { offset: 1, color: amplitudeRange > 1.2 ? '#c92a2a' : '#26a69a' },
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
        { offset: 0, color: amplitudeRange > 1.2 ? '#ff6b6b' : '#4ecdc4' },
        { offset: 1, color: amplitudeRange > 1.2 ? '#c92a2a' : '#26a69a' },
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

export const WithSegmentMinWidth3Pixels: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
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

export const WithSegmentMinWidth8Pixels: StoryObj<typeof AudioWaveformEnvelopeRectangles> = {
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
