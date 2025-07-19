import type { ComponentPropsWithRef } from 'react';
import { useCanvasResponsive, type UseCanvasResponsiveOptions } from './useCanvasResponsive';
import {
  useDevicePixelRatioAdaptive,
  type UseDevicePixelRatioAdaptiveOptions,
} from '@/lib/useDevicePixelRatioAdaptive/useDevicePixelRatioAdaptive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';
import { cn } from '@/utils/cn';

export type CanvasResponsiveProps = ComponentPropsWithRef<'canvas'> &
  UseCanvasResponsiveOptions &
  UseDevicePixelRatioAdaptiveOptions;

export function CanvasResponsive(props: CanvasResponsiveProps) {
  const {
    frameRate,
    onResize,
    ref,
    className,
    devicePixelRatio,
    resolutionMode = 'auto',
    ...rest
  } = props;

  const { adaptiveDevicePixelRatio } = useDevicePixelRatioAdaptive({ resolutionMode });

  const { canvasRef } = useCanvasResponsive({
    frameRate,
    onResize,
    devicePixelRatio: devicePixelRatio ?? adaptiveDevicePixelRatio,
  });

  const mergedRef = useComposedRefs(ref, canvasRef);

  return (
    <canvas
      className={cn('w-full max-w-full object-contain', className)}
      ref={mergedRef}
      {...rest}
    />
  );
}
