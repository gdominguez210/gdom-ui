import type { StoryObj, Meta } from '@storybook/react-vite';
import {
  AudioWaveformCurves,
  type AudioWaveformCurvesProps,
} from '@/lib/AudioWaveformCurves/AudioWaveformCurves';
import { CollapseCategory } from '@storybook-decorators/CollapseCategory/CollapseCategory';
import { DeferredRender } from '@/.storybook/components/DeferredRender/DeferredRender';
import trackOneJson from '@/data/audio/58730401-c910-4a77-935e-83d71d5d1a52/curveData.json';
import type { ProcessedAudioEnvelopeData } from '@/types/audio';

const sampleWaveformData = (trackOneJson as ProcessedAudioEnvelopeData).data[0]!.peaks;

function AudioWaveformCurvesWrapper(props: AudioWaveformCurvesProps) {
  return (
    <DeferredRender height={150}>
      <AudioWaveformCurves
        className="max-h-[150px]"
        {...props}
        data={sampleWaveformData}
      />
    </DeferredRender>
  );
}
AudioWaveformCurvesWrapper.displayName = 'AudioWaveformCurves';

export default {
  title: 'components/AudioWaveformCurves',
  component: AudioWaveformCurves,
  parameters: {
    docs: {
      description: {
        component:
          'A customizable audio waveform visualization component that renders audio data as smooth continuous curves with configurable smoothing and stroke styling.',
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
      description: 'Height of waveform curve as a proportion of canvas height',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Appearance',
      },
    },
    segmentMinWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum width per segment in pixels (controls data sampling density)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Appearance',
        detail:
          'Controls how densely the audio data is sampled for curve generation. Lower values create more data points and smoother curves but require more processing. Higher values create fewer data points for better performance but may lose detail in complex audio.',
      },
    },
    lineWidth: {
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
      description: 'Width of the curve stroke in pixels (visual styling only)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
        category: 'Appearance',
        detail:
          'Controls the visual thickness of the drawn curve line. This is purely a styling property and does not affect data sampling or curve smoothness. Independent of segmentMinWidth.',
      },
    },
    lineCap: {
      control: { type: 'select' },
      options: ['butt', 'round', 'square'],
      description: 'Line cap style for the curve endpoints',
      table: {
        type: { summary: 'CanvasLineCap' },
        defaultValue: { summary: 'butt' },
        category: 'Appearance',
      },
    },
    smoothingFactor: {
      control: { type: 'range', min: 0, max: 1, step: 0.1 },
      description: 'Smoothness factor for curves (0 = angular, 1 = very smooth)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.5' },
        category: 'Appearance',
        detail:
          'Controls the curvature of the waveform line. 0 creates sharp angular connections between points, while 1 creates very smooth curved transitions. Values around 0.5 provide a good balance between detail preservation and visual smoothness.',
      },
    },

    // Color
    color: {
      control: 'color',
      description:
        'Color of the curve. For static colors (string), color transitions are supported. For dynamic colors (function), transitions should be handled within the function.',
      table: {
        type: {
          summary: 'string | (() => ColorResult)',
          detail: `type ColorResult = string | {
  type: 'gradient';
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

// Raw audio data (number[] | Float32Array) should be in the range from -1 to 1
// For envelope segments, the min value is used for the curve path`,
        },
      },
      type: { name: 'other', value: 'data', required: true },
    },
    interpolationFn: {
      control: false,
      description: 'Function to interpolate values when upsampling with raw audio data',
      table: {
        type: {
          summary: 'CurveInterpolationFn',
          detail: `type CurveInterpolationFn = (
  data: number[] | Float32Array,
  exactIndex: number,
) => number;

// Returns a single interpolated value at the exact position`,
        },
        category: 'Advanced',
      },
    },
    transformFn: {
      control: false,
      description: 'Function to transform envelope segments to single curve values',
      table: {
        type: {
          summary: 'SampleWindowTransformFn<number>',
          detail: `type SampleWindowTransformFn<number> = (envelope: EnvelopeSegment) => number;

// Common transforms:
// - peak: Math.max(Math.abs(min), Math.abs(max)) - Professional DAW standard
// - center: (min + max) / 2 - Midpoint of envelope
// - rms: Math.sqrt((min² + max²) / 2) - Energy representation
// - min/max: Extract min or max value directly

// Only used for true envelope data (min !== max)`,
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
} as Meta<typeof AudioWaveformCurves>;

export const Basic: StoryObj<typeof AudioWaveformCurves> = {
  args: {
    color: '#9f9fa9',
    heightScale: 1,
    segmentMinWidth: 1,
    lineWidth: 1,
    smoothingFactor: 0.5,
    lineCap: 'butt',
    colorTransitionDuration: 500,
    frameRate: 60,
    devicePixelRatio: undefined,
    resolutionMode: 'auto',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Basic smooth curve visualization with default smoothing factor (0.5).',
      },
    },
  },
  render: (args) => <AudioWaveformCurvesWrapper {...args} />,
};

export const CustomColor: StoryObj<typeof AudioWaveformCurves> = {
  args: {
    color: '#03C988',
    lineWidth: 2.5,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Curve with custom color and slightly thicker line width.',
      },
    },
  },
  render: (args) => <AudioWaveformCurvesWrapper {...args} />,
};

export const ThickLine: StoryObj<typeof AudioWaveformCurves> = {
  args: {
    color: '#2b7fff',
    lineWidth: 4,
    smoothingFactor: 0.3,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Bold curve with 4px line width and moderate smoothing.',
      },
    },
  },
  render: (args) => <AudioWaveformCurvesWrapper {...args} />,
};

export const AngularNoSmoothing: StoryObj<typeof AudioWaveformCurves> = {
  args: {
    color: '#ff6b6b',
    smoothingFactor: 0,
    lineWidth: 2,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Angular curve with no smoothing (smoothingFactor = 0). Creates sharp point-to-point connections.',
      },
    },
  },
  render: (args) => <AudioWaveformCurvesWrapper {...args} />,
};

export const ModerateSmoothing: StoryObj<typeof AudioWaveformCurves> = {
  args: {
    color: '#ff9500',
    smoothingFactor: 0.3,
    lineWidth: 2,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Moderate smoothing (0.3) preserves more detail while still providing curve smoothness.',
      },
    },
  },
  render: (args) => <AudioWaveformCurvesWrapper {...args} />,
};

export const HighSmoothing: StoryObj<typeof AudioWaveformCurves> = {
  args: {
    color: '#8b5cf6',
    smoothingFactor: 0.8,
    lineWidth: 2,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'High smoothing (0.8) creates very smooth, flowing curves with minimal sharp transitions.',
      },
    },
  },
  render: (args) => <AudioWaveformCurvesWrapper {...args} />,
};

export const MaximumSmoothing: StoryObj<typeof AudioWaveformCurves> = {
  args: {
    color: '#ec4899',
    smoothingFactor: 1,
    lineWidth: 3,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Maximum smoothing (1.0) creates the smoothest possible curves, ideal for artistic or ambient visualizations.',
      },
    },
  },
  render: (args) => <AudioWaveformCurvesWrapper {...args} />,
};

export const GradientStroke: StoryObj<typeof AudioWaveformCurves> = {
  args: {
    color: () => ({
      type: 'gradient' as const,
      stops: [
        { offset: 0, color: '#ff6b6b' },
        { offset: 0.5, color: '#4ecdc4' },
        { offset: 1, color: '#45b7d1' },
      ],
    }),
    lineWidth: 3,
    smoothingFactor: 0.6,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Gradient stroke from red to teal to blue, creating a colorful flowing curve.',
      },
      source: {
        code: `<AudioWaveformCurves
  color={() => ({
    type: 'gradient',
    stops: [
      { offset: 0, color: '#ff6b6b' },
      { offset: 0.5, color: '#4ecdc4' },
      { offset: 1, color: '#45b7d1' },
    ],
  })}
  lineWidth={3}
  smoothingFactor={0.6}
/>`,
      },
    },
  },
  render: (args) => <AudioWaveformCurvesWrapper {...args} />,
};

export const ThinDetailedLine: StoryObj<typeof AudioWaveformCurves> = {
  args: {
    color: '#374151',
    lineWidth: 1,
    smoothingFactor: 0.2,
    segmentMinWidth: 1,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Thin detailed line (1px) with minimal smoothing, good for detailed waveform analysis.',
      },
    },
  },
  render: (args) => <AudioWaveformCurvesWrapper {...args} />,
};

export const WideSegments: StoryObj<typeof AudioWaveformCurves> = {
  args: {
    color: '#059669',
    segmentMinWidth: 4,
    lineWidth: 3,
    smoothingFactor: 0.4,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Wider segments (4px minimum) create a more simplified, bold curve representation.',
      },
    },
  },
  render: (args) => <AudioWaveformCurvesWrapper {...args} />,
};
