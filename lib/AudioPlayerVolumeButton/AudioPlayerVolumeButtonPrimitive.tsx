import { type ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { type VolumeIconName } from '@lib/IconLibrary/data';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';
import { IconVolumeMuteFill } from '@lib/IconVolumeMuteFill';
import { IconVolumeDownFill } from '@lib/IconVolumeDownFill';
import { IconVolumeUpFill } from '@lib/IconVolumeUpFill';

/*
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
      {iconName === 'volume-mute-fill' && <IconVolumeMuteFill />}
      {iconName === 'volume-down-fill' && <IconVolumeDownFill />}
      {iconName === 'volume-up-fill' && <IconVolumeUpFill />}
    </AudioPlayerControlButton>
  );
}
