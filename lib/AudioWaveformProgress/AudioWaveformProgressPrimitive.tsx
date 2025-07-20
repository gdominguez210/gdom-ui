import {
  CanvasResponsive,
  type CanvasResponsiveProps,
} from '@/lib/CanvasResponsive/CanvasResponsive';
import { cn } from '@/utils/cn';

export type AudioWaveformProgressPrimitiveProps = CanvasResponsiveProps;

export function AudioWaveformProgressPrimitive(props: AudioWaveformProgressPrimitiveProps) {
  const { className, ...restProps } = props;

  return (
    <CanvasResponsive
      {...restProps}
      className={cn(
        'relative cursor-pointer bg-radial from-neutral-50 from-0% to-neutral-100 to-90% before:absolute before:inset-0 before:bg-radial before:from-white before:to-transparent before:bg-[size:1px_1px] before:content-[""]',
        className,
      )}
    />
  );
}
