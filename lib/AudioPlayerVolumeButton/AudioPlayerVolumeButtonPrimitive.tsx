import { type ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Icon } from '@lib/Icon';
import { type VolumeIconName } from '@lib/Icon/data';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';

/**
 * Props for the volume button primitive component
 */
export type AudioPlayerVolumeButtonPrimitiveProps = {
  /** Icon name for the volume button */
  iconName: VolumeIconName;
} & ComponentPropsWithRef<'button'>;

/**
 * Base button component for volume controls
 */
export function AudioPlayerVolumeButtonPrimitive(props: AudioPlayerVolumeButtonPrimitiveProps) {
  const { iconName, title, className, ...restProps } = props;

  return (
    <AudioPlayerControlButton
      className={twMerge(clsx('text-2xl', className))}
      title={title}
      {...restProps}
    >
      <Icon name={iconName} />
    </AudioPlayerControlButton>
  );
}
