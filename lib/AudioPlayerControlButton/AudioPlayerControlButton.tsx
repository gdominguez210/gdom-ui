import { clsx } from 'clsx';
import { type ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';

export type AudioPlayerControlButtonProps = ComponentPropsWithRef<'button'> & {
  active?: boolean;
};

export function AudioPlayerControlButton(props: AudioPlayerControlButtonProps) {
  const { active = false, className, children, ...restProps } = props;
  return (
    <button
      className={twMerge(
        clsx(
          'rounded-md p-2 focus-within:outline-white hover:bg-black/30 focus:bg-black/30',
          active && 'bg-black/30',
          className,
        ),
      )}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
}
