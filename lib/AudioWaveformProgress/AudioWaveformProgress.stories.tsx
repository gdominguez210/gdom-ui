import type { StoryObj, Meta } from '@storybook/react-vite';
import { AudioWaveformProgress } from '@/lib/AudioWaveformProgress/AudioWaveformProgress';
import { overViewData } from '@/data/peakOverviewData';
import { trackData } from '@/data/trackData';
import { AudioPlayer } from '@/lib/AudioPlayer/AudioPlayer';
import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import { useAudioPlayerContextPlayback } from '@/lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';
import { useAudioPlayerContextRefs } from '@/lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerContextTime } from '@/lib/AudioPlayerContextTimeProvider';
import { DeferredRender } from '@storybook-components/DeferredRender/DeferredRender';
import { CollapseCategory } from '@storybook-decorators/CollapseCategory/CollapseCategory';
import { type MouseEventHandler, type RefObject, useCallback } from 'react';
import { type AudioWaveformProgressProps } from '@/lib/AudioWaveformProgress/AudioWaveformProgress';

const AUDIO_WAVEFORM_PROGRESS_COLOR_MODES = {
  STATIC: 'static',
  GRADIENT: 'gradient',
} as const;

export type AudioPlayerWaveformProgressProps = Omit<
  AudioWaveformProgressProps,
  'audioRef' | 'duration' | 'onProgressChange' | 'isActive' | 'data'
>;

function AudioPlayerWaveformProgressWithData(props: AudioPlayerWaveformProgressProps) {
  const { onClick, ...restProps } = props;
  const { currentTrack } = useAudioPlayerContextTrack();
  const { audioRef } = useAudioPlayerContextRefs();
  const { duration, seek, setPreviewTime } = useAudioPlayerContextTime();
  const { isPlaying, play } = useAudioPlayerContextPlayback();

  const currentTrackData = overViewData[currentTrack?.id ?? ''] || [];

  const handleClick: MouseEventHandler<HTMLCanvasElement> = useCallback(
    (event) => {
      if (!isPlaying) {
        play();
      }
      onClick?.(event);
    },
    [onClick, isPlaying, play],
  );

  return (
    <AudioWaveformProgress
      isActive={isPlaying}
      audioRef={audioRef as RefObject<HTMLAudioElement>}
      duration={duration}
      onProgressChange={seek}
      onPreviewTimeChange={setPreviewTime}
      data={currentTrackData}
      onClick={handleClick}
      {...restProps}
    />
  );
}

AudioPlayerWaveformProgressWithData.displayName = 'AudioWaveformProgress';

function AudioPlayerWrapper(props: AudioPlayerWaveformProgressProps) {
  return (
    <DeferredRender height={300}>
      <AudioPlayer.Provider tracks={trackData}>
        <AudioPlayer.Container>
          <AudioPlayerWaveformProgressWithData
            className="h-[150px]"
            {...props}
          />
          <div className="justify-space-between flex grow gap-4">
            <AudioPlayer.Info className="basis-1/3">
              <AudioPlayer.Image />
              <div className="py-2">
                <AudioPlayer.Title />
                <AudioPlayer.Author />
                <AudioPlayer.Time />
              </div>
            </AudioPlayer.Info>
            <AudioPlayer.Controls className="basis-1/3">
              <AudioPlayer.ControlAudio />
              <AudioPlayer.ControlLoop />
              <AudioPlayer.ControlPrevious />
              <AudioPlayer.ControlPlay />
              <AudioPlayer.ControlNext />
              <AudioPlayer.ControlShuffle />
            </AudioPlayer.Controls>
            <AudioPlayer.Volume className="ml-auto pr-4">
              <AudioPlayer.VolumeButton />
              <AudioPlayer.VolumeSlider />
            </AudioPlayer.Volume>
          </div>
        </AudioPlayer.Container>
      </AudioPlayer.Provider>
    </DeferredRender>
  );
}

AudioPlayerWrapper.displayName = 'AudioWaveformProgress';

export default {
  title: 'components/AudioWaveformProgress',
  component: AudioWaveformProgress,
  parameters: {
    docs: {
      description: {
        component:
          'An interactive audio waveform progress visualization component that displays envelope segments with playback progress and allows seeking.',
      },
      controls: {
        sort: 'alpha',
        expanded: {
          Appearance: true,
          Color: true,
          Advanced: false,
        },
      },
      canvas: {
        sourceState: 'shown',
      },
    },
    layout: 'padded',
  },
  decorators: [CollapseCategory('Advanced')],
  args: {
    gapWidthPercent: 0.0035,
    gapMinWidth: 0,
    gapMaxWidth: undefined,
    segmentMinWidth: 1,
    heightScale: 1,
    color: '#9f9fa9',
    progressColor: '#00bcff',
    hoverColorDelta: 0.2,
    colorMode: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.STATIC,
    gradientLightnessDelta: -0.15,
  },
  argTypes: {
    // Appearance
    gapWidthPercent: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Gap width as a percentage of the display width',
      defaultValue: { summary: 0.0035 },
      table: {
        category: 'Appearance',
      },
    },
    gapMinWidth: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Minimum gap width in pixels',
      defaultValue: { summary: 1 },
      table: {
        category: 'Appearance',
      },
    },
    gapMaxWidth: {
      control: { type: 'range', min: 0, max: 50, step: 1 },
      description: 'Maximum gap width in pixels',
      table: {
        category: 'Appearance',
      },
    },
    segmentMinWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum width per segment in pixels',
      defaultValue: { summary: 2 },
      table: {
        category: 'Appearance',
      },
    },
    heightScale: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
      description: 'Height of waveform as a proportion of canvas height',
      defaultValue: { summary: 1 },
      table: {
        category: 'Appearance',
      },
    },

    // Color
    color: {
      control: 'color',
      description: 'Color of the unplayed waveform segments',
      defaultValue: { summary: '#cccccc' },
      table: {
        category: 'Color',
      },
    },
    progressColor: {
      control: 'color',
      description: 'Color of the played waveform segments',
      defaultValue: { summary: '#0066cc' },
      table: {
        category: 'Color',
      },
    },
    hoverColor: {
      control: 'color',
      description:
        'Custom color when hovering over the waveform. When provided, overrides the automatic hover color generation.',
      table: {
        category: 'Color',
      },
    },
    hoverColorDelta: {
      control: { type: 'range', min: -1, max: 1, step: 0.1 },
      description:
        'Amount to adjust the lightness of the progress color when hovering. Positive values lighten the color, negative values darken it. Only used when hoverColor is not explicitly provided.',
      defaultValue: { summary: 0.2 },
      if: { arg: 'hoverColor', exists: false },
      table: {
        category: 'Color',
      },
    },
    colorMode: {
      control: 'select',
      options: Object.values(AUDIO_WAVEFORM_PROGRESS_COLOR_MODES),
      description: 'Color mode for the progress visualization',
      defaultValue: { summary: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.STATIC },
      table: {
        category: 'Color',
      },
    },
    gradientLightnessDelta: {
      control: { type: 'range', min: -1, max: 1, step: 0.1 },
      description:
        'Amount to adjust the lightness of the progress color for the gradient. Positive values lighten the color, negative values darken it. Only used when colorMode is GRADIENT and gradientStops are not explicitly provided.',
      if: { arg: 'colorMode', eq: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.GRADIENT },
      defaultValue: { summary: -0.15 },
      table: {
        category: 'Color',
      },
    },
    gradientStops: {
      control: false,
      description: 'Custom gradient stops for gradient color mode',
      if: { arg: 'colorMode', eq: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.GRADIENT },
      table: {
        category: 'Color',
        type: {
          summary: 'GradientStop[]',
          detail: `type GradientStop = {
  offset: number;  // Value between 0 and 1
  color: string;   // CSS color value
}`,
        },
      },
    },

    // Advanced (Custom Implementation) - Props needed only when using outside AudioPlayer
    data: {
      control: false,
      description: 'Audio envelope data from pre-processed segments or raw audio data',
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
      type: { name: 'other', value: 'AudioData', required: true },
    },
    audioRef: {
      control: false,
      description: 'Reference to the HTML audio element that will be visualized',
      table: {
        type: { summary: 'RefObject<HTMLAudioElement>' },
      },
      type: { name: 'other', value: 'RefObject<HTMLAudioElement>', required: true },
    },
    isActive: {
      control: false,
      description: 'Controls when the visualizer should be actively analyzing and rendering',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      type: { name: 'boolean', required: true },
    },
    duration: {
      control: false,
      description: 'Duration of the audio track in seconds',
      table: {
        type: { summary: 'number' },
      },
      type: { name: 'number', required: true },
    },
    onProgressChange: {
      control: false,
      description: 'Callback function called when the user seeks to a new position',
      table: {
        type: { summary: '(time: number) => void' },
        category: 'Advanced',
      },
      type: { name: 'function' },
    },
    onPreviewTimeChange: {
      control: false,
      description: 'Callback function called when the user hovers over the waveform',
      table: {
        type: { summary: '(time: number | null) => void' },
        category: 'Advanced',
      },
      type: { name: 'function' },
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
};`,
        },
        category: 'Advanced',
      },
    },
    seekIncrement: {
      control: { type: 'range', min: 1, max: 30, step: 1 },
      description: 'Number of seconds to seek when using keyboard controls',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '5' },
        category: 'Advanced',
      },
    },
    seekAcceleration: {
      control: { type: 'range', min: 1, max: 10, step: 0.1 },
      description: 'Multiplier for seek increment when holding down seek keys',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1.5' },
        category: 'Advanced',
      },
    },
    seekAccelerationDelay: {
      control: { type: 'range', min: 100, max: 2000, step: 100 },
      description: 'Delay in milliseconds before seek acceleration starts',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '500' },
        category: 'Advanced',
      },
    },
    seekInterval: {
      control: { type: 'range', min: 50, max: 1000, step: 50 },
      description: 'Interval in milliseconds between seek operations when holding down seek keys',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
        category: 'Advanced',
      },
    },
    maxSeekIncrement: {
      control: { type: 'range', min: 1, max: 60, step: 1 },
      description: 'Maximum number of seconds to seek when using keyboard controls',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '30' },
        category: 'Advanced',
      },
    },
    frameRate: {
      control: { type: 'range', min: 15, max: 120, step: 5 },
      description: 'Frame rate for animation updates',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '60' },
        category: 'Advanced',
      },
    },
    dependencies: {
      control: false,
      description: 'Additional dependencies for animation frame updates',
      table: {
        type: { summary: 'React.DependencyList' },
        category: 'Advanced',
      },
    },
    devicePixelRatio: {
      control: { type: 'range', min: 1, max: 4, step: 0.25 },
      description:
        'Override the device pixel ratio for canvas rendering. Useful for controlling rendering quality and performance.',
      table: {
        type: { summary: 'number' },
        category: 'Advanced',
      },
    },
    resolutionMode: {
      control: { type: 'radio' },
      options: ['auto', 'high', 'low'],
      description:
        'Controls how the device pixel ratio is handled. "auto" uses native DPR, "high" supersamples fractional DPR by rounding up, "low" downsamples to 1x for performance.',
      table: {
        type: { summary: '"auto" | "high" | "low"' },
        defaultValue: { summary: 'auto' },
        category: 'Advanced',
      },
    },
  },
  tags: ['autodocs'],
} as Meta<typeof AudioWaveformProgress>;

type Story = StoryObj<typeof AudioPlayerWaveformProgressWithData>;

export const Basic: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    color: '#9f9fa9',
    gapWidthPercent: 0.0035,
    colorMode: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.STATIC,
    heightScale: 1,
    gapMinWidth: 0,
    segmentMinWidth: 1,
    progressColor: '#00bcff',
    seekIncrement: 1,
    seekAcceleration: 1.5,
    seekAccelerationDelay: 100,
    seekInterval: 100,
    maxSeekIncrement: 30,
    devicePixelRatio: undefined,
    resolutionMode: 'high',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic waveform progress with default settings. Shows played segments in blue and unplayed segments in gray.',
      },
    },
  },
};

export const CustomColors: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    colorMode: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.STATIC,
    hoverColor: '#ffcc00',
    progressColor: '#ff3300',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with custom color scheme. Shows played segments in red, unplayed segments in dark gray, and hover state in yellow.',
      },
    },
  },
};

export const AutomaticGradient: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    colorMode: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.GRADIENT,
    gradientLightnessDelta: -0.15,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with automatic gradient generation based on the progressColor. The gradient starts with a darker shade of the progress color at the bottom and transitions to the main color.',
      },
    },
  },
};

export const CustomGradientStops: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    colorMode: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.GRADIENT,
    gradientStops: [
      { offset: 0, color: '#66b3ff' }, // Light blue
      { offset: 0.5, color: '#0066cc' }, // Medium blue
      { offset: 1, color: '#003366' }, // Dark blue
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with custom gradient stops for complete control over the gradient appearance. This example creates a blue gradient effect transitioning from dark blue at the bottom through medium blue to light blue at the top of each segment.',
      },
    },
  },
};

export const DenseWaveform: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    gapWidthPercent: 0,
    colorMode: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.STATIC,
    segmentMinWidth: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dense waveform with minimal gaps and thin segments, providing a more detailed visualization.',
      },
    },
  },
};

export const SparseWaveform: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    colorMode: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.STATIC,
    segmentMinWidth: 4,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sparse waveform with wider gaps and thicker segments, creating a more stylized visualization.',
      },
    },
  },
};

export const SmallGaps: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    colorMode: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.STATIC,
    gapWidthPercent: 0.2,
    gapMinWidth: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with small gaps (0.2% of display width) between segments, providing subtle separation.',
      },
    },
  },
};

export const MediumGaps: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    colorMode: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.STATIC,
    gapWidthPercent: 0.5,
    gapMinWidth: 1,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with medium gaps (0.5% of display width) between segments, creating clear visual separation.',
      },
    },
  },
};

export const LargeGaps: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    colorMode: AUDIO_WAVEFORM_PROGRESS_COLOR_MODES.STATIC,
    gapWidthPercent: 0.75,
    gapMinWidth: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with large gaps (1% of display width) between segments, creating a stylized, segmented appearance.',
      },
    },
  },
};
