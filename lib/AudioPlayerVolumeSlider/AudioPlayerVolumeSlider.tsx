import { useCallback, memo, type ChangeEventHandler, type ComponentPropsWithRef } from 'react';
import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider/useAudioPlayerContextAudio';
import { useAudioPlayerContextRefs } from '@lib/AudioPlayerContextRefsProvider';

function AudioPlayerVolumeSlider(props: Omit<AudioPlayerVolumeSliderPrimitiveProps, 'value'>) {
  const { onChange, ...restProps } = props;
  const { volume, setVolume } = useAudioPlayerContextAudio();
  const { audioRef } = useAudioPlayerContextRefs();

  const handleVolumeChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newVolume = Number(e.target.value);
      setVolume(newVolume);
      onChange?.(e);
      if (audioRef.current) {
        audioRef.current.volume = newVolume / 100;
      }
    },
    [onChange, setVolume, audioRef],
  );

  return (
    <AudioPlayerVolumeSliderPrimitive
      {...restProps}
      value={volume}
      onChange={handleVolumeChange}
    />
  );
}

const AudioPlayerVolumeSliderMemo = memo(AudioPlayerVolumeSlider);
AudioPlayerVolumeSliderMemo.displayName = 'AudioPlayerVolumeSlider';
export { AudioPlayerVolumeSliderMemo as AudioPlayerVolumeSlider };

type AudioPlayerVolumeSliderPrimitiveProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
  value: number;
  min?: number;
  max?: number;
  orientation?: 'horizontal' | 'vertical';
};

function AudioPlayerVolumeSliderPrimitive(props: AudioPlayerVolumeSliderPrimitiveProps) {
  const { className, min = 0, max = 100, value, orientation = 'horizontal', ...restProps } = props;

  return (
    <input
      className={twMerge(
        clsx(
          'flex-grow cursor-pointer',
          orientation === 'vertical' && [
            '[writing-mode:bt-lr]',
            '[appearance:slider-vertical]',
            'h-32',
            'w-2',
          ],
          className,
        ),
      )}
      type="range"
      min={min}
      max={max}
      value={value}
      aria-label="Volume Control"
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`Volume ${value}%`}
      aria-orientation={orientation}
      {...restProps}
    />
  );
}

const AudioPlayerVolumeSliderPrimitiveMemo = memo(AudioPlayerVolumeSliderPrimitive);
AudioPlayerVolumeSliderPrimitiveMemo.displayName = 'AudioPlayerVolumeSliderPrimitive';
export { AudioPlayerVolumeSliderPrimitiveMemo as AudioPlayerVolumeSliderPrimitive };
