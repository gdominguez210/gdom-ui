import { type ComponentPropsWithRef, type MouseEventHandler, useCallback, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Icon } from '@lib/Icon';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';

export interface AudioPlayerControlShufflePrimitiveProps extends ComponentPropsWithRef<'button'> {
  active?: boolean;
}

function AudioPlayerControlShufflePrimitive(props: AudioPlayerControlShufflePrimitiveProps) {
  const { active = false, className, ...restProps } = props;

  return (
    <button
      className={twMerge(
        clsx({ 'text-neutral-100/50': !active }, 'hover:text-neutral-100', className),
      )}
      aria-label="Toggle Shuffle"
      aria-pressed={active}
      {...restProps}
    >
      <Icon
        name="shuffle-fill"
        className="scale-75"
      />
    </button>
  );
}

const AudioPlayerControlShufflePrimitiveMemo = memo(AudioPlayerControlShufflePrimitive);
AudioPlayerControlShufflePrimitiveMemo.displayName = 'AudioPlayerControlShufflePrimitive';
export { AudioPlayerControlShufflePrimitiveMemo as AudioPlayerControlShufflePrimitive };

export type AudioPlayerControlShuffleProps = Omit<
  AudioPlayerControlShufflePrimitiveProps,
  'active'
>;

function AudioPlayerControlShuffle(props: AudioPlayerControlShuffleProps) {
  const { onClick, ...restProps } = props;
  const { shuffle, toggleShuffle } = useAudioPlayerContextAudio();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      toggleShuffle();
      onClick?.(e);
    },
    [toggleShuffle, onClick],
  );

  return (
    <AudioPlayerControlShufflePrimitive
      active={shuffle}
      onClick={handleClick}
      {...restProps}
    />
  );
}

const AudioPlayerControlShuffleMemo = memo(AudioPlayerControlShuffle);
AudioPlayerControlShuffleMemo.displayName = 'AudioPlayerControlShuffle';
export { AudioPlayerControlShuffleMemo as AudioPlayerControlShuffle };
