import { ComponentPropsWithRef } from 'react';
import { useAudioProgressWaveformColorOptions } from './useAudioProgressWaveformColor';
import { useAudioProgressWaveformOptions } from './useAudioProgressWaveform';
import { UseAudioAmplitudeBarsOptions } from '../AudioAmplitudeBars/useAudioAmplitudeBars';
import { useAnimationFrameOptions } from '../useAnimationFrame/useAnimationFrame';
import { UseKeyboardMediaSeekOptions } from '../useKeyboardMediaSeek/useKeyboardMediaSeek';
export type AudioProgressWaveformProps = Omit<UseAudioAmplitudeBarsOptions, 'getBarColor'> & Omit<useAudioProgressWaveformColorOptions, 'dimensionsRef' | 'hoverPositionRef' | 'getIsHovering'> & Omit<useAnimationFrameOptions, 'callback'> & ComponentPropsWithRef<'canvas'> & useAudioProgressWaveformOptions & Omit<UseKeyboardMediaSeekOptions, 'mediaRef'>;
export declare function AudioProgressWaveform(props: AudioProgressWaveformProps): import("react/jsx-runtime").JSX.Element;
