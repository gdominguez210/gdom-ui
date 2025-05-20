import type { StoryObj, Meta } from '@storybook/react';
import { useCallback, useEffect, useRef } from 'react';
import { CanvasResponsive as CanvasResponsiveComponent } from '@/lib/CanvasResponsive/CanvasResponsive';

export default {
  title: 'components/CanvasResponsive',
  component: CanvasResponsiveComponent,
  argTypes: {
    frameRate: {
      control: { type: 'number', min: 1, max: 120 },
      description: 'Optional frame rate limit for resize handling (fps)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: 'browser refresh rate' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A responsive canvas component that automatically manages canvas resolution and scaling based on container dimensions, device pixel ratio, and window resize events.',
      },
    },
  },
} as Meta<typeof CanvasResponsiveComponent>;

const DrawingCanvas = (props: React.ComponentProps<typeof CanvasResponsiveComponent>) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawSomething = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f0f9ff');
    gradient.addColorStop(1, '#e6f0f8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate a responsive font size based on canvas width
    // Min font size of 12px, scales up to 16px for larger canvases
    const fontSize = Math.max(12, Math.min(16, canvas.width / 40));

    // Draw text showing current dimensions and device pixel ratio
    ctx.fillStyle = '#333';
    ctx.font = `${fontSize}px sans-serif`;
    // Change text alignment from center to left
    ctx.textAlign = 'left';

    // Increased vertical positioning to prevent text from being cut off
    // Added padding from the top and left sides of the canvas
    const leftPadding = 20;
    const topPadding = 30;
    const lineHeight = fontSize * 2; // Line height proportional to font size

    // Add a background behind the text for better readability
    const textLines = [
      `Canvas Display Size: ${canvas.clientWidth} × ${canvas.clientHeight}`,
      `Canvas Buffer Size: ${canvas.width} × ${canvas.height}`,
      `Device Pixel Ratio: ${window.devicePixelRatio}`,
    ];

    // Display each text line with padding
    textLines.forEach((text, index) => {
      const y = topPadding + lineHeight * index;

      // Calculate text width for the background
      const textWidth = ctx.measureText(text).width;
      const padding = 10;

      // Draw text background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(
        leftPadding - padding / 2,
        y - fontSize,
        textWidth + padding,
        fontSize + padding,
      );

      // Draw text
      ctx.fillStyle = '#333';
      ctx.fillText(text, leftPadding, y);
    });

    // Draw a rectangle to demonstrate the coordinate system
    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 2;
    ctx.strokeRect(leftPadding, topPadding + lineHeight * 3, 100, 80);

    // Draw a circle
    ctx.fillStyle = 'rgba(2, 132, 199, 0.6)';
    ctx.beginPath();
    ctx.arc(canvas.width - 100, topPadding + lineHeight * 3 + 40, 40, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  useEffect(() => {
    drawSomething();
  }, [drawSomething]);

  return (
    <CanvasResponsiveComponent
      ref={canvasRef}
      onResize={drawSomething}
      {...props}
    />
  );
};

export const WithDrawing: StoryObj<typeof CanvasResponsiveComponent> = {
  render: (args) => <DrawingCanvas {...args} />,
  parameters: {
    docs: {
      description: {
        story:
          'Canvas with dynamic drawing showing dimensions and device pixel ratio. This example demonstrates how the canvas automatically scales for different display sizes and resolutions.',
      },
    },
  },
};

export const WithFrameRateLimit: StoryObj<typeof CanvasResponsiveComponent> = {
  render: (args) => <DrawingCanvas {...args} />,
  args: {
    frameRate: 30,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Canvas with a frameRate limit of 30 FPS for resize operations. This can improve performance during window resize or container size changes.',
      },
    },
  },
};
