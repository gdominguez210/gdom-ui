import clsx from 'clsx';
import {
  type ChangeEventHandler,
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEventHandler,
  type RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';

import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider/useAudioPlayerContext';
import { Icon } from '@lib/Icon';

export type AudioPlayerVolumeProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & ComponentPropsWithoutRef<T>;

export type AudioPlayerVolumeLayoutProps<T extends ElementType> = AudioPlayerVolumeProps<T> & {
  max?: number;
  min?: number;
  value: number;
};

function AudioPlayerVolumeLayout<T extends ElementType>(props: AudioPlayerVolumeLayoutProps<T>) {
  const {
    as: Element = 'div',
    className,
    children,
    max = 100,
    min = 0,
    onChange,
    onClick,
    value,
    ...restProps
  } = props;

  return (
    <Element
      className={twMerge(clsx('flex items-center gap-3', className))}
      {...restProps}
    >
      <button
        onClick={onClick}
        className="text-2xl"
      >
        {children}
      </button>
      <input
        className="cursor-pointer flex-grow"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />
    </Element>
  );
}

interface useAudioPlayerVolumeProps {
  defaultVolume?: number;
  ref: RefObject<HTMLAudioElement>;
}

function useAudioPlayerVolume(props: useAudioPlayerVolumeProps) {
  const { ref, defaultVolume = 50 } = props;

  const [volume, setVolume] = useState(defaultVolume);
  const [mute, setMute] = useState(false);

  const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setVolume(Number(e.target.value));
    },
    [setVolume],
  );

  const handleMute: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setMute((prev) => !prev);
  }, [setMute]);

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume / 100;
      ref.current.muted = mute;
    }
  }, [volume, ref, mute]);

  return { handleVolumeChange, handleMute, volume, mute };
}

export function AudioPlayerVolume<T extends ElementType>(props: AudioPlayerVolumeProps<T>) {
  const { audioRef } = useAudioPlayerContext();

  const { handleMute, handleVolumeChange, mute, volume } = useAudioPlayerVolume({ ref: audioRef });

  if (mute || volume < 5) {
    return (
      <AudioPlayerVolumeLayout
        {...props}
        onClick={handleMute}
        onChange={handleVolumeChange}
        value={volume}
      >
        <Icon name="volume-mute-fill" />
      </AudioPlayerVolumeLayout>
    );
  }

  if (volume >= 40) {
    return (
      <AudioPlayerVolumeLayout
        {...props}
        onClick={handleMute}
        onChange={handleVolumeChange}
        value={volume}
      >
        <Icon name="volume-up-fill" />
      </AudioPlayerVolumeLayout>
    );
  }

  return (
    <AudioPlayerVolumeLayout
      {...props}
      onClick={handleMute}
      onChange={handleVolumeChange}
      value={volume}
    >
      <Icon name="volume-down-fill" />
    </AudioPlayerVolumeLayout>
  );
}
