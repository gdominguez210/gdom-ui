import { ComponentPropsWithRef, MouseEventHandler } from 'react';
import { UseAudioWaveformProgressHandlersOptions } from './useAudioWaveformProgressHandlers';
import { UseAudioWaveformProgressColorOptions } from './useAudioWaveformProgressColor';
import { UseAnimationFrameOptions } from '../useAnimationFrame/useAnimationFrame';
import { UseAudioWaveformEnvelopeRectanglesOptions } from '../AudioWaveformEnvelopeRectangles/useAudioWaveformEnvelopeRectangles';
import { UseKeyboardMediaSeekOptions } from '../useKeyboardMediaSeek/useKeyboardMediaSeek';
export type UseAudioWaveformProgressOptions = UseAudioWaveformProgressHandlersOptions & Omit<UseAudioWaveformProgressColorOptions, 'dimensionsRef' | 'hoverPositionRef' | 'getIsHovering'> & Omit<UseAudioWaveformEnvelopeRectanglesOptions, 'color'> & Omit<UseAnimationFrameOptions, 'callback'> & Omit<UseKeyboardMediaSeekOptions, 'mediaRef'> & Pick<ComponentPropsWithRef<'canvas'>, 'onClick' | 'onMouseEnter' | 'onMouseMove' | 'onMouseLeave'>;
export declare function useAudioWaveformProgress(props: UseAudioWaveformProgressOptions): {
    canvasRef: import('react').RefCallback<Element>;
    a11yProps: {
        tabIndex: number;
        role: string;
        'aria-label': string;
        'aria-valuemin': number;
        'aria-valuemax': number;
        'aria-valuenow': number;
        'aria-valuetext'?: string;
    };
    handleKeyDown: (event: import('react').KeyboardEvent<HTMLElement>) => void;
    handleKeyUp: (event: import('react').KeyboardEvent<HTMLElement>) => void;
    handleClick: MouseEventHandler<HTMLCanvasElement>;
    handleMouseEnter: MouseEventHandler<HTMLCanvasElement>;
    handleMouseMove: MouseEventHandler<HTMLCanvasElement>;
    handleMouseOut: MouseEventHandler<HTMLCanvasElement>;
    handleResize: () => void;
};
