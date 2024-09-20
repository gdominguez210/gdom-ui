import {
  useState,
  useEffect,
  useCallback,
  type HTMLAttributes,
  type MouseEventHandler,
  type ElementType,
  type ChangeEventHandler,
} from 'react';
import { Icon } from '@lib/Icon';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAudioPlayerContext } from '@lib/AudioPlayerContextProvider';

export interface AudioPlayerVolumeProps extends HTMLAttributes<HTMLElement> {
  /** @default div */
  as?: ElementType;
}

export function AudioPlayerVolume(props: AudioPlayerVolumeProps) {
  const { as = 'div', className, ...restProps } = props;
  const { audioRef } = useAudioPlayerContext();

  const [volume, setVolume] = useState<number>(60);
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
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = mute;
    }
  }, [volume, audioRef, mute]);

  const showMuteIcon = mute || volume < 5;
  const showVolume = !mute && volume >= 5 && volume < 40;
  const showVolumeMax = !mute && volume >= 40;

  const Node = as;

  return (
    <Node
      className={twMerge(clsx('flex items-center gap-3', className))}
      {...restProps}
    >
      <button
        onClick={handleMute}
        className="text-2xl"
      >
        {showMuteIcon && <Icon name="volume-mute-fill" />}
        {showVolume && <Icon name="volume-down-fill" />}
        {showVolumeMax && <Icon name="volume-up-fill" />}
      </button>
      <input
        className="cursor-pointer flex-grow"
        type="range"
        min={0}
        max={100}
        value={volume}
        onChange={handleVolumeChange}
      />
    </Node>
  );
}
