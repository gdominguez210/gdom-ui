import type { StoryObj, Meta } from '@storybook/react';
import { AudioWaveform } from '@lib/AudioWaveform/AudioWaveform';
import { waveformData } from '@lib/AudioPlayer/data';

const sampleWaveformData = waveformData['58730401-c910-4a77-935e-83d71d5d1a52'] || [];

export default {
  title: 'components/AudioWaveform',
  component: AudioWaveform,
  parameters: {
    docs: {
      description: {
        component:
          'A customizable audio waveform visualization component that renders amplitude data as vertical bars.',
      },
      source: {
        transform: (code: string) => {
          // Replace array literal with placeholder
          return code.replace(
            /waveformData=\{[^}]+\}/,
            'waveformData={[/* Array of amplitude values */]}',
          );
        },
      },
    },
  },
  argTypes: {
    waveformData: {
      control: 'object',
      description: 'Array of normalized amplitude values between 0-1',
      table: {
        disable: true, // Hide from controls table due to large size
      },
    },
    barColor: {
      control: 'color',
      description: 'Color of the waveform bars',
    },
    barGapRatio: {
      control: { type: 'range', min: 0, max: 0.02, step: 0.001 },
      description: 'Gap between bars as a proportion of canvas width',
    },
    minBarWidth: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
      description: 'Minimum width for each bar in pixels',
    },
    heightScale: {
      control: { type: 'range', min: 0.1, max: 1, step: 0.1 },
      description: 'Height of waveform as a proportion of canvas height',
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
  tags: ['autodocs'],
} as Meta<typeof AudioWaveform>;

export const Basic: StoryObj<typeof AudioWaveform> = {
  args: {
    waveformData: sampleWaveformData,
    barColor: '#0066cc',
    barGapRatio: 0.0035,
    minBarWidth: 2,
    heightScale: 0.8,
    className: 'max-h-[150px]',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Basic waveform visualization with default settings. Uses a blue color scheme and balanced bar width/spacing.',
      },
      source: {
        type: 'dynamic',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const DenseWaveform: StoryObj<typeof AudioWaveform> = {
  args: {
    waveformData: sampleWaveformData,
    barColor: '#333333',
    barGapRatio: 0, // No gap
    minBarWidth: 1, // Thinner bars
    heightScale: 0.8,
    className: 'max-h-[150px]',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Dense waveform with thinner bars and minimal gaps, creating a more compact visualization with higher detail.',
      },
    },
  },
};

export const SparseWaveform: StoryObj<typeof AudioWaveform> = {
  args: {
    waveformData: sampleWaveformData,
    barColor: '#990000',
    barGapRatio: 0.01, // Wider gaps
    minBarWidth: 4, // Thicker bars
    heightScale: 0.8,
    className: 'max-h-[150px]',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Sparse waveform with thicker bars and wider gaps, providing a more spaced-out, less detailed visualization.',
      },
    },
  },
};

export const CustomHeightScale: StoryObj<typeof AudioWaveform> = {
  args: {
    waveformData: sampleWaveformData,
    barColor: '#009966',
    barGapRatio: 0.0035,
    minBarWidth: 2,
    heightScale: 0.5, // Only 50% of container height
    className: 'max-h-[150px]',
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Waveform with reduced height scale (50% of container), demonstrating how the visualization can be vertically constrained.',
      },
    },
  },
};

export const CustomColorFunction: StoryObj<typeof AudioWaveform> = {
  args: {
    waveformData: sampleWaveformData,
    barGapRatio: 0.0035,
    minBarWidth: 2,
    heightScale: 0.8,
    className: 'max-h-[150px]',
    getBarColor: (barInfo) => {
      // Color based on amplitude
      if (barInfo.value > 0.7) return '#ff3300'; // Loud parts
      if (barInfo.value > 0.4) return '#ff9900'; // Medium parts
      return '#cccccc'; // Quiet parts
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Waveform with dynamic coloring based on amplitude values. Loud sections appear red, medium sections in orange, and quiet sections in light gray.',
      },
    },
  },
};
