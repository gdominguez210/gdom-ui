import type { StoryObj, Meta } from '@storybook/react';
import { AudioProgressWaveform } from '@/lib/AudioProgressWaveform/AudioProgressWaveform';
import { AUDIO_PROGRESS_COLOR_MODES } from '@/lib/AudioProgressWaveform/types';
import { waveformData, trackData } from '@/lib/AudioPlayer/data';
import { AudioPlayerCompoundComponent as AudioPlayer } from '@/lib/AudioPlayer/namespace';
import {
  AudioPlayerProgressWaveform,
  type AudioPlayerProgressWaveformProps,
} from '@/lib/AudioPlayerProgressWaveform/AudioPlayerProgressWaveform';
import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import { DeferredRender } from '@storybook-components/DeferredRender/DeferredRender';
import { CollapseCategory } from '@storybook-decorators/CollapseCategory/CollapseCategory';

function AudioPlayerProgressWaveformWithWaveformData(
  props: Omit<AudioPlayerProgressWaveformProps, 'waveformData'>,
) {
  const { currentTrack } = useAudioPlayerContextTrack();
  const currentTrackWaveformData = waveformData[currentTrack?.id ?? ''] || [];

  return (
    <AudioPlayerProgressWaveform
      {...props}
      waveformData={currentTrackWaveformData}
    />
  );
}

AudioPlayerProgressWaveformWithWaveformData.displayName = 'AudioProgressWaveform';

function AudioPlayerWrapper(props: AudioPlayerProgressWaveformProps) {
  return (
    <DeferredRender height={300}>
      <AudioPlayer.Provider tracks={trackData}>
        <AudioPlayer.Root>
          <AudioPlayerProgressWaveformWithWaveformData
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
        </AudioPlayer.Root>
      </AudioPlayer.Provider>
    </DeferredRender>
  );
}

AudioPlayerWrapper.displayName = 'AudioProgressWaveform';

export default {
  title: 'components/AudioProgressWaveform',
  component: AudioProgressWaveform,
  parameters: {
    docs: {
      description: {
        component:
          'An interactive audio waveform visualization component that displays playback progress and allows seeking.',
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
    barGapRatio: 0.0035,
    minBarGapPercent: 0.001,
    minBarWidth: 2,
    heightScale: 1,
    barColor: '#cccccc',
    progressColor: '#0066cc',
    hoverColorDelta: 0.2,
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
    gradientLightnessDelta: -0.15,
  },
  argTypes: {
    // Appearance
    barGapRatio: {
      control: { type: 'range', min: 0, max: 0.02, step: 0.001 },
      description: 'Gap between bars as a proportion of canvas width',
      defaultValue: { summary: 0.0035 },
      table: {
        category: 'Appearance',
      },
    },
    minBarGapPercent: {
      control: { type: 'range', min: 0, max: 0.02, step: 0.001 },
      description: 'Minimum gap between bars as a percentage of canvas width',
      defaultValue: { summary: 0.001 },
      table: {
        category: 'Appearance',
      },
    },
    minBarWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum width for each bar in pixels',
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
    barColor: {
      control: 'color',
      description: 'Color of the unplayed waveform bars',
      defaultValue: { summary: '#cccccc' },
      table: {
        category: 'Color',
      },
    },
    progressColor: {
      control: 'color',
      description: 'Color of the played waveform bars',
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
      options: Object.values(AUDIO_PROGRESS_COLOR_MODES),
      description: 'Color mode for the progress visualization',
      defaultValue: { summary: AUDIO_PROGRESS_COLOR_MODES.SOLID },
      table: {
        category: 'Color',
      },
    },
    gradientLightnessDelta: {
      control: { type: 'range', min: -1, max: 1, step: 0.1 },
      description:
        'Amount to adjust the lightness of the progress color for the gradient. Positive values lighten the color, negative values darken it. Only used when colorMode is GRADIENT and gradientStops are not explicitly provided.',
      if: { arg: 'colorMode', eq: AUDIO_PROGRESS_COLOR_MODES.GRADIENT },
      defaultValue: { summary: -0.15 },
      table: {
        category: 'Color',
      },
    },
    gradientStops: {
      control: false,
      description: 'Custom gradient stops for gradient color mode',
      if: { arg: 'colorMode', eq: AUDIO_PROGRESS_COLOR_MODES.GRADIENT },
      table: {
        category: 'Color',
        type: {
          summary: 'WaveformGradientStop[]',
          detail: `type WaveformGradientStop = {
  offset: number;  // Value between 0 and 1
  color: string;   // CSS color value
}`,
        },
      },
    },

    // Advanced (Custom Implementation) - Props needed only when using outside AudioPlayer
    audioRef: {
      control: false,
      description: 'Reference to the HTML audio element that will be visualized',
      table: {
        type: { summary: 'RefObject<HTMLAudioElement>' },
        category: 'Advanced',
      },
      type: { name: 'other', value: 'RefObject<HTMLAudioElement>', required: true },
    },
    isActive: {
      control: false,
      description: 'Controls when the visualizer should be actively analyzing and rendering',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Advanced',
      },
      type: { name: 'boolean', required: true },
    },
    duration: {
      control: false,
      description: 'Duration of the audio track in seconds',
      table: {
        type: { summary: 'number' },
        category: 'Advanced',
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
  },
  tags: ['autodocs'],
} as Meta<typeof AudioProgressWaveform>;

type Story = StoryObj<typeof AudioPlayerProgressWaveform>;

export const Basic: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    barColor: '#9f9fa9',
    barGapRatio: 0.0035,
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
    heightScale: 1,
    minBarGapPercent: 0.001,
    minBarWidth: 1,
    progressColor: '#00bcff',
    seekIncrement: 5,
    seekAcceleration: 1.5,
    seekAccelerationDelay: 500,
    seekInterval: 100,
    maxSeekIncrement: 30,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic progress waveform with default settings. Shows played sections in blue and unplayed sections in gray.',
      },
    },
  },
};

export const CustomColors: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
    hoverColor: '#ffcc00',
    progressColor: '#ff3300',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with custom color scheme. Shows played sections in red, unplayed sections in dark gray, and hover state in yellow.',
      },
    },
  },
};

export const AutomaticGradient: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    colorMode: AUDIO_PROGRESS_COLOR_MODES.GRADIENT,
    gradientLightnessDelta: -0.15,
    progressColor: '#00bcff',
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
    colorMode: AUDIO_PROGRESS_COLOR_MODES.GRADIENT,
    gradientStops: [
      { offset: 0, color: '#003366' }, // Dark blue
      { offset: 0.5, color: '#0066cc' }, // Medium blue
      { offset: 1, color: '#66b3ff' }, // Light blue
    ],
    progressColor: '#0066cc',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with custom gradient stops for complete control over the gradient appearance. This example creates a blue gradient effect transitioning from dark blue at the bottom through medium blue to light blue at the top of each bar.',
      },
    },
  },
};

export const DenseWaveform: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    barGapRatio: 0,
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
    minBarWidth: 0,
    progressColor: '#00cc66',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Dense waveform with thinner bars and minimal gaps, providing a more detailed visualization.',
      },
    },
  },
};

export const SparseWaveform: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    barGapRatio: 0.01,
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
    minBarWidth: 4,
    progressColor: '#9900cc',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Sparse waveform with thicker bars and wider gaps, creating a more stylized visualization.',
      },
    },
  },
};

export const LowProfile: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
    heightScale: 0.4,
    progressColor: '#0099cc',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Low-profile waveform with reduced height scale, useful for more subtle visualizations in UI layouts.',
      },
    },
  },
};
