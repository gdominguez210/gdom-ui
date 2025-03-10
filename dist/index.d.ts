import { AudioPlayerContextStateType as AudioPlayerContextStateType_2 } from './AudioPlayerContextProvider';
import { ChangeEventHandler } from 'react';
import { ComponentPropsWithRef } from 'react';
import { Context } from 'react';
import { Dispatch } from 'react';
import { ElementType } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { MouseEventHandler } from 'react';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';
import { RefObject } from 'react';
import { SVGAttributes } from 'react';
import { SVGProps } from 'react';

declare type ActionPayloads = {
    [AUDIO_PLAYER_ACTIONS.SET_CURRENT_TRACK_INDEX]: {
        currentTrackIndex: number;
    };
    [AUDIO_PLAYER_ACTIONS.SET_CURRENT_TIME]: {
        currentTime: number;
    };
    [AUDIO_PLAYER_ACTIONS.SET_DURATION]: {
        duration: number;
    };
    [AUDIO_PLAYER_ACTIONS.SET_IS_PLAYING]: {
        isPlaying: boolean | 'toggle';
    };
    [AUDIO_PLAYER_ACTIONS.SET_VOLUME]: {
        volume: number;
    };
    [AUDIO_PLAYER_ACTIONS.SET_MUTE]: {
        mute: boolean | 'toggle';
    };
};

declare const AUDIO_PLAYER_ACTIONS: {
    readonly SET_CURRENT_TRACK_INDEX: "SET_CURRENT_TRACK_INDEX";
    readonly SET_CURRENT_TIME: "SET_CURRENT_TIME";
    readonly SET_DURATION: "SET_DURATION";
    readonly SET_IS_PLAYING: "SET_IS_PLAYING";
    readonly SET_VOLUME: "SET_VOLUME";
    readonly SET_MUTE: "SET_MUTE";
};

export declare function AudioPlayer<T extends ElementType = 'div'>(props: AudioPlayerProps<T>): JSX.Element;

export declare namespace AudioPlayer {
    var Author: typeof AudioPlayerAuthor;
    var Controls: typeof AudioPlayerControls;
    var Image: typeof AudioPlayerImage;
    var Info: typeof AudioPlayerInfo;
    var ProgressBar: typeof AudioPlayerProgressBar;
    var Time: typeof AudioPlayerTime;
    var Title: typeof AudioPlayerTitle;
    var Volume: typeof AudioPlayerVolume;
}

export declare function AudioPlayerAuthor<T extends ElementType>(props: AudioPlayerAuthorProps<T>): JSX.Element | null;

export declare function AudioPlayerAuthorBase<T extends ElementType>(props: AudioPlayerAuthorProps<T>): JSX.Element;

export declare type AudioPlayerAuthorProps<T extends ElementType = 'p'> = {
    /** @default p */
    as?: T;
} & ComponentPropsWithRef<T>;

export declare function AudioPlayerBase<T extends ElementType>(props: AudioPlayerBaseProps<T>): JSX.Element;

export declare type AudioPlayerBaseProps<T extends ElementType = 'div'> = {
    /** @default div */
    as?: T;
} & ComponentPropsWithRef<T>;

export declare const AudioPlayerContextDispatch: Context<AudioPlayerContextDispatchType | undefined>;

export declare interface AudioPlayerContextDispatchType {
    dispatch: Dispatch<ReducerAction>;
    actions: typeof AUDIO_PLAYER_ACTIONS;
}

export declare function AudioPlayerContextProvider({ children, defaultTrackIndex, tracks, defaultVolume, }: AudioPlayerContextProviderProps): JSX.Element;

export declare interface AudioPlayerContextProviderProps {
    /** @default 0 */
    defaultTrackIndex?: number;
    children: ReactNode;
    tracks: AudioTrackData[];
    defaultVolume?: number;
}

export declare const AudioPlayerContextState: Context<AudioPlayerContextStateType | undefined>;

export declare interface AudioPlayerContextStateType extends State {
    audioRef: RefObject<HTMLAudioElement | null>;
    currentTrack: AudioTrackData | undefined;
    progressBarRef: RefObject<HTMLInputElement | null>;
    tracks: AudioTrackData[];
    containerRef: RefObject<HTMLElement | null>;
}

export declare function AudioPlayerControls(props: AudioPlayerControlsProps): JSX.Element;

export declare function AudioPlayerControlsBase<T extends ElementType>(props: AudioPlayerControlsProps<T>): JSX.Element;

export declare function AudioPlayerControlsButtonLoop(props: AudioPlayerControlsButtonProps): JSX.Element;

export declare function AudioPlayerControlsButtonNext(props: ComponentPropsWithRef<'button'>): JSX.Element;

export declare function AudioPlayerControlsButtonPlay(props: AudioPlayerControlsButtonProps): JSX.Element;

export declare function AudioPlayerControlsButtonPrevious(props: ComponentPropsWithRef<'button'>): JSX.Element;

export declare interface AudioPlayerControlsButtonProps extends ComponentPropsWithRef<'button'> {
    active?: boolean;
}

export declare function AudioPlayerControlsButtonShuffle(props: AudioPlayerControlsButtonProps): JSX.Element;

export declare type AudioPlayerControlsProps<T extends ElementType = 'div'> = {
    /** @default div */
    as?: T;
} & ComponentPropsWithRef<T>;

export declare function AudioPlayerImage(props: AudioPlayerImageProps): JSX.Element;

export declare function AudioPlayerImageBase(props: AudioPlayerImageBaseProps): JSX.Element;

export declare type AudioPlayerImageBaseProps<T extends ElementType = 'div'> = {
    /** @default div */
    as?: T;
    /** @default '' */
    altText: string;
    /** @default 96 */
    width?: number;
    /** @default 96 */
    height?: number;
    src?: string;
} & ComponentPropsWithRef<T>;

export declare interface AudioPlayerImageProps extends Omit<AudioPlayerImageBaseProps, 'src' | 'altText'> {
    /** @default `${title} thumbnail` */
    altText?: string;
}

export declare function AudioPlayerInfo<T extends ElementType>(props: AudioPlayerInfoProps<T>): JSX.Element;

export declare type AudioPlayerInfoProps<T extends ElementType = 'div'> = {
    /** @default div */
    as?: T;
} & ComponentPropsWithRef<T>;

export declare function AudioPlayerProgressBar(props: AudioPlayerProgressBarProps): JSX.Element;

export declare function AudioPlayerProgressBarBase(props: AudioPlayerProgressBarProps): JSX.Element;

export declare type AudioPlayerProgressBarProps = ComponentPropsWithRef<'input'>;

export declare type AudioPlayerProps<T extends ElementType = 'div'> = AudioPlayerBaseProps<T> & {
    tracks: AudioTrackData[];
    /** @default 0 */
    defaultTrackIndex?: number;
    /** @default 50 */
    defaultVolume?: number;
};

export declare function AudioPlayerTime(props: Omit<AudioPlayerTimeProps, 'currentTime' | 'duration'>): JSX.Element;

export declare function AudioPlayerTimeBase<T extends ElementType>(props: AudioPlayerTimeProps<T>): JSX.Element;

export declare type AudioPlayerTimeProps<T extends ElementType = 'span'> = {
    /** @default span */
    as?: T;
    currentTime: string;
    duration: string;
} & ComponentPropsWithRef<T>;

export declare function AudioPlayerTitle<T extends ElementType = 'p'>(props: AudioPlayerTitleProps<T>): JSX.Element | null;

export declare function AudioPlayerTitleBase<T extends ElementType>(props: AudioPlayerTitleProps<T>): JSX.Element;

export declare type AudioPlayerTitleProps<T extends ElementType = 'p'> = {
    /** @default p */
    as?: T;
} & ComponentPropsWithRef<T>;

export declare function AudioPlayerVolume<T extends ElementType>(props: AudioPlayerVolumeProps<T>): JSX.Element;

export declare type AudioPlayerVolumeLayoutProps<T extends ElementType> = AudioPlayerVolumeProps<T> & {
    max?: number;
    min?: number;
    value: number;
    mute: boolean;
    onMute: () => void;
    onVolumeChange: ChangeEventHandler<HTMLInputElement>;
};

export declare type AudioPlayerVolumeProps<T extends ElementType = 'div'> = {
    /** @default div */
    as?: T;
} & ComponentPropsWithRef<T>;

export declare interface AudioTrackData {
    title: string;
    src: string;
    author: string;
    thumbnail?: string;
}

export declare const Badge: ForwardRefExoticComponent<BadgeProps & RefAttributes<HTMLElement>>;

export declare interface BadgeProps extends HTMLAttributes<HTMLElement> {
    /** @default span */
    as?: ElementType;
    /** @default neutral */
    variant?: 'neutral' | 'danger' | 'warning' | 'success' | 'brand';
    /** @default md */
    size?: 'sm' | 'md' | 'lg';
}

export declare const Button: ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement>>;

export declare type ButtonProps = CommonButtonProps & iconButtonAccessibleProps;

declare interface CommonButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * The type of the button.
     * @default primary
     */
    variant?: Variant;
    /**
     * The size of the button.
     * @default md
     */
    size?: Size;
}

export declare function formatAudioDurationForDisplay(audioDurationInSeconds?: number): string;

export declare const Icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;

declare type iconButtonAccessibleProps = {
    /**
     * Switches to use icon button styling
     * @default false
     */
    iconOnly?: false;
    'aria-label'?: string;
} | {
    iconOnly?: true;
    'aria-label': string;
};

declare type IconName = keyof typeof icons;

export declare interface IconProps extends SVGAttributes<SVGElement> {
    name: IconName;
}

declare const icons: {
    readonly 'star-line': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'forward-end-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'pause-large-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'play-large-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'repeat-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'repeat-one-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'repeat-2-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'rewind-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'rewind-start-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'shuffle-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'speed-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'stop-large-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'volume-mute-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'volume-down-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'volume-up-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'disc-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
};

declare type ReducerAction = {
    [K in keyof ActionPayloads]: ActionPayloads[K] extends undefined ? {
        type: K;
    } : {
        type: K;
        payload: ActionPayloads[K];
    };
}[keyof ActionPayloads];

declare type Size = SizesAsTypes[number];

declare const sizes: readonly ["md", "lg", "xl", "xxl"];

declare type SizesAsTypes = typeof sizes;

declare type State = {
    currentTrackIndex: number;
    currentTime: number;
    duration: number;
    isPlaying: boolean;
    volume: number;
    mute: boolean;
};

export declare function useAudioPlayerContextDispatch(): AudioPlayerContextDispatchType;

export declare function useAudioPlayerContextState(): AudioPlayerContextStateType_2;

export declare function useAudioPlayerControls(props: useAudioPlayerControlsProps): {
    handlePrevTrack: MouseEventHandler<HTMLButtonElement>;
    handleNextTrack: () => void;
    handleLoadedMetadata: () => void;
    resetTime: () => void;
    shouldLoop: boolean;
    shouldShuffle: boolean;
    togglePlay: MouseEventHandler<HTMLButtonElement>;
    toggleShuffle: MouseEventHandler<HTMLButtonElement>;
    toggleLoop: MouseEventHandler<HTMLButtonElement>;
};

declare interface useAudioPlayerControlsProps {
    actions: AudioPlayerContextDispatchType['actions'];
    audioRef: AudioPlayerContextStateType['audioRef'];
    currentTime: number;
    currentTrack: AudioPlayerContextStateType['currentTrack'];
    currentTrackIndex: number;
    dispatch: AudioPlayerContextDispatchType['dispatch'];
    duration: number;
    isPlaying: boolean;
    progressBarRef: AudioPlayerContextStateType['progressBarRef'];
    tracks: AudioPlayerContextStateType['tracks'];
}

export declare function useAudioPlayerProgressBar({ audioRef, currentTrack, cssVariableName, duration, isPlaying, onProgressChange, progressBarRef, }: UseAudioPlayerProgressBarProps): {
    handleProgressChange: ChangeEventHandler<HTMLInputElement>;
};

declare interface UseAudioPlayerProgressBarProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    currentTrack?: {
        src: string;
    };
    cssVariableName?: string;
    duration: number;
    isPlaying: boolean;
    onProgressChange: (time: number) => void;
    progressBarRef: RefObject<HTMLInputElement | null>;
}

export declare function useAudioPlayerTime(props: Pick<AudioPlayerContextStateType, 'currentTime' | 'duration'>): {
    currentTimeDisplay: string;
    durationDisplay: string;
};

declare type Variant = VariantsAsTypes[number];

declare const variants: readonly ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"];

declare type VariantsAsTypes = typeof variants;

export { }
