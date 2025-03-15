import { type ComponentPropsWithRef, type MouseEventHandler, useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { Icon } from '@lib/Icon';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider';

export interface AudioPlayerControlLoopPrimitiveProps extends ComponentPropsWithRef<'button'> {
  active?: boolean;
}

export function AudioPlayerControlLoopPrimitive(props: AudioPlayerControlLoopPrimitiveProps) {
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
      <Icon
        name={active ? 'repeat-one-fill' : 'repeat-2-fill'}
        className="scale-75"
      />
    </button>
  );
}

export function AudioPlayerControlLoop(
  props: Omit<AudioPlayerControlLoopPrimitiveProps, 'active'>,
) {
  const { onClick, ...restProps } = props;
  const { loop, toggleLoop } = useAudioPlayerContextAudio();

  const handleClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      toggleLoop();
      onClick?.(e);
    },
    [toggleLoop, onClick],
  );

  return (
    <AudioPlayerControlLoopPrimitive
      active={loop}
      onClick={handleClick}
      {...restProps}
    />
  );
}
