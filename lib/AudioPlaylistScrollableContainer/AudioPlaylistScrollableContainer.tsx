import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';
import type { ElementType } from 'react';

type AudioPlaylistScrollableContainerPropsInternal = {
  maxHeight?: string;
};

/**
 * Props for the audio playlist scrollable container component
 */
export type AudioPlaylistScrollableContainerProps<T extends ElementType = 'div'> = PolymorphicProps<
  T,
  AudioPlaylistScrollableContainerPropsInternal
>;

/**
 * A scrollable container component for audio playlist elements
 * Provides consistent custom scrollbar styling across browsers
 */
const _AudioPlaylistScrollableContainer = (
  props: PolymorphicProps<'div', AudioPlaylistScrollableContainerPropsInternal>,
) => {
  const {
    as: Element = 'div',
    children,
    className,
    maxHeight = '300px',
    style,
    ...restProps
  } = props;

  return (
    <Element
      className={cn(
        'overflow-y-auto',
        'scrollbar-thin',
        'scrollbar-thumb-slate-400/30',
        'scrollbar-track-slate-800/20',
        'hover:scrollbar-thumb-slate-400/50',
        'scrollbar-thumb-rounded-none',
        className,
      )}
      style={{
        maxHeight,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlaylistScrollableContainer.displayName = 'AudioPlaylistScrollableContainer';

export const AudioPlaylistScrollableContainer =
  _AudioPlaylistScrollableContainer as PolymorphicComponent<
    'div',
    AudioPlaylistScrollableContainerPropsInternal
  >;
