import {
  type ComponentPropsWithRef,
  type MouseEventHandler,
  type RefObject,
  useCallback,
} from 'react';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import { useAudioPlayerPreviousTrack } from './useAudioPlayerPreviousTrack';
import { Icon } from '@lib/Icon/Icon';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';

export function AudioPlayerControlPreviousPrimitive(props: ComponentPropsWithRef<'button'>) {
  return (
    <button {...props}>
      <Icon
        name="rewind-start-fill"
        className="scale-90"
      />
    </button>
  );
}

export function AudioPlayerControlPrevious(props: ComponentPropsWithRef<'button'>) {
  const { onClick, ...restProps } = props;
  const { seek } = useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack();
  const { loop, shuffle } = useAudioPlayerContextAudio();
  const { audioRef } = useAudioPlayerContextRefs();

  const { handlePreviousTrack } = useAudioPlayerPreviousTrack({
    loop,
    shuffle,
    currentTrackIndex,
    tracksLength: tracks.length,
    onTimeChange: seek,
    onTrackIndexChange: setTrackIndex,
    audioRef: audioRef as RefObject<HTMLAudioElement>,
  });

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      handlePreviousTrack();
      onClick?.(e);
    },
    [handlePreviousTrack, onClick],
  );

  return (
    <AudioPlayerControlPreviousPrimitive
      onClick={handleClick}
      {...restProps}
    />
  );
}
