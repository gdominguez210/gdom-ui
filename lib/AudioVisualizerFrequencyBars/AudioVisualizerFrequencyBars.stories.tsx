import type { Meta, StoryObj } from '@storybook/react';
import { AudioVisualizerFrequencyBars } from '@lib/AudioVisualizerFrequencyBars/AudioVisualizerFrequencyBars';
import { trackData } from '@lib/AudioPlayer/data';
import { AudioPlayerCompoundComponent as AudioPlayer } from '@lib/AudioPlayer/namespace';

const PREDEFINED_COLORS = {
  Blue: '#029CFD',
  Green: '#03C988',
  Purple: '#A084DC',
  Orange: '#FF6C22',
  Pink: '#F875AA',
} as const;

export default {
  title: 'components/AudioVisualizerFrequencyBars',
  component: AudioVisualizerFrequencyBars,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A frequency bar visualizer for audio playback',
    docs: {
      description: {
        component:
          'An interactive audio frequency bar visualizer that displays the audio spectrum in real-time.',
      },
    },
  },
  argTypes: {
    barColor: {
      control: 'select',
      options: Object.keys(PREDEFINED_COLORS),
      mapping: PREDEFINED_COLORS,
      description: 'Color of frequency bars',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#FFFFFF' },
      },
    },
    colorMode: {
      control: 'select',
      options: ['static', 'frequency', 'intensity', 'spectrum', 'dynamic'],
      description: 'How the bars are colored',
      table: {
        type: { summary: 'static | frequency | intensity | spectrum | dynamic' },
        defaultValue: { summary: 'static' },
      },
    },
    colorTransitionDuration: {
      control: { type: 'range', min: 0, max: 10000, step: 100 },
      description: 'Duration of the color transition in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1000' },
      },
    },
    barCount: {
      control: { type: 'range', min: 32, max: 256, step: 8 },
      description: 'Number of frequency bars to display',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '128' },
      },
    },
    heightMultiplier: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Height multiplier for bars',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1.2' },
      },
    },
    minBarHeight: {
      control: { type: 'range', min: 0, max: 0.5, step: 0.05 },
      description: 'Minimum height of bars (0-1)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    minBarWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum width of bars (in pixels)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    barGapRatio: {
      control: { type: 'range', min: 0, max: 0.05, step: 0.001 },
      description: 'Gap between bars as proportion of canvas width',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.004' },
      },
    },
    fftSize: {
      control: 'select',
      options: [256, 512, 1024, 2048, 4096, 8192, 16384, 32768],
      description:
        'FFT size for frequency data resolution. A higher value will result in more details in the frequency domain.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2048' },
      },
    },
    smoothingTimeConstant: {
      control: { type: 'range', min: 0, max: 0.99, step: 0.01 },
      description: 'Smoothing time constant for visualization (0-1)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.85' },
      },
    },
    frameRate: {
      control: { type: 'range', min: 15, max: 120, step: 5 },
      description: 'Target frame rate for animation rendering',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '60' },
      },
    },
  },
} as Meta<typeof AudioVisualizerFrequencyBars>;

// Extract visualizer props to avoid duplication in spread
type VisualizerControlProps = Omit<
  React.ComponentProps<typeof AudioVisualizerFrequencyBars>,
  'audioRef' | 'isActive'
>;

const AudioVisualizerWithControls = (props: VisualizerControlProps) => {
  return (
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.AudioContextProvider>
        <AudioPlayer.Root className="@container/audio-player">
          <AudioPlayer.VisualizerFrequencyBars
            className="max-h-[150px]"
            {...props}
          />
          <div className="justify-space-between grow gap-4 @min-lg/audio-player:flex">
            <AudioPlayer.Info className="basis-1/3">
              <AudioPlayer.Image />
              <div className="p-2 @min-lg/audio-player:py-2">
                <AudioPlayer.Title />
                <AudioPlayer.Author />
                <AudioPlayer.Time />
              </div>
            </AudioPlayer.Info>
            <AudioPlayer.Controls className="basis-2/3 @min-lg/audio-player:gap-1 @min-lg/audio-player:text-2xl">
              <AudioPlayer.ControlAudio />
              <AudioPlayer.ControlLoop className="hidden @min-lg/audio-player:block" />
              <AudioPlayer.ControlPrevious />
              <AudioPlayer.ControlPlay />
              <AudioPlayer.ControlNext />
              <AudioPlayer.ControlShuffle className="hidden @min-lg/audio-player:block" />
              <AudioPlayer.Volume className="ml-auto pr-4">
                <AudioPlayer.VolumeButton />
                <AudioPlayer.VolumeSlider />
              </AudioPlayer.Volume>
            </AudioPlayer.Controls>
          </div>
          <AudioPlayer.ProgressBar />
        </AudioPlayer.Root>
      </AudioPlayer.AudioContextProvider>
    </AudioPlayer.Provider>
  );
};

export const Primary: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: PREDEFINED_COLORS.Blue,
    colorMode: 'intensity',
    barCount: 128,
    heightMultiplier: 1.2,
    minBarHeight: 0,
    minBarWidth: 1,
    barGapRatio: 0.004,
    fftSize: 2048,
    smoothingTimeConstant: 0.85,
    frameRate: 60,
    colorTransitionDuration: 1000,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive audio visualizer with intensity-based color variation. Click the play button to start playback and see the visualizer in action.',
      },
    },
  },
};

export const StaticColor: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: PREDEFINED_COLORS.Green,
    colorMode: 'static',
    barCount: 128,
  },
  parameters: {
    docs: {
      description: {
        story: 'Visualizer with a static color for all frequency bars.',
      },
    },
  },
};

export const FrequencyBasedColor: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: PREDEFINED_COLORS.Purple,
    colorMode: 'frequency',
    barCount: 128,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Visualizer with colors varying based on frequency position. Lower frequencies appear closer to the original color, while higher frequencies shift in hue.',
      },
    },
  },
};

export const SpectrumColor: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: PREDEFINED_COLORS.Pink,
    colorMode: 'spectrum',
    barCount: 128,
  },
  parameters: {
    docs: {
      description: {
        story: 'Visualizer with a full color spectrum distribution across frequency bars.',
      },
    },
  },
};

export const DynamicColor: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: PREDEFINED_COLORS.Orange,
    colorMode: 'dynamic',
    barCount: 128,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Visualizer with colors that dynamically adjust based on audio intensity, creating a vibrant, reactive display.',
      },
    },
  },
};

export const HighResolution: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: PREDEFINED_COLORS.Blue,
    colorMode: 'intensity',
    barCount: 256,
    barGapRatio: 0.001,
  },
  parameters: {
    docs: {
      description: {
        story: 'High-resolution visualization with more bars for detailed frequency analysis.',
      },
    },
  },
};

export const LowResolution: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: PREDEFINED_COLORS.Blue,
    colorMode: 'intensity',
    barCount: 32,
    barGapRatio: 0.015,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lower resolution visualization with fewer, wider bars for a more traditional equalizer look.',
      },
    },
  },
};
