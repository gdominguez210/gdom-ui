import type { StoryObj, Meta } from '@storybook/react-vite';
import { AudioVisualizerFrequencyBars } from '@/lib/AudioVisualizerFrequencyBars/AudioVisualizerFrequencyBars';
import { trackData } from '@/data/trackData';
import { AudioPlayerCompoundComponent as AudioPlayer } from '@/lib/AudioPlayer/namespace';
import { CollapseCategory } from '@/.storybook/decorators/CollapseCategory/CollapseCategory';

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
    barCount: {
      control: { type: 'range', min: 32, max: 256, step: 8 },
      description: 'Number of frequency bars to display',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '128' },
        category: 'Appearance',
      },
    },
    barGapRatio: {
      control: { type: 'range', min: 0, max: 0.05, step: 0.001 },
      description: 'Gap between bars as proportion of canvas width',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0.004' },
        category: 'Appearance',
      },
    },
    heightMultiplier: {
      control: { type: 'range', min: 0.5, max: 3, step: 0.1 },
      description: 'Height multiplier for bars',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Appearance',
      },
    },
    minBarHeight: {
      control: { type: 'range', min: 0, max: 0.5, step: 0.05 },
      description: 'Minimum height of bars (0-1)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
        category: 'Appearance',
      },
    },
    minBarWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum width of bars (in pixels)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
        category: 'Appearance',
      },
    },

    // Color Configuration
    barColor: {
      control: { type: 'color' },
      description: 'Color of frequency bars',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '#029CFD' },
        category: 'Color Configuration',
      },
    },
    colorMode: {
      control: 'select',
      options: ['static', 'frequency', 'intensity', 'spectrum', 'dynamic'],
      description: 'How the bars are colored',
      table: {
        type: { summary: 'static | frequency | intensity | spectrum | dynamic' },
        defaultValue: { summary: 'static' },
        category: 'Color Configuration',
      },
    },
    colorTransitionDuration: {
      control: { type: 'range', min: 0, max: 10000, step: 100 },
      description: 'Duration of the color transition in milliseconds',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1000' },
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
        'FFT size for frequency data resolution. A higher value will result in more details in the frequency domain.',
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

AudioVisualizerWithControls.displayName = 'AudioVisualizerFrequencyBars';

export const Primary: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: '#029CFD',
    barCount: 128,
    barGapRatio: 0.004,
    colorMode: 'intensity',
    colorTransitionDuration: 1000,
    fftSize: 2048,
    frameRate: 60,
    heightMultiplier: 1,
    minBarHeight: 0,
    minBarWidth: 1,
    smoothingTimeConstant: 0.85,
    frameTransitionSmoothing: 0.3,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive audio visualizer with intensity-based color variation. Click the play button to start playback and see the visualizer in action.',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const StaticColor: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: '#03C988',
    barCount: 128,
    colorMode: 'static',
  },
  parameters: {
    docs: {
      description: {
        story: 'Visualizer with a static color for all frequency bars.',
      },
    },
    source: {
      type: 'dynamic',
    },
  },
};

export const FrequencyBasedColor: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: '#A084DC',
    barCount: 128,
    colorMode: 'frequency',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Visualizer with colors varying based on frequency position. Lower frequencies appear closer to the original color, while higher frequencies shift in hue.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
};

export const SpectrumColor: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: '#F875AA',
    barCount: 128,
    colorMode: 'spectrum',
  },
  parameters: {
    docs: {
      description: {
        story: 'Visualizer with a full color spectrum distribution across frequency bars.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
};

export const DynamicColor: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: '#FF6C22',
    barCount: 128,
    colorMode: 'dynamic',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Visualizer with colors that dynamically adjust based on audio intensity, creating a vibrant, reactive display.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
};

export const HighResolution: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: '#029CFD',
    barCount: 256,
    barGapRatio: 0.001,
    colorMode: 'intensity',
  },
  parameters: {
    docs: {
      description: {
        story: 'High-resolution visualization with more bars for detailed frequency analysis.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
};

export const LowResolution: StoryObj<typeof AudioVisualizerFrequencyBars> = {
  render: (args) => <AudioVisualizerWithControls {...args} />,
  args: {
    barColor: '#029CFD',
    barCount: 32,
    barGapRatio: 0.015,
    colorMode: 'intensity',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Lower resolution visualization with fewer, wider bars for a more traditional equalizer look.',
      },
      source: {
        type: 'dynamic',
      },
    },
  },
};
