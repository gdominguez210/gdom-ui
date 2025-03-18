import {
  type ComponentPropsWithRef,
  type MouseEventHandler,
  type RefObject,
  useCallback,
  memo,
} from 'react';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import { useAudioPlayerPreviousTrack } from './useAudioPlayerPreviousTrack';
import { Icon } from '@lib/Icon/Icon';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';

function AudioPlayerControlPreviousPrimitive(props: AudioPlayerControlPreviousProps) {
  return (
    <button
      aria-label="Previous Track"
      {...props}
    >
      <Icon
        name="rewind-start-fill"
        className="scale-90"
      />
    </button>
  );
}

const AudioPlayerControlPreviousPrimitiveMemo = memo(AudioPlayerControlPreviousPrimitive);
AudioPlayerControlPreviousPrimitiveMemo.displayName = 'AudioPlayerControlPreviousPrimitive';
export { AudioPlayerControlPreviousPrimitiveMemo as AudioPlayerControlPreviousPrimitive };

export type AudioPlayerControlPreviousProps = ComponentPropsWithRef<'button'>;

function AudioPlayerControlPrevious(props: AudioPlayerControlPreviousProps) {
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

const AudioPlayerControlPreviousMemo = memo(AudioPlayerControlPrevious);
AudioPlayerControlPreviousMemo.displayName = 'AudioPlayerControlPrevious';
export { AudioPlayerControlPreviousMemo as AudioPlayerControlPrevious };
