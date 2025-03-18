import {
  type ComponentPropsWithRef,
  type MouseEventHandler,
  type RefObject,
  useCallback,
  memo,
} from 'react';
import { Icon } from '@lib/Icon';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import { useAudioPlayerControlPlay } from './useAudioPlayerControlPlay';

export interface AudioPlayerControlPlayPrimitiveProps extends ComponentPropsWithRef<'button'> {
  active?: boolean;
}

function AudioPlayerControlPlayPrimitive(props: AudioPlayerControlPlayPrimitiveProps) {
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

const AudioPlayerControlPlayPrimitiveMemo = memo(AudioPlayerControlPlayPrimitive);
AudioPlayerControlPlayPrimitiveMemo.displayName = 'AudioPlayerControlPlayPrimitive';
export { AudioPlayerControlPlayPrimitiveMemo as AudioPlayerControlPlayPrimitive };

export type AudioPlayerControlPlayProps = Omit<AudioPlayerControlPlayPrimitiveProps, 'active'>;

function AudioPlayerControlPlay(props: AudioPlayerControlPlayProps) {
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

const AudioPlayerControlPlayMemo = memo(AudioPlayerControlPlay);
AudioPlayerControlPlayMemo.displayName = 'AudioPlayerControlPlay';
export { AudioPlayerControlPlayMemo as AudioPlayerControlPlay };
