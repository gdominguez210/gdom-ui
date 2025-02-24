import { ChangeEventHandler } from 'react';
import { ComponentPropsWithoutRef } from 'react';
import { Context } from 'react';
import { Dispatch } from 'react';
import { ElementType } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
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
};

declare const AUDIO_PLAYER_ACTIONS: {
    readonly SET_CURRENT_TRACK_INDEX: "SET_CURRENT_TRACK_INDEX";
    readonly SET_CURRENT_TIME: "SET_CURRENT_TIME";
    readonly SET_DURATION: "SET_DURATION";
    readonly SET_IS_PLAYING: "SET_IS_PLAYING";
};

export declare function AudioPlayer<T extends ElementType>(props: AudioPlayerProps<T>): JSX_2.Element;

export declare namespace AudioPlayer {
    var Author: typeof AudioPlayerAuthor;
    var ContextProvider: typeof AudioPlayerContextProvider;
    var Controls: typeof AudioPlayerControls;
    var Image: typeof AudioPlayerImage;
    var Info: typeof AudioPlayerInfo;
    var ProgressBar: typeof AudioPlayerProgressBar;
    var Time: typeof AudioPlayerTime;
    var Title: typeof AudioPlayerTitle;
    var Volume: typeof AudioPlayerVolume;
}

export declare function AudioPlayerAuthor<T extends ElementType>(props: AudioPlayerAuthorProps<T>): JSX_2.Element | null;

export declare function AudioPlayerAuthorBase<T extends ElementType>(props: AudioPlayerAuthorProps<T>): JSX_2.Element;

export declare type AudioPlayerAuthorProps<T extends ElementType = 'p'> = {
    /** @default p */
    as?: T;
} & ComponentPropsWithoutRef<T>;

export declare const AudioPlayerContextDispatch: Context<AudioPlayerContextDispatchType | undefined>;

export declare interface AudioPlayerContextDispatchType {
    dispatch: Dispatch<ReducerAction>;
    actions: typeof AUDIO_PLAYER_ACTIONS;
}

export declare function AudioPlayerContextProvider(props: AudioPlayerContextProviderProps): JSX_2.Element;

export declare interface AudioPlayerContextProviderProps {
    /** @default 0 */
    defaultTrackIndex?: number;
    children: ReactNode;
    tracks: AudioTrackData[];
}

export declare const AudioPlayerContextState: Context<AudioPlayerContextStateType | undefined>;

export declare interface AudioPlayerContextStateType extends State {
    audioRef: RefObject<HTMLAudioElement>;
    currentTrack: AudioTrackData | undefined;
    progressBarRef: RefObject<HTMLInputElement>;
    tracks: AudioTrackData[];
}

export declare function AudioPlayerControls(props: AudioPlayerControlsProps): JSX_2.Element;

export declare function AudioPlayerControlsBase<T extends ElementType>(props: AudioPlayerControlsProps<T>): JSX_2.Element;

export declare function AudioPlayerControlsButtonLoop(props: AudioPlayerControlsButtonProps): JSX_2.Element;

export declare function AudioPlayerControlsButtonNext(props: HTMLAttributes<HTMLButtonElement>): JSX_2.Element;

export declare function AudioPlayerControlsButtonPlay(props: AudioPlayerControlsButtonProps): JSX_2.Element;

export declare function AudioPlayerControlsButtonPrevious(props: HTMLAttributes<HTMLButtonElement>): JSX_2.Element;

export declare interface AudioPlayerControlsButtonProps extends HTMLAttributes<HTMLButtonElement> {
    active?: boolean;
}

export declare function AudioPlayerControlsButtonShuffle(props: AudioPlayerControlsButtonProps): JSX_2.Element;

export declare type AudioPlayerControlsProps<T extends ElementType = 'div'> = {
    /** @default div */
    as?: T;
} & ComponentPropsWithoutRef<T>;

export declare function AudioPlayerImage(props: AudioPlayerImageProps): JSX_2.Element;

export declare function AudioPlayerImageBase(props: AudioPlayerImageBaseProps): JSX_2.Element;

export declare interface AudioPlayerImageBaseProps extends HTMLAttributes<HTMLDivElement> {
    /** @default '' */
    altText: string;
    /** @default 96 */
    width?: number;
    /** @default 96 */
    height?: number;
    src?: string;
}

export declare interface AudioPlayerImageProps extends Omit<AudioPlayerImageBaseProps, 'src' | 'altText'> {
    /** @default `${title} thumbnail` */
    altText?: string;
}

export declare function AudioPlayerInfo<T extends ElementType>(props: AudioPlayerInfoProps<T>): JSX_2.Element;

export declare type AudioPlayerInfoProps<T extends ElementType = 'div'> = {
    /**
     * @default div
     * */
    as?: T;
} & ComponentPropsWithoutRef<T>;

export declare function AudioPlayerProgressBar(props: AudioPlayerProgressBarProps): JSX_2.Element;

export declare const AudioPlayerProgressBarBase: ForwardRefExoticComponent<AudioPlayerProgressBarProps & RefAttributes<HTMLInputElement>>;

export declare interface AudioPlayerProgressBarProps extends HTMLAttributes<HTMLInputElement> {
}

export declare type AudioPlayerProps<T extends ElementType = 'div'> = {
    /** @default div */
    as?: T;
} & ComponentPropsWithoutRef<T>;

export declare function AudioPlayerTime(props: Omit<AudioPlayerTimeProps, 'currentTime' | 'duration'>): JSX_2.Element;

export declare function AudioPlayerTimeBase<T extends ElementType>(props: AudioPlayerTimeProps<T>): JSX_2.Element;

export declare type AudioPlayerTimeProps<T extends ElementType = 'div'> = {
    /** @default span */
    as?: T;
    currentTime: string;
    duration: string;
} & ComponentPropsWithoutRef<T>;

export declare function AudioPlayerTitle<T extends ElementType>(props: AudioPlayerTitleProps<T>): JSX_2.Element | null;

export declare function AudioPlayerTitleBase<T extends ElementType>(props: AudioPlayerTitleProps<T>): JSX_2.Element;

export declare type AudioPlayerTitleProps<T extends ElementType = 'p'> = {
    /** @default p */
    as?: T;
} & ComponentPropsWithoutRef<T>;

export declare function AudioPlayerVolume<T extends ElementType>(props: AudioPlayerVolumeProps<T>): JSX_2.Element;

export declare type AudioPlayerVolumeLayoutProps<T extends ElementType> = AudioPlayerVolumeProps<T> & {
    max?: number;
    min?: number;
    value: number;
};

export declare type AudioPlayerVolumeProps<T extends ElementType = 'div'> = {
    /** @default div */
    as?: T;
    onClick?: MouseEventHandler<HTMLButtonElement>;
} & ComponentPropsWithoutRef<T>;

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
};

export declare function useAudioPlayerContextDispatch(): AudioPlayerContextDispatchType;

export declare function useAudioPlayerContextState(): AudioPlayerContextStateType;

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

declare interface useAudioPlayerControlsProps extends AudioPlayerContextStateType, AudioPlayerContextDispatchType {
}

export declare function useAudioPlayerProgressBar(props?: useAudioPlayerProgressBarProps): {
    handleProgressChange: ChangeEventHandler<HTMLInputElement>;
};

export declare interface useAudioPlayerProgressBarProps {
    cssVariableName?: string;
}

export declare function useAudioPlayerTime(props: Pick<AudioPlayerContextStateType, 'currentTime' | 'duration'>): {
    currentTimeDisplay: string;
    durationDisplay: string;
};

declare type Variant = VariantsAsTypes[number];

declare const variants: readonly ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"];

declare type VariantsAsTypes = typeof variants;

export { }
