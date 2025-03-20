import {
  type ComponentPropsWithRef,
  type MouseEventHandler,
  type RefObject,
  useCallback,
} from 'react';
import { Icon } from '@lib/Icon';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import { useAudioPlayerControlPlay } from './useAudioPlayerControlPlay';

/**
 * Props for the play/pause button primitive component
 */
export interface AudioPlayerControlPlayPrimitiveProps extends ComponentPropsWithRef<'button'> {
  /** Whether the audio is currently playing */
  active?: boolean;
}

/**
 * Button component that toggles between play and pause icons
 */
export function AudioPlayerControlPlayPrimitive(props: AudioPlayerControlPlayPrimitiveProps) {
  const { active = false, ...restProps } = props;

  return (
    <button
      aria-label={active ? 'Pause' : 'Play'}
      aria-pressed={active}
      {...restProps}
    >
      <Icon name={active ? 'pause-large-fill' : 'play-large-fill'} />
    </button>
  );
}

/**
 * Props for the play/pause control component
 */
export type AudioPlayerControlPlayProps = Omit<AudioPlayerControlPlayPrimitiveProps, 'active'>;

/**
 * Play/pause control component that integrates with the audio player context
 */
export function AudioPlayerControlPlay(props: AudioPlayerControlPlayProps) {
  const { onClick, ...restProps } = props;
  const { isPlaying, togglePlay } = useAudioPlayerContextAudio();
  const { audioRef } = useAudioPlayerContextRefs();
  const { currentTrackIndex } = useAudioPlayerContextTrack();

  useAudioPlayerControlPlay({
    isPlaying,
    audioRef: audioRef as RefObject<HTMLAudioElement>,
    currentTrackIndex,
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      togglePlay();
      onClick?.(e);
    },
    [togglePlay, onClick],
  );

  return (
    <AudioPlayerControlPlayPrimitive
      active={isPlaying}
      onClick={handleClick}
      {...restProps}
    />
  );
}
