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
    },
    layout: 'padded',
  },
  argTypes: {
    barColor: {
      control: 'color',
      description: 'Color of the unplayed waveform bars',
      defaultValue: { summary: '#cccccc' },
    },
    progressColor: {
      control: 'color',
      description: 'Color of the played waveform bars',
      defaultValue: { summary: '#0066cc' },
    },
    hoverColor: {
      control: 'color',
      description:
        'Custom color when hovering over the waveform. When provided, overrides the automatic hover color generation.',
    },
    hoverColorDelta: {
      control: { type: 'range', min: -1, max: 1, step: 0.1 },
      description:
        'Amount to adjust the lightness of the progress color when hovering. Positive values lighten the color, negative values darken it. Only used when hoverColor is not explicitly provided.',
      defaultValue: { summary: 0.2 },
    },
    colorMode: {
      control: 'select',
      options: Object.values(AUDIO_PROGRESS_COLOR_MODES),
      description: 'Color mode for the progress visualization',
      defaultValue: { summary: AUDIO_PROGRESS_COLOR_MODES.SOLID },
    },
    gradientStops: {
      control: 'object',
      description: 'Custom gradient stops for gradient color mode',
      if: { arg: 'colorMode', eq: AUDIO_PROGRESS_COLOR_MODES.GRADIENT },
    },
    gradientLightnessDelta: {
      control: { type: 'range', min: -1, max: 1, step: 0.1 },
      description:
        'Amount to adjust the lightness of the progress color for the gradient. Positive values lighten the color, negative values darken it. Only used when colorMode is GRADIENT and gradientStops are not explicitly provided.',
      if: { arg: 'colorMode', eq: AUDIO_PROGRESS_COLOR_MODES.GRADIENT },
      defaultValue: { summary: -0.15 },
    },
    barGapRatio: {
      control: { type: 'range', min: 0, max: 0.02, step: 0.001 },
      description: 'Gap between bars as a proportion of canvas width',
      defaultValue: { summary: 0.0035 },
    },
    minBarGapPercent: {
      control: { type: 'range', min: 0, max: 0.02, step: 0.001 },
      description: 'Minimum gap between bars as a percentage of canvas width',
      defaultValue: { summary: 0.001 },
    },
    minBarWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum width for each bar in pixels',
      defaultValue: { summary: 2 },
    },
    heightScale: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
      description: 'Height of waveform as a proportion of canvas height',
      defaultValue: { summary: 1 },
    },
  },
  tags: ['autodocs'],
} as Meta<typeof AudioProgressWaveform>;

type Story = StoryObj<typeof AudioPlayerProgressWaveform>;

export const Basic: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    progressColor: '#00bcff',
    barColor: '#9f9fa9',
    barGapRatio: 0.0035,
    minBarWidth: 1,
    heightScale: 1,
    minBarGapPercent: 0.001,
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
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
    progressColor: '#ff3300',
    hoverColor: '#ffcc00',
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
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
    progressColor: '#00bcff',
    colorMode: AUDIO_PROGRESS_COLOR_MODES.GRADIENT,
    // No custom gradientStops provided - will use automatic calculation
    gradientLightnessDelta: -0.15, // Makes bottom of gradient darker than the base color
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
    progressColor: '#ff0000',
    colorMode: AUDIO_PROGRESS_COLOR_MODES.GRADIENT,
    gradientStops: [
      { offset: 0, color: '#ff0000' },
      { offset: 0.5, color: '#ff9900' },
      { offset: 1, color: '#ffff00' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with custom gradient stops for complete control over the gradient appearance. This example creates a fire-like effect transitioning from red at the bottom through orange to yellow at the top of each bar.',
      },
    },
  },
};

export const DenseWaveform: Story = {
  render: (args) => <AudioPlayerWrapper {...args} />,
  args: {
    progressColor: '#00cc66',
    barGapRatio: 0, // Minimal gap
    minBarWidth: 0, // Thinner bars
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
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
    progressColor: '#9900cc',
    barGapRatio: 0.01, // Wider gaps
    minBarWidth: 4, // Thicker bars
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
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
    progressColor: '#0099cc',
    heightScale: 0.4, // Lower height scale
    colorMode: AUDIO_PROGRESS_COLOR_MODES.SOLID,
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
