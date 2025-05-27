import { ComponentPropsWithRef } from 'react';
import { useAudioProgressWaveformColorOptions } from './useAudioProgressWaveformColor';
import { useAudioProgressWaveformOptions } from './useAudioProgressWaveform';
import { useAudioWaveformOptions } from '../AudioWaveform/useAudioWaveform';
import { useAnimationFrameOptions } from '../useAnimationFrame/useAnimationFrame';
import { UseKeyboardMediaSeekOptions } from '../useKeyboardMediaSeek/useKeyboardMediaSeek';
export type AudioProgressWaveformProps = Omit<useAudioWaveformOptions, 'getBarColor'> & Omit<useAudioProgressWaveformColorOptions, 'dimensionsRef' | 'hoverPositionRef' | 'getIsHovering'> & Omit<useAnimationFrameOptions, 'callback'> & ComponentPropsWithRef<'canvas'> & useAudioProgressWaveformOptions & Omit<UseKeyboardMediaSeekOptions, 'mediaRef'>;
export declare function AudioProgressWaveform(props: AudioProgressWaveformProps): import("react/jsx-runtime").JSX.Element;
