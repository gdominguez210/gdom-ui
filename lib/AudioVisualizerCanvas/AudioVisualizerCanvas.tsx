import {
  CanvasResponsive,
  type CanvasResponsiveProps,
} from '@lib/CanvasResponsive/CanvasResponsive';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
export type AudioVisualizerCanvasProps = CanvasResponsiveProps;

export const AudioVisualizerCanvas = (props: AudioVisualizerCanvasProps) => {
  const { className, ...restProps } = props;

  return (
    <CanvasResponsive
      className={twMerge(
        clsx(
          'relative bg-radial from-slate-800 from-0% to-slate-950 to-90% before:absolute before:inset-0 before:bg-radial before:from-white before:to-transparent before:bg-[size:1px_1px] before:content-[""]',
          className,
        ),
      )}
      {...restProps}
    />
  );
};
