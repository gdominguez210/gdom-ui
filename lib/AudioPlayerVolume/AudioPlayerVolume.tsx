import { memo, type ComponentPropsWithRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { AudioPlayerVolumeButton } from '@lib/AudioPlayerVolumeButton/AudioPlayerVolumeButton';
import { AudioPlayerVolumeSlider } from '@lib/AudioPlayerVolumeSlider/AudioPlayerVolumeSlider';

export type AudioPlayerVolumeProps<T extends ElementType = 'div'> = ComponentPropsWithRef<T> & {
  /**
   * The element to render the component as.
   * @default 'div'
   */
  as?: T;
};

function AudioPlayerVolumePrimitive<T extends ElementType = 'div'>(
  props: AudioPlayerVolumeProps<T>,
) {
  const { as: Element = 'div', className, children, ...restProps } = props;

  return (
    <Element
      className={twMerge(clsx('items-center gap-3', className))}
      {...restProps}
    >
      {children}
    </Element>
  );
}

const AudioPlayerVolumePrimitiveMemo = memo(AudioPlayerVolumePrimitive);
AudioPlayerVolumePrimitiveMemo.displayName = 'AudioPlayerVolumePrimitive';
export { AudioPlayerVolumePrimitiveMemo as AudioPlayerVolumePrimitive };

function AudioPlayerVolume<T extends ElementType = 'div'>(props: AudioPlayerVolumeProps<T>) {
  const { className, ...restProps } = props;

  return (
    <AudioPlayerVolumePrimitive
      {...(restProps as AudioPlayerVolumeProps)}
      className={twMerge(
        clsx(
          'grid grid-cols-[auto_0fr] focus-within:grid-cols-[auto_1fr] hover:grid-cols-[auto_1fr]',
          'transition-[grid-template-columns] duration-200',
          className,
        ),
      )}
    >
      <AudioPlayerVolumeButton />
      <div className="overflow-hidden">
        <AudioPlayerVolumeSlider />
      </div>
    </AudioPlayerVolumePrimitive>
  );
}

const AudioPlayerVolumeMemo = memo(AudioPlayerVolume);
AudioPlayerVolumeMemo.displayName = 'AudioPlayerVolume';
export { AudioPlayerVolumeMemo as AudioPlayerVolume };
