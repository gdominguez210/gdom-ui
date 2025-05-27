import type { StoryObj, Meta } from '@storybook/react-vite';
import { AudioVisualizerWaveform } from '@/lib/AudioVisualizerWaveform/AudioVisualizerWaveform';
import { trackData } from '@/lib/AudioPlayer/data';
import { AudioPlayerCompoundComponent as AudioPlayer } from '@/lib/AudioPlayer/namespace';
import { CollapseCategory } from '../../.storybook/decorators/CollapseCategory/CollapseCategory';

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
      controls: {
        sort: 'alpha',
      },
      source: {
        type: 'dynamic',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
  decorators: [CollapseCategory('Advanced')],
  argTypes: {
    // Appearance
    lineWidth: {
      control: { type: 'range', min: 1, max: 10, step: 0.5 },
      description: 'Width of the waveform line',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
        category: 'Appearance',
      },
    },
    segmentCount: {
      control: { type: 'range', min: 10, max: 100, step: 5 },
      description: 'Number of color segments in the waveform',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '40' },
        category: 'Appearance',
      },
    },

    // Color Configuration
    lineColor: {
      control: { type: 'color' },
      description: 'Color of waveform line',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#029CFD' },
        category: 'Color Configuration',
      },
    },
    colorMode: {
      control: 'select',
      options: ['static', 'amplitude', 'frequency', 'spectrum', 'dynamic'],
      description: 'How the waveform is colored',
      table: {
        type: { summary: 'static | amplitude | frequency | spectrum | dynamic' },
        defaultValue: { summary: 'static' },
        category: 'Color Configuration',
      },
    },

    // Performance
    frameRate: {
      control: { type: 'range', min: 15, max: 120, step: 5 },
      description: 'Target frame rate for animation rendering',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '60' },
        category: 'Performance',
      },
    },
    frameTransitionSmoothing: {
      control: { type: 'range', min: 0, max: 1, step: 0.01 },
      description: 'Smoothing factor for transitions between frames (0-1)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.3' },
        category: 'Performance',
      },
    },

    // Audio Analysis
    fftSize: {
      control: 'select',
      options: [256, 512, 1024, 2048, 4096, 8192, 16384, 32768],
      description:
        'FFT size for waveform data resolution. A higher value will result in more details.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '2048' },
        category: 'Audio Analysis',
      },
    },
    smoothingTimeConstant: {
      control: { type: 'range', min: 0, max: 0.99, step: 0.01 },
      description: 'Smoothing time constant for visualization (0-1)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.85' },
        category: 'Audio Analysis',
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
    },
    audioContextRef: {
      control: false,
      description: 'Reference to a Web Audio API AudioContext instance',
      table: {
        type: { summary: 'RefObject<AudioContext>' },
        category: 'Advanced',
      },
      type: { name: 'other', value: 'RefObject<AudioContext>', required: true },
    },
    isAudioContextReady: {
      control: false,
      description: 'Indicates if the AudioContext is initialized and ready to use',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Advanced',
      },
      type: { name: 'boolean', required: true },
    },
    createAudioSource: {
      control: false,
      description: 'Function to create an audio source node from an HTML audio element',
      table: {
        type: { summary: '(audioElement: HTMLAudioElement) => MediaElementAudioSourceNode' },
        category: 'Advanced',
      },
      type: { name: 'function', required: true },
    },
    deleteAudioSource: {
      control: false,
      description: 'Function to delete and clean up an audio source node',
      table: {
        type: { summary: '(audioElement: HTMLAudioElement) => boolean' },
        category: 'Advanced',
      },
      type: { name: 'function', required: true },
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
    lineColor: '#029CFD',
    colorMode: 'static',
    lineWidth: 2,
    segmentCount: 40,
    fftSize: 2048,
    smoothingTimeConstant: 0.85,
    frameRate: 60,
    frameTransitionSmoothing: 0.3,
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
    lineColor: '#03C988',
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
    lineColor: '#A084DC',
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
    lineColor: '#F875AA',
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
    lineColor: '#FF6C22',
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
    lineColor: '#029CFD',
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
    lineColor: '#F875AA',
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
