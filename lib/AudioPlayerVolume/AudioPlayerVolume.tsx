import {
  useState,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type MouseEventHandler,
  type ElementType,
  type ChangeEventHandler,
  type RefObject,
} from 'react';
import { Icon } from '@lib/Icon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';

export interface AudioPlayerVolumeProps extends HTMLAttributes<HTMLElement> {
  /** @default div */
  as?: ElementType;
}

interface AudioPlayerVolumeLayoutProps extends AudioPlayerVolumeProps {
  value: number;
}

function AudioPlayerVolumeLayout(props: AudioPlayerVolumeLayoutProps) {
  const { as = 'div', className, children, onChange, onClick, value, ...restProps } = props;

  const Node = as;

  return (
    <Node
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
        min="0"
        max="100"
        value={value}
        onChange={onChange}
      />
    </Node>
  );
}

interface useAudioPlayerVolumeProps {
  ref: RefObject<HTMLAudioElement>;
}

function useAudioPlayerVolume(props: useAudioPlayerVolumeProps) {
  const { ref } = props;

  const [volume, setVolume] = useState<number>(50);
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

export function AudioPlayerVolume(props: AudioPlayerVolumeProps) {
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
