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

export interface AudioPlayerControlPlayPrimitiveProps extends ComponentPropsWithRef<'button'> {
  active?: boolean;
}

export function AudioPlayerControlPlayPrimitive(props: AudioPlayerControlPlayPrimitiveProps) {
  const { active = false, ...restProps } = props;

  return (
    <button
      {...restProps}
      aria-label={active ? 'Pause' : 'Play'}
      aria-pressed={active}
    >
      <Icon name={active ? 'pause-large-fill' : 'play-large-fill'} />
    </button>
  );
}

export function AudioPlayerControlPlay(
  props: Omit<AudioPlayerControlPlayPrimitiveProps, 'active'>,
) {
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
