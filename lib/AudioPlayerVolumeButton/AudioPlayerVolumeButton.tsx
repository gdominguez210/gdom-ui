import { useCallback, type ComponentPropsWithRef, type MouseEventHandler } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Icon } from '@lib/Icon';
import { type VolumeIconName } from '@lib/Icon/data';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider/useAudioPlayerContextAudio';

const VOLUME_ICON_PROPERTIES = {
  MUTE: { name: 'volume-mute-fill', label: 'Volume Muted' },
  LOW: { name: 'volume-down-fill', label: 'Volume Low' },
  HIGH: { name: 'volume-up-fill', label: 'Volume High' },
} as const;

function getVolumeIconProperties(
  volume: number,
  isMuted: boolean,
): (typeof VOLUME_ICON_PROPERTIES)[keyof typeof VOLUME_ICON_PROPERTIES] {
  if (isMuted || volume < 5) return VOLUME_ICON_PROPERTIES.MUTE;
  if (volume >= 40) return VOLUME_ICON_PROPERTIES.HIGH;
  return VOLUME_ICON_PROPERTIES.LOW;
}

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
    <button
      className={twMerge(clsx('text-2xl', className))}
      title={title}
      {...restProps}
    >
      <Icon name={iconName} />
    </button>
  );
}

/**
 * Props for the volume control button
 */
export type AudioPlayerVolumeButtonProps = ComponentPropsWithRef<'button'>;

/**
 * Volume button that toggles mute and displays appropriate icon based on volume level
 */
export function AudioPlayerVolumeButton(props: AudioPlayerVolumeButtonProps) {
  const { onClick, ...restProps } = props;
  const { mute, volume, toggleMute } = useAudioPlayerContextAudio();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      onClick?.(e);
      toggleMute();
    },
    [onClick, toggleMute],
  );

  const { name, label } = getVolumeIconProperties(volume, mute);

  return (
    <AudioPlayerVolumeButtonPrimitive
      {...restProps}
      aria-label={mute ? 'Unmute' : 'Mute'}
      aria-pressed={mute}
      onClick={handleClick}
      iconName={name}
      title={label}
    />
  );
}
