import type { ComponentPropsWithRef, ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { AudioPlayerVolumeButton } from '@lib/AudioPlayerVolumeButton/AudioPlayerVolumeButton';
import { AudioPlayerVolumeSlider } from '@lib/AudioPlayerVolumeSlider/AudioPlayerVolumeSlider';

/**
 * Props for the volume control component
 */
export type AudioPlayerVolumeProps<T extends ElementType = 'div'> = ComponentPropsWithRef<T> & {
  /** Element to render as @default div */
  as?: T;
};

/**
 * Base container component for volume controls
 */
export function AudioPlayerVolumePrimitive<T extends ElementType = 'div'>(
  props: AudioPlayerVolumeProps<T>,
) {
  const { as: Element = 'div', className, children, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('flex items-center gap-2', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

/**
 * Volume control with button and slider
 */
export function AudioPlayerVolume<T extends ElementType = 'div'>(props: AudioPlayerVolumeProps<T>) {
  return (
    <AudioPlayerVolumePrimitive {...props}>
      <AudioPlayerVolumeButton />
      <AudioPlayerVolumeSlider />
    </AudioPlayerVolumePrimitive>
  );
}
