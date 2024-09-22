import { ChangeEventHandler } from 'react';
import { Context } from 'react';
import { Dispatch } from 'react';
import { ElementType } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { ReactNode } from 'react';
import { RefAttributes } from 'react';
import { RefObject } from 'react';
import { SetStateAction } from 'react';
import { SVGAttributes } from 'react';

export declare function AudioPlayer(props: AudioPlayerProps): JSX_2.Element;

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

export declare function AudioPlayerAuthor(props: AudioPlayerAuthorProps): JSX_2.Element | null;

export declare function AudioPlayerAuthorBase(props: AudioPlayerAuthorProps): JSX_2.Element;

export declare interface AudioPlayerAuthorProps extends HTMLAttributes<HTMLElement> {
    /** @default p */
    as?: ElementType;
}

export declare const AudioPlayerContext: Context<AudioPlayerContextType | undefined>;

export declare function AudioPlayerContextProvider(props: AudioPlayerContextProviderProps): JSX_2.Element;

export declare interface AudioPlayerContextProviderProps {
    /** @default 0 */
    defaultTrackIndex?: number;
    children: ReactNode;
    tracks: AudioTrackData[];
}

export declare interface AudioPlayerContextType {
    audioRef: RefObject<HTMLAudioElement>;
    currentTime: number;
    currentTrack: AudioTrackData | undefined;
    duration: number;
    isPlaying: boolean;
    progressBarRef: RefObject<HTMLInputElement>;
    setCurrentTime: Dispatch<SetStateAction<number>>;
    setCurrentTrackIndex: Dispatch<SetStateAction<number>>;
    setDuration: Dispatch<SetStateAction<number>>;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    tracks: AudioTrackData[];
}

export declare function AudioPlayerControls(props: AudioPlayerControlsProps): JSX_2.Element;

export declare interface AudioPlayerControlsProps extends HTMLAttributes<HTMLElement> {
    /** @default div */
    as?: ElementType;
}

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

export declare function AudioPlayerInfo(props: AudioPlayerInfoProps): JSX_2.Element;

export declare interface AudioPlayerInfoProps extends HTMLAttributes<HTMLElement> {
    /**
     * @default div
     * */
    as?: ElementType;
}

export declare function AudioPlayerProgressBar(props: AudioPlayerProgressBarProps): JSX_2.Element;

export declare const AudioPlayerProgressBarBase: ForwardRefExoticComponent<AudioPlayerProgressBarProps & RefAttributes<HTMLInputElement>>;

export declare interface AudioPlayerProgressBarProps extends HTMLAttributes<HTMLInputElement> {
}

export declare interface AudioPlayerProps extends HTMLAttributes<HTMLElement> {
    /** @default div */
    as?: ElementType;
}

export declare function AudioPlayerTime(props: AudioPlayerTimeProps): JSX_2.Element;

export declare interface AudioPlayerTimeProps extends HTMLAttributes<HTMLElement> {
    /** @default span */
    as?: ElementType;
}

export declare function AudioPlayerTitle(props: AudioPlayerTitleProps): JSX_2.Element | null;

export declare function AudioPlayerTitleBase(props: AudioPlayerTitleProps): JSX_2.Element;

export declare interface AudioPlayerTitleProps extends HTMLAttributes<HTMLElement> {
    /** @default p */
    as?: ElementType;
}

export declare function AudioPlayerVolume(props: AudioPlayerVolumeProps): JSX_2.Element;

export declare interface AudioPlayerVolumeProps extends HTMLAttributes<HTMLElement> {
    /** @default div */
    as?: ElementType;
}

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
    readonly 'star-line': string;
    readonly 'forward-end-fill': string;
    readonly 'pause-large-fill': string;
    readonly 'play-large-fill': string;
    readonly 'repeat-fill': string;
    readonly 'rewind-fill': string;
    readonly 'rewind-start-fill': string;
    readonly 'shuffle-fill': string;
    readonly 'speed-fill': string;
    readonly 'stop-large-fill': string;
    readonly 'volume-mute-fill': string;
    readonly 'volume-down-fill': string;
    readonly 'volume-up-fill': string;
    readonly 'disc-fill': string;
};

declare type Size = SizesAsTypes[number];

declare const sizes: readonly ["md", "lg", "xl", "xxl"];

declare type SizesAsTypes = typeof sizes;

export declare function useAudioPlayerContext(): AudioPlayerContextType;

export declare function useAudioPlayerProgressBar(props?: useAudioPlayerProgressBarProps): {
    handleProgressChange: ChangeEventHandler<HTMLInputElement>;
};

export declare interface useAudioPlayerProgressBarProps {
    cssVariableName?: string;
}

declare type Variant = VariantsAsTypes[number];

declare const variants: readonly ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"];

declare type VariantsAsTypes = typeof variants;

export { }


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

