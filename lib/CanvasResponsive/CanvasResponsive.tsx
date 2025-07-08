import type { ComponentPropsWithRef } from 'react';
import { useCanvasResponsive, type UseCanvasResponsiveOptions } from './useCanvasResponsive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type CanvasResponsiveProps = ComponentPropsWithRef<'canvas'> & UseCanvasResponsiveOptions;

export function CanvasResponsive(props: CanvasResponsiveProps) {
  const { frameRate, onResize, ref, className, devicePixelRatio, ...rest } = props;

  const { canvasRef } = useCanvasResponsive({ frameRate, onResize, devicePixelRatio });

  const mergedRef = useComposedRefs(ref, canvasRef);

  return (
    <canvas
      className={twMerge(clsx('w-full max-w-full object-contain', className))}
      ref={mergedRef}
      {...rest}
    />
  );
}
