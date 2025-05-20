import type { ComponentPropsWithRef } from 'react';
import { useCanvasResponsive } from './useCanvasResponsive';
import { useComposedRefs } from '@/lib/useComposedRefs/useComposedRefs';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type CanvasResponsiveProps = ComponentPropsWithRef<'canvas'> & {
  frameRate?: number;
  onResize?: () => void;
};

export function CanvasResponsive(props: CanvasResponsiveProps) {
  const { frameRate, onResize, ref, className, ...rest } = props;

  const { canvasRef } = useCanvasResponsive({ frameRate, onResize });

  const mergedRef = useComposedRefs(ref, canvasRef);

  return (
    <canvas
      className={twMerge(clsx('w-full max-w-full object-contain', className))}
      ref={mergedRef}
      {...rest}
    />
  );
}
