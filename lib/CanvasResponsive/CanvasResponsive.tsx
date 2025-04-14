import type { ComponentPropsWithRef } from 'react';
import { useCanvasResponsive } from './useCanvasResponsive';
import { useComposedRefs } from '@lib/useComposedRefs/useComposedRefs';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export type CanvasResponsiveProps = ComponentPropsWithRef<'canvas'> & {
  frameRate?: number;
};

export function CanvasResponsive(props: CanvasResponsiveProps) {
  const { frameRate, ref, className, ...rest } = props;

  const canvasRef = useCanvasResponsive({ frameRate });

  const mergedRef = useComposedRefs(ref, canvasRef);

  return (
    <canvas
      className={twMerge(clsx('w-full max-w-full object-contain', className))}
      ref={mergedRef}
      {...rest}
    />
  );
}
