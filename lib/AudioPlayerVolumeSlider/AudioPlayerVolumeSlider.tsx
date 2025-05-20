'use client';

import { useCallback, type ChangeEventHandler } from 'react';
import { useAudioPlayerContextPlayback } from '@/lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';
import { useAudioPlayerContextRefs } from '@/lib/AudioPlayerContextRefsProvider';
import {
  AudioPlayerVolumeSliderPrimitive,
  type AudioPlayerVolumeSliderPrimitiveProps,
} from './AudioPlayerVolumeSliderPrimitive';

export type AudioPlayerVolumeSliderProps = Omit<AudioPlayerVolumeSliderPrimitiveProps, 'value'>;

/**
 * Updates an HTML audio element's volume
 * This helper function avoids direct mutation of refs in component callbacks
 */
function updateAudioVolume(audio: HTMLAudioElement | null, volume: number): void {
  if (!audio) return;
  audio.volume = volume / 100;
}

/**
 * Volume slider that integrates with the audio player context
 */
export function AudioPlayerVolumeSlider(props: AudioPlayerVolumeSliderProps) {
  const { onChange, ...restProps } = props;
  const { volume, setVolume } = useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs();

  const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newVolume = Number(e.target.value);
      setVolume(newVolume);
      onChange?.(e);

      updateAudioVolume(audioRef.current, newVolume);
    },
    [onChange, setVolume, audioRef],
  );

  return (
    <AudioPlayerVolumeSliderPrimitive
      {...restProps}
      value={volume}
      onChange={handleVolumeChange}
    />
  );
}
