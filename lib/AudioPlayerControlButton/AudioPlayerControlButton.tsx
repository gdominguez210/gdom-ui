import type { ComponentPropsWithRef } from 'react';
import { cn } from '@/utils/cn';

export type AudioPlayerControlButtonProps = ComponentPropsWithRef<'button'> & {
  active?: boolean;
};

export function AudioPlayerControlButton(props: AudioPlayerControlButtonProps) {
  const { active = false, className, children, ...restProps } = props;
  return (
    <button
      data-state={active ? 'active' : 'inactive'}
      className={cn(
        'rounded-md p-2',
        'hover:bg-black/30',
        'focus-visible:outline-white',
        'focus-visible:bg-black/30',
        className,
      )}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
}
