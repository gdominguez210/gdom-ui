import type { Meta, StoryObj } from '@storybook/react';
import { AudioVisualizerWaveform } from '@lib/AudioVisualizerWaveform/AudioVisualizerWaveform';
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
  title: 'components/AudioVisualizerWaveform',
  component: AudioVisualizerWaveform,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'A waveform visualizer for audio playback',
    docs: {
      description: {
        component:
          'An interactive audio waveform visualizer that displays the audio waveform in real-time.',
      },
    },
  },
  argTypes: {
    lineColor: {
      control: 'select',
      options: Object.keys(PREDEFINED_COLORS),
      mapping: PREDEFINED_COLORS,
      description: 'Color of waveform line',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#FFFFFF' },
      },
    },
    colorMode: {
      control: 'select',
      options: ['static', 'amplitude', 'frequency', 'spectrum', 'dynamic'],
      description: 'How the waveform is colored',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'static' },
      },
    },
    lineWidth: {
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
      description: 'Width of the waveform line',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    segmentCount: {
      control: { type: 'range', min: 10, max: 100, step: 5 },
      description: 'Number of color segments in the waveform',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '40' },
      },
    },
    fftSize: {
      control: 'select',
      options: [256, 512, 1024, 2048, 4096, 8192, 16384, 32768],
      description: 'FFT size for waveform data resolution',
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
} as Meta<typeof AudioVisualizerWaveform>;

// Extract visualizer props to avoid duplication in spread
type VisualizerControlProps = Omit<
  React.ComponentProps<typeof AudioVisualizerWaveform>,
  'audioRef' | 'isActive'
>;

const AudioVisualizerWithControls = (props: VisualizerControlProps) => {
  return (
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.AudioContextProvider>
        <AudioPlayer.Root className="@container/audio-player">
          <AudioPlayer.VisualizerWaveform
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

export const Primary: StoryObj<typeof AudioVisualizerWaveform> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    lineColor: PREDEFINED_COLORS.Blue,
    colorMode: 'static',
    lineWidth: 2,
    segmentCount: 40,
    fftSize: 2048,
    smoothingTimeConstant: 0.85,
    frameRate: 60,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive audio visualizer with amplitude-based color variation. Click the play button to start playback and see the waveform in action.',
      },
    },
  },
};

export const StaticColor: StoryObj<typeof AudioVisualizerWaveform> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    lineColor: PREDEFINED_COLORS.Green,
    colorMode: 'static',
    lineWidth: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Waveform with a static color for the entire line.',
      },
    },
  },
};

export const FrequencyBasedColor: StoryObj<typeof AudioVisualizerWaveform> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    lineColor: PREDEFINED_COLORS.Purple,
    colorMode: 'frequency',
    lineWidth: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with colors varying based on frequency position. Lower frequencies appear closer to the original color, while higher frequencies shift in hue.',
      },
    },
  },
};

export const SpectrumColor: StoryObj<typeof AudioVisualizerWaveform> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    lineColor: PREDEFINED_COLORS.Pink,
    colorMode: 'spectrum',
    lineWidth: 2,
  },
  parameters: {
    docs: {
      description: {
        story: 'Waveform with a full color spectrum distribution across the line.',
      },
    },
  },
};

export const DynamicColor: StoryObj<typeof AudioVisualizerWaveform> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    lineColor: PREDEFINED_COLORS.Orange,
    colorMode: 'dynamic',
    lineWidth: 2,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Waveform with colors that dynamically adjust based on audio intensity, creating a vibrant, reactive display.',
      },
    },
  },
};

export const BoldWaveform: StoryObj<typeof AudioVisualizerWaveform> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    lineColor: PREDEFINED_COLORS.Blue,
    colorMode: 'amplitude',
    lineWidth: 4,
    segmentCount: 20,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Bold waveform with thicker lines and fewer color segments for a stronger visual impact.',
      },
    },
  },
};

export const DetailedWaveform: StoryObj<typeof AudioVisualizerWaveform> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    lineColor: PREDEFINED_COLORS.Pink,
    colorMode: 'spectrum',
    lineWidth: 1.5,
    segmentCount: 60,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Detailed waveform with thinner lines and more color segments for fine-grained visualization.',
      },
    },
  },
};
