import type { StoryObj, Meta } from '@storybook/react-vite';
import {
  AudioWaveformEnvelopeCurves,
  type AudioWaveformEnvelopeCurvesProps,
} from '@/lib/AudioWaveformEnvelopeCurves/AudioWaveformEnvelopeCurves';
import { CollapseCategory } from '@storybook-decorators/CollapseCategory/CollapseCategory';
import { DeferredRender } from '@/.storybook/components/DeferredRender/DeferredRender';
import { track1Peaks } from '@/data/peakOverviewData';

const sampleWaveformData = track1Peaks;

function AudioWaveformEnvelopeCurvesWrapper(props: AudioWaveformEnvelopeCurvesProps) {
  return (
    <DeferredRender height={150}>
      <AudioWaveformEnvelopeCurves
        className="max-h-[150px]"
        {...props}
        data={sampleWaveformData}
      />
    </DeferredRender>
  );
}
AudioWaveformEnvelopeCurvesWrapper.displayName = 'AudioWaveformEnvelopeCurves';

export default {
  title: 'components/AudioWaveformEnvelopeCurves',
  component: AudioWaveformEnvelopeCurves,
  parameters: {
    docs: {
      description: {
        component:
          'A customizable audio waveform visualization component that renders envelope data as curved continuous filled shapes, ideal for creating flowing, blob-like waveform visualizations.',
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
    smoothingFactor: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Smoothness factor for curves (0 = angular, 1 = very smooth)',
      table: {
        type: {
          summary: 'number',
          detail: `Smoothness factor breakdown:
• 0.0-0.2: Angular, sharp transitions (closer to rectangles/lines but still continuous)
• 0.3-0.6: Balanced curves with good data accuracy  
• 0.7-1.0: Very smooth, flowing curves (prioritizes aesthetics over data accuracy)`,
        },
        defaultValue: { summary: '0.5' },
        category: 'Appearance',
      },
    },
    segmentMinWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum width per segment in pixels - controls sampling density',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Appearance',
      },
    },

    // Color
    color: {
      control: 'color',
      description:
        'Color of the curved envelope. For static colors (string), color transitions are supported. For dynamic colors (function), transitions should be handled within the function.',
      table: {
        type: {
          summary: 'string | (() => ColorResult)',
          detail: `type ColorResult = string | {
  type: 'gradient';
  mode?: 'global' | 'local';  // Default: 'global'
  stops: Array<{
    offset: number;  // Value between 0 and 1
    color: string;   // CSS color value
  }>;
}

Note: For curved envelopes, color functions are called without arguments 
since coloring applies to the entire continuous shape, not individual segments.`,
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
} as Meta<typeof AudioWaveformEnvelopeCurves>;

export const Basic: StoryObj<typeof AudioWaveformEnvelopeCurves> = {
  args: {
    color: '#9f9fa9',
    heightScale: 1,
    segmentMinWidth: 1,
    smoothingFactor: 0.5,
    colorTransitionDuration: 500,
    frameRate: 60,
    devicePixelRatio: undefined,
    resolutionMode: 'auto',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Basic curved envelope visualization with default smoothing. Creates a continuous filled waveform with gentle curves.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeCurvesWrapper {...args} />,
};

export const AngularSmoothing: StoryObj<typeof AudioWaveformEnvelopeCurves> = {
  args: {
    color: '#2b7fff',
    smoothingFactor: 0.1,
    segmentMinWidth: 1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Angular smoothing (0.1) creates sharp transitions while maintaining the filled envelope shape. Closer to rectangles/lines but still continuous.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeCurvesWrapper {...args} />,
};

export const VerySmooth: StoryObj<typeof AudioWaveformEnvelopeCurves> = {
  args: {
    color: '#ff6b6b',
    smoothingFactor: 0.9,
    segmentMinWidth: 1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Very smooth curves (0.9) create flowing, blob-like waveforms that prioritize visual aesthetics over data accuracy.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeCurvesWrapper {...args} />,
};

export const MediumSmoothing: StoryObj<typeof AudioWaveformEnvelopeCurves> = {
  args: {
    color: '#4ecdc4',
    smoothingFactor: 0.5,
    segmentMinWidth: 2,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Medium smoothing (0.5) provides a balanced approach between data accuracy and visual flow.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeCurvesWrapper {...args} />,
};

export const ReducedHeightScale: StoryObj<typeof AudioWaveformEnvelopeCurves> = {
  args: {
    color: '#9b59b6',
    heightScale: 0.6,
    smoothingFactor: 0.7,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Reduced height scale (0.6) creates a more compact waveform while maintaining smooth curves.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeCurvesWrapper {...args} />,
};

export const LargerSegmentWidth: StoryObj<typeof AudioWaveformEnvelopeCurves> = {
  args: {
    color: '#e67e22',
    segmentMinWidth: 4,
    smoothingFactor: 0.6,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Larger segment width (4px) reduces sampling density for a more simplified waveform representation.',
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeCurvesWrapper {...args} />,
};

export const SimpleGradient: StoryObj<typeof AudioWaveformEnvelopeCurves> = {
  args: {
    color: () => ({
      type: 'gradient' as const,
      stops: [
        { offset: 0, color: '#667eea' },
        { offset: 1, color: '#764ba2' },
      ],
    }),
    smoothingFactor: 0.6,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Simple vertical gradient applied to the entire curved envelope shape.',
      },
      source: {
        code: `<AudioWaveformEnvelopeCurves
  color={() => ({
    type: 'gradient',
    stops: [
      { offset: 0, color: '#667eea' },
      { offset: 1, color: '#764ba2' },
    ],
  })}
  smoothingFactor={0.6}
/>`,
      },
    },
  },
  render: (args) => <AudioWaveformEnvelopeCurvesWrapper {...args} />,
};
