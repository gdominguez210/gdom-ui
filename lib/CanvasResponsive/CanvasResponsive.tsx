import type { ComponentPropsWithRef } from 'react';
import { useCanvasResponsive, type UseCanvasResponsiveOptions } from './useCanvasResponsive';
import {
  useDevicePixelRatioAdaptive,
  type UseDevicePixelRatioAdaptiveOptions,
} from '@/lib/useDevicePixelRatioAdaptive/useDevicePixelRatioAdaptive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type CanvasResponsiveProps = ComponentPropsWithRef<'canvas'> &
  UseCanvasResponsiveOptions &
  UseDevicePixelRatioAdaptiveOptions;

export function CanvasResponsive(props: CanvasResponsiveProps) {
  const { frameRate, onResize, ref, className, devicePixelRatio, resolutionMode, ...rest } = props;

  const { adaptiveDevicePixelRatio } = useDevicePixelRatioAdaptive({ resolutionMode });

  const { canvasRef } = useCanvasResponsive({
    frameRate,
    onResize,
    devicePixelRatio: devicePixelRatio ?? adaptiveDevicePixelRatio,
  });

  const mergedRef = useComposedRefs(ref, canvasRef);

  return (
    <canvas
      className={twMerge(clsx('w-full max-w-full object-contain', className))}
      ref={mergedRef}
      {...rest}
    />
  );
}
