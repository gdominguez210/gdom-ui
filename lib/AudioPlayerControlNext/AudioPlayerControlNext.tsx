import {
  type MouseEventHandler,
  type RefObject,
  type ComponentPropsWithRef,
  useCallback,
  memo,
} from 'react';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import { useAudioPlayerNextTrack } from './useAudioPlayerNextTrack';
import { Icon } from '@lib/Icon/Icon';

function AudioPlayerControlNextPrimitive(props: AudioPlayerControlNextProps) {
  return (
    <button
      aria-label="Next Track"
      {...props}
    >
      <Icon
        name="forward-end-fill"
        className="scale-90"
      />
    </button>
  );
}

const AudioPlayerControlNextPrimitiveMemo = memo(AudioPlayerControlNextPrimitive);
AudioPlayerControlNextPrimitiveMemo.displayName = 'AudioPlayerControlNextPrimitive';
export { AudioPlayerControlNextPrimitiveMemo as AudioPlayerControlNextPrimitive };

export type AudioPlayerControlNextProps = ComponentPropsWithRef<'button'>;

function AudioPlayerControlNext(props: AudioPlayerControlNextProps) {
  const { onClick, ...restProps } = props;
  const { audioRef } = useAudioPlayerContextRefs();
  const { seek } = useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack();
  const { loop, shuffle } = useAudioPlayerContextAudio();

  const { handleNextTrack } = useAudioPlayerNextTrack({
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
      handleNextTrack();
      onClick?.(e);
    },
    [handleNextTrack, onClick],
  );

  return (
    <AudioPlayerControlNextPrimitive
      onClick={handleClick}
      {...restProps}
    />
  );
}

const AudioPlayerControlNextMemo = memo(AudioPlayerControlNext);
AudioPlayerControlNextMemo.displayName = 'AudioPlayerControlNext';
export { AudioPlayerControlNextMemo as AudioPlayerControlNext };
