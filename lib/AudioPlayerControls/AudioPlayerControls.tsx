import type { ComponentPropsWithRef, ElementType, PropsWithChildren, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerTrackControls } from '@lib/AudioPlayerControls/useAudioPlayerTrackControls';
import { Icon } from '@lib/Icon/Icon';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider/useAudioPlayerContextRefs';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider/useAudioPlayerContextAudio';
import { useAudioPlayerMetadata } from '@lib/AudioPlayerControls/useAudioPlayerMetadata';
import { useAudioPlayerContextTime } from '@lib/AudioPlayerContextTimeProvider/useAudioPlayerContextTime';

export type AudioPlayerControlsProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
} & ComponentPropsWithRef<T>;

export function AudioPlayerControlsPrimitive<T extends ElementType>(
  props: AudioPlayerControlsProps<T>,
) {
  const { as: Element = 'div', children, className, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('flex items-center justify-center gap-4 p-4 text-2xl', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

export interface AudioPlayerControlsButtonProps extends ComponentPropsWithRef<'button'> {
  active?: boolean;
}

export function AudioPlayerControlsButtonPlay(props: AudioPlayerControlsButtonProps) {
  const { active = false, ...restProps } = props;

  return (
    <button
      {...restProps}
      aria-label={active ? 'Pause' : 'Play'}
      aria-pressed={active}
    >
      {active ? <Icon name="pause-large-fill" /> : <Icon name="play-large-fill" />}
    </button>
  );
}

export function AudioPlayerControlsButtonLoop(props: AudioPlayerControlsButtonProps) {
  const { active = false, className, ...restProps } = props;

  return (
    <button
      className={twMerge(
        clsx({ 'text-neutral-100/50': !active }, 'hover:text-neutral-100', className),
      )}
      aria-label="Toggle Loop"
      aria-pressed={active}
      {...restProps}
    >
      {active ? (
        <Icon
          name="repeat-one-fill"
          className="scale-75"
        />
      ) : (
        <Icon
          name="repeat-2-fill"
          className="scale-75"
        />
      )}
    </button>
  );
}

export function AudioPlayerControlsButtonShuffle(props: AudioPlayerControlsButtonProps) {
  const { active = false, className, ...restProps } = props;

  return (
    <button
      className={twMerge(
        clsx({ 'text-neutral-100/50': !active }, 'hover:text-neutral-100', className),
      )}
      {...restProps}
    >
      <Icon
        name="shuffle-fill"
        className="scale-75"
      />
    </button>
  );
}

export function AudioPlayerControlsButtonPrevious(props: ComponentPropsWithRef<'button'>) {
  return (
    <button {...props}>
      <Icon
        name="rewind-start-fill"
        className="scale-90"
      />
    </button>
  );
}

export function AudioPlayerControlsButtonNext(props: ComponentPropsWithRef<'button'>) {
  return (
    <button {...props}>
      <Icon
        name="forward-end-fill"
        className="scale-90"
      />
    </button>
  );
}

export function AudioPlayerTrackControls(props: PropsWithChildren) {
  const { children } = props;
  const { audioRef } = useAudioPlayerContextRefs();
  const { seek } = useAudioPlayerContextTime();
  const { currentTrackIndex, tracks, setTrackIndex } = useAudioPlayerContextTrack();
  const { isPlaying, loop, shuffle } = useAudioPlayerContextAudio();

  const { handlePrevTrack, handleNextTrack } = useAudioPlayerTrackControls({
    isPlaying,
    loop,
    shuffle,
    currentTrackIndex,
    tracksLength: tracks.length,
    onTimeChange: seek,
    onTrackIndexChange: setTrackIndex,
    audioRef: audioRef as RefObject<HTMLAudioElement>,
  });

  return (
    <>
      <AudioPlayerControlsButtonPrevious onClick={handlePrevTrack} />
      {children}
      <AudioPlayerControlsButtonNext onClick={handleNextTrack} />
    </>
  );
}

export function AudioPlayerAudio(props: ComponentPropsWithRef<'audio'>) {
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs();
  const { setDuration } = useAudioPlayerContextTime();
  const { currentTrack } = useAudioPlayerContextTrack();

  const { handleLoadedMetadata } = useAudioPlayerMetadata({
    audioRef: audioRef as RefObject<HTMLAudioElement>,
    progressBarRef: progressBarRef as RefObject<HTMLInputElement>,
    onDurationChange: setDuration,
  });

  return (
    <audio
      ref={audioRef}
      src={currentTrack?.src}
      onLoadedMetadata={handleLoadedMetadata}
      {...props}
    />
  );
}

export function AudioPlayerControls(props: AudioPlayerControlsProps) {
  const { isPlaying, loop, shuffle, togglePlay, toggleLoop, toggleShuffle } =
    useAudioPlayerContextAudio();

  return (
    <AudioPlayerControlsPrimitive {...props}>
      <AudioPlayerAudio />
      <AudioPlayerControlsButtonLoop
        active={loop}
        onClick={toggleLoop}
      />
      <AudioPlayerTrackControls>
        <AudioPlayerControlsButtonPlay
          active={isPlaying}
          onClick={togglePlay}
        />
      </AudioPlayerTrackControls>
      <AudioPlayerControlsButtonShuffle
        active={shuffle}
        onClick={toggleShuffle}
      />
    </AudioPlayerControlsPrimitive>
  );
}
