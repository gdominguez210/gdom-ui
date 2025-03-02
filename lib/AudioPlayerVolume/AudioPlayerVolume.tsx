import { type ChangeEventHandler, type ComponentPropsWithoutRef, type ElementType } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextState } from '@lib/AudioPlayerContextProvider/useAudioPlayerContextState';
import { useAudioPlayerContextDispatch } from '@lib/AudioPlayerContextProvider/useAudioPlayerContextDispatch';
import { Icon } from '@lib/Icon';

export type AudioPlayerVolumeProps<T extends ElementType = 'div'> = {
  /** @default div */
  as?: T;
} & ComponentPropsWithoutRef<T>;

export type AudioPlayerVolumeLayoutProps<T extends ElementType> = AudioPlayerVolumeProps<T> & {
  max?: number;
  min?: number;
  value: number;
  mute: boolean;
  onMute: () => void;
  onVolumeChange: ChangeEventHandler<HTMLInputElement>;
};

function AudioPlayerVolumeLayout<T extends ElementType>(props: AudioPlayerVolumeLayoutProps<T>) {
  const {
    as: Element = 'div',
    className,
    children,
    max = 100,
    min = 0,
    value,
    mute,
    onMute,
    onVolumeChange,
    ...restProps
  } = props;

  return (
    <Element
      className={twMerge(clsx('flex items-center gap-3', className))}
      {...restProps}
    >
      <button
        onClick={onMute}
        className="text-2xl"
        aria-label={mute ? 'Unmute' : 'Mute'}
        aria-pressed={mute}
      >
        {children}
      </button>
      <input
        className="flex-grow cursor-pointer"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onVolumeChange}
        aria-label="Volume control"
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`Volume ${value}%`}
      />
    </Element>
  );
}

export function AudioPlayerVolume<T extends ElementType>(props: AudioPlayerVolumeProps<T>) {
  const { audioRef, volume, mute } = useAudioPlayerContextState();
  const { actions, dispatch } = useAudioPlayerContextDispatch();

  const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newVolume = Number(e.target.value);
    dispatch({ type: actions.SET_VOLUME, payload: { volume: newVolume } });
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const handleMute = () => {
    dispatch({ type: actions.SET_MUTE, payload: { mute: 'toggle' } });
    if (audioRef.current) {
      audioRef.current.muted = !mute;
    }
  };

  return (
    <AudioPlayerVolumeLayout
      {...props}
      value={volume}
      mute={mute}
      onMute={handleMute}
      onVolumeChange={handleVolumeChange}
    >
      {mute || volume < 5 ? (
        <Icon name="volume-mute-fill" />
      ) : volume >= 40 ? (
        <Icon name="volume-up-fill" />
      ) : (
        <Icon name="volume-down-fill" />
      )}
    </AudioPlayerVolumeLayout>
  );
}
