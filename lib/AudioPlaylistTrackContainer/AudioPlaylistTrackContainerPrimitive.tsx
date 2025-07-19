import { cn } from '@/utils/cn';
import type { PolymorphicProps, PolymorphicComponent } from '@/types/helpers';

export type AudioPlaylistTrackContainerPrimitivePropsInternal = {
  active?: boolean;
};

/**
 * Props for the audio playlist track primitive component
 */
export type AudioPlaylistTrackContainerPrimitiveProps = PolymorphicProps<
  'li',
  AudioPlaylistTrackContainerPrimitivePropsInternal
>;

/**
 * Primitive component for rendering a single playlist track item
 */
const _AudioPlaylistTrackContainerPrimitive = (
  props: PolymorphicProps<'li', AudioPlaylistTrackContainerPrimitivePropsInternal>,
) => {
  const { active, as: Element = 'li', children, className, ...restProps } = props;

  return (
    <Element
      tabIndex={0}
      role="button"
      aria-current={active ? 'true' : 'false'}
      className={cn(
        'flex',
        'cursor-pointer',
        'items-center',
        'gap-3',
        'rounded-md',
        'p-2',
        'transition-colors',
        'duration-200',
        'focus-within:outline-white',
        {
          'bg-black/50': active,
          'hover:bg-black/30': !active,
          'focus-visible:bg-black/30': !active,
        },
        className,
      )}
      {...restProps}
    >
      {children}
    </Element>
  );
};

_AudioPlaylistTrackContainerPrimitive.displayName = 'AudioPlaylistTrackContainerPrimitive';

export const AudioPlaylistTrackContainerPrimitive =
  _AudioPlaylistTrackContainerPrimitive as PolymorphicComponent<
    'li',
    AudioPlaylistTrackContainerPrimitivePropsInternal
  >;
