import {
  type MouseEventHandler,
  type RefObject,
  type ComponentPropsWithRef,
  useCallback,
} from 'react';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';
import { useAudioPlayerNextTrack } from './useAudioPlayerNextTrack';
import { Icon } from '@lib/Icon/Icon';
import { AudioPlayerControlButton } from '@lib/AudioPlayerControlButton';
/**
 * Base button component for next track navigation
 */
export function AudioPlayerControlNextPrimitive(props: AudioPlayerControlNextProps) {
  return (
    <AudioPlayerControlButton
      aria-label="Next Track"
      {...props}
    >
      <Icon
        name="forward-end-fill"
        className="scale-90"
      />
    </AudioPlayerControlButton>
  );
}

/**
 * Props for the next track control button
 */
export type AudioPlayerControlNextProps = ComponentPropsWithRef<'button'>;

/**
 * Next track control button that integrates with the audio player context
 */
export function AudioPlayerControlNext(props: AudioPlayerControlNextProps) {
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
