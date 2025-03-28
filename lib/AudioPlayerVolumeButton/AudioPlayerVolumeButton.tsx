'use client';

import { useCallback, type ComponentPropsWithRef, type MouseEventHandler } from 'react';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider/useAudioPlayerContextAudio';
import { AudioPlayerVolumeButtonPrimitive } from './AudioPlayerVolumeButtonPrimitive';

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
