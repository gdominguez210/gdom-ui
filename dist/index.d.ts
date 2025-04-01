import { ChangeEventHandler } from 'react';
import { ComponentPropsWithRef } from 'react';
import { ElementType } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { PropsWithChildren } from 'react';
import { RefAttributes } from 'react';
import { RefObject } from 'react';
import { SVGProps } from 'react';
import { SyntheticEvent } from 'react';

export declare const AudioPlayer: {
    Root: typeof AudioPlayerPrimitive & {
        displayName: string;
    };
    Provider: typeof AudioPlayerContextProvider & {
        displayName: string;
    };
    Author: typeof AudioPlayerAuthor & {
        displayName: string;
    };
    Controls: typeof AudioPlayerControls & {
        displayName: string;
    };
    Image: typeof AudioPlayerImage & {
        displayName: string;
    };
    Info: typeof AudioPlayerInfo & {
        displayName: string;
    };
    ProgressBar: typeof AudioPlayerProgressBar & {
        displayName: string;
    };
    Time: typeof AudioPlayerTime & {
        displayName: string;
    };
    Title: typeof AudioPlayerTitle & {
        displayName: string;
    };
    Volume: typeof AudioPlayerVolume & {
        displayName: string;
    };
    VolumeButton: typeof AudioPlayerVolumeButton & {
        displayName: string;
    };
    VolumeSlider: typeof AudioPlayerVolumeSlider & {
        displayName: string;
    };
    ControlAudio: typeof AudioPlayerControlAudio & {
        displayName: string;
    };
    ControlPlay: typeof AudioPlayerControlPlay & {
        displayName: string;
    };
    ControlPrevious: typeof AudioPlayerControlPrevious & {
        displayName: string;
    };
    ControlNext: typeof AudioPlayerControlNext & {
        displayName: string;
    };
    ControlShuffle: typeof AudioPlayerControlShuffle & {
        displayName: string;
    };
    ControlLoop: typeof AudioPlayerControlLoop & {
        displayName: string;
    };
};

/**
 * Displays the author of the current audio track
 * Returns null if no author is available
 */
export declare function AudioPlayerAuthor<T extends ElementType = 'p'>(props: AudioPlayerAuthorProps<T>): JSX.Element | null;

/**
 * Base component for displaying author information with appropriate styling
 */
export declare function AudioPlayerAuthorPrimitive<T extends ElementType = 'p'>(props: AudioPlayerAuthorPrimitiveProps<T>): JSX.Element;

/**
 * Props for the AudioPlayerAuthorPrimitive component
 */
export declare type AudioPlayerAuthorPrimitiveProps<T extends ElementType = 'p'> = AudioPlayerAuthorProps<T>;

/**
 * Props for the track author component
 */
export declare type AudioPlayerAuthorProps<T extends ElementType = 'p'> = {
    /** Element to render as @default p */
    as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Provides context for controlling audio playback state
 */
export declare function AudioPlayerContextAudioProvider(props: AudioPlayerContextAudioProviderProps): JSX.Element;

/**
 * Props for the audio playback context provider
 */
export declare interface AudioPlayerContextAudioProviderProps extends PropsWithChildren {
    /** Initial volume level @default 50 */
    defaultVolume?: number;
    /** Whether audio is initially muted @default false */
    defaultMute?: boolean;
    /** Whether shuffle is initially enabled @default false */
    defaultShuffle?: boolean;
    /** Whether loop is initially enabled @default false */
    defaultLoop?: boolean;
}

declare interface AudioPlayerContextAudioType {
    isPlaying: boolean;
    volume: number;
    mute: boolean;
    shuffle: boolean;
    loop: boolean;
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    setVolume: (volume: number) => void;
    setMute: (mute: boolean) => void;
    toggleMute: () => void;
    setShuffle: (shuffle: boolean) => void;
    toggleShuffle: () => void;
    setLoop: (loop: boolean) => void;
    toggleLoop: () => void;
}

/**
 * Main provider that composes all context providers needed for the audio player
 */
export declare function AudioPlayerContextProvider({ children, defaultTrackIndex, defaultVolume, defaultMute, defaultShuffle, defaultLoop, tracks, }: AudioPlayerContextProviderProps): JSX.Element;

/**
 * Props for the main audio player context provider
 */
export declare type AudioPlayerContextProviderProps = {
    /** Initial track to play @default 0 */
    defaultTrackIndex?: number;
    /** Initial volume level @default 50 */
    defaultVolume?: number;
    /** Whether audio is initially muted @default false */
    defaultMute?: boolean;
    /** Whether shuffle is initially enabled @default false */
    defaultShuffle?: boolean;
    /** Whether loop is initially enabled @default false */
    defaultLoop?: boolean;
    /** Array of tracks to play */
    tracks: AudioTrackData[];
} & PropsWithChildren;

/**
 * Provides references to important DOM elements used by the audio player
 */
export declare function AudioPlayerContextRefsProvider(props: AudioPlayerContextRefsProviderProps): JSX.Element;

/**
 * Props for the DOM references context provider
 */
export declare type AudioPlayerContextRefsProviderProps = PropsWithChildren;

declare type AudioPlayerContextRefsType = {
    audioRef: RefObject<HTMLAudioElement | null>;
    progressBarRef: RefObject<HTMLInputElement | null>;
};

/**
 * Provides context for tracking and controlling audio playback time
 */
export declare function AudioPlayerContextTimeProvider(props: AudioPlayerContextTimeProviderProps): JSX.Element;

/**
 * Props for the time tracking context provider
 */
export declare type AudioPlayerContextTimeProviderProps = PropsWithChildren & {
    /** Initial total duration in seconds @default 0 */
    defaultDuration?: number;
    /** Initial playback position in seconds @default 0 */
    defaultCurrentTime?: number;
};

declare interface AudioPlayerContextTimeType {
    currentTime: number;
    duration: number;
    seek: (time: number) => void;
    setDuration: (duration: number) => void;
}

/**
 * Provides context for managing the current track and track list
 */
export declare function AudioPlayerContextTrackProvider(props: AudioPlayerContextTrackProviderProps): JSX.Element;

/**
 * Props for the track management context provider
 */
export declare interface AudioPlayerContextTrackProviderProps extends PropsWithChildren {
    /** List of tracks to be played */
    tracks: AudioTrackData[];
    /** Initial track index to play @default 0 */
    defaultTrackIndex?: number;
}

declare interface AudioPlayerContextTrackType {
    currentTrack: AudioTrackData | undefined;
    currentTrackIndex: number;
    tracks: AudioTrackData[];
    setTrackIndex: (index: number) => void;
}

/**
 * Audio element that integrates with the audio player context
 */
declare function AudioPlayerControlAudio(props: AudioPlayerControlAudioProps): JSX.Element;

/**
 * Props for the audio element component
 */
declare type AudioPlayerControlAudioProps = ComponentPropsWithRef<'audio'>;

/**
 * Loop control component that integrates with the audio player context
 */
declare function AudioPlayerControlLoop(props: AudioPlayerControlLoopProps): JSX.Element;

/**
 * Props for the loop button primitive component
 */
declare interface AudioPlayerControlLoopPrimitiveProps extends ComponentPropsWithRef<'button'> {
    /** Whether loop mode is currently active */
    active?: boolean;
}

/**
 * Props for the loop control component
 */
declare type AudioPlayerControlLoopProps = Omit<AudioPlayerControlLoopPrimitiveProps, 'active'>;

/**
 * Next track control button that integrates with the audio player context
 */
declare function AudioPlayerControlNext(props: AudioPlayerControlNextProps): JSX.Element;

declare type AudioPlayerControlNextProps = ComponentPropsWithRef<'button'>;

/**
 * Play/pause control component that integrates with the audio player context
 */
declare function AudioPlayerControlPlay(props: AudioPlayerControlPlayProps): JSX.Element;

/**
 * Props for the play/pause button primitive component
 */
declare interface AudioPlayerControlPlayPrimitiveProps extends ComponentPropsWithRef<'button'> {
    /** Whether the audio is currently playing */
    active?: boolean;
}

/**
 * Props for the play/pause control component
 */
declare type AudioPlayerControlPlayProps = Omit<AudioPlayerControlPlayPrimitiveProps, 'active'>;

/**
 * Previous track control button that integrates with the audio player context
 */
declare function AudioPlayerControlPrevious(props: AudioPlayerControlPreviousProps): JSX.Element;

declare type AudioPlayerControlPreviousProps = ComponentPropsWithRef<'button'>;

/**
 * Base component for laying out audio player controls
 */
export declare function AudioPlayerControls<T extends ElementType>(props: AudioPlayerControlsProps<T>): JSX.Element;

/**
 * Shuffle control component that integrates with the audio player context
 */
declare function AudioPlayerControlShuffle(props: AudioPlayerControlShuffleProps): JSX.Element;

/**
 * Props for the shuffle button primitive component
 */
declare interface AudioPlayerControlShufflePrimitiveProps extends ComponentPropsWithRef<'button'> {
    /** Whether shuffle mode is currently active */
    active?: boolean;
}

/**
 * Props for the shuffle control component
 */
declare type AudioPlayerControlShuffleProps = Omit<AudioPlayerControlShufflePrimitiveProps, 'active'>;

/**
 * Props for the playback controls container
 */
export declare type AudioPlayerControlsProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Displays the thumbnail for the current audio track
 * Shows a placeholder icon if no thumbnail is available
 */
export declare function AudioPlayerImage<T extends ElementType = 'div'>(props: AudioPlayerImageProps<T>): JSX.Element;

/**
 * Base component for displaying an audio track image or placeholder
 */
export declare function AudioPlayerImagePrimitive<T extends ElementType>(props: AudioPlayerImagePrimitiveProps<T>): JSX.Element;

export declare type AudioPlayerImagePrimitiveProps<T extends ElementType = 'div'> = AudioPlayerImageProps<T> & {
    src: string;
    altText: string;
};

/**
 * Props for the audio track image component
 */
export declare type AudioPlayerImageProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
    /** Image width in pixels @default 96 */
    width?: number;
    /** Image height in pixels @default 96 */
    height?: number;
} & ComponentPropsWithRef<T>;

/**
 * Container component for displaying track information (image, title, artist)
 */
export declare function AudioPlayerInfo<T extends ElementType>(props: AudioPlayerInfoProps<T>): JSX.Element;

/**
 * Props for the track information container component
 */
export declare type AudioPlayerInfoProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Base wrapper component for the audio player UI
 */
export declare function AudioPlayerPrimitive<T extends ElementType>(props: AudioPlayerPrimitiveProps<T>): JSX.Element;

/**
 * Props for the audio player wrapper component
 */
export declare type AudioPlayerPrimitiveProps<T extends ElementType = 'div'> = {
    /** Element to render as
     * @default div
     * */
    as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Progress bar that integrates with the audio player context for playback control
 */
export declare function AudioPlayerProgressBar(props: AudioPlayerProgressBarProps): JSX.Element;

/**
 * Base component for displaying and styling the audio progress bar
 */
export declare function AudioPlayerProgressBarPrimitive(props: AudioPlayerProgressBarPrimitiveProps): JSX.Element;

/**
 * Props for the progress bar component
 */
export declare type AudioPlayerProgressBarPrimitiveProps = AudioPlayerProgressBarProps;

/**
 * Props for the progress bar component
 */
export declare type AudioPlayerProgressBarProps = Omit<ComponentPropsWithRef<'input'>, 'type'>;

/**
 * Displays the current playback time and total duration from context
 */
export declare function AudioPlayerTime(props: AudioPlayerTimeProps): JSX.Element;

/**
 * Base component for displaying formatted audio playback time
 */
export declare function AudioPlayerTimePrimitive<T extends ElementType>(props: AudioPlayerTimePrimitiveProps<T>): JSX.Element;

/**
 * Props for the time display primitive component
 */
export declare type AudioPlayerTimePrimitiveProps<T extends ElementType = 'span'> = {
    /** Element to render as @default span */
    as?: T;
    /** Current playback time formatted as a string */
    currentTime?: string;
    /** Total duration formatted as a string */
    duration?: string;
    /** Separator between current time and duration @default /  */
    separator?: string;
} & ComponentPropsWithRef<T>;

/**
 * Props for the time display component (current time and duration from context)
 */
export declare type AudioPlayerTimeProps = Omit<AudioPlayerTimePrimitiveProps, 'currentTime' | 'duration'>;

/**
 * Displays the title of the current audio track
 * Returns null if no title is available
 */
export declare function AudioPlayerTitle<T extends ElementType>(props: AudioPlayerTitleProps<T>): JSX.Element | null;

/**
 * Base component for displaying track title with appropriate styling
 */
export declare function AudioPlayerTitlePrimitive<T extends ElementType>(props: AudioPlayerTitleProps<T>): JSX.Element;

export declare type AudioPlayerTitlePrimitiveProps<T extends ElementType = 'p'> = AudioPlayerTitleProps<T>;

/**
 * Props for the track title component
 */
export declare type AudioPlayerTitleProps<T extends ElementType = 'p'> = {
    /** Element to render as @default p */
    as?: T;
    /**
     * Additional CSS classes to apply to the component
     * @example
     * // Apply custom classes
     * <AudioPlayerTitle className="text-2xl text-blue-500" />
     */
    className?: string;
} & ComponentPropsWithRef<T>;

/**
 * Base container component for volume controls
 */
export declare function AudioPlayerVolume<T extends ElementType = 'div'>(props: AudioPlayerVolumeProps<T>): JSX.Element;

/**
 * Volume button that toggles mute and displays appropriate icon based on volume level
 */
declare function AudioPlayerVolumeButton(props: AudioPlayerVolumeButtonProps): JSX.Element;

/**
 * Props for the volume control button
 */
declare type AudioPlayerVolumeButtonProps = ComponentPropsWithRef<'button'>;

/**
 * Props for the volume control component
 */
export declare type AudioPlayerVolumeProps<T extends ElementType = 'div'> = ComponentPropsWithRef<T> & {
    /** Element to render as @default div */
    as?: T;
};

/**
 * Volume slider that integrates with the audio player context
 */
declare function AudioPlayerVolumeSlider(props: AudioPlayerVolumeSliderProps): JSX.Element;

/**
 * Props for the volume slider primitive component
 */
declare type AudioPlayerVolumeSliderPrimitiveProps = Omit<ComponentPropsWithRef<'input'>, 'type'> & {
    /** Current volume value */
    value: number;
    /** Minimum volume value @default 0 */
    min?: number;
    /** Maximum volume value @default 100 */
    max?: number;
    /** Orientation of the slider @default horizontal */
    orientation?: 'horizontal' | 'vertical';
};

declare type AudioPlayerVolumeSliderProps = Omit<AudioPlayerVolumeSliderPrimitiveProps, 'value'>;

export declare const AudioPlaylist: {
    Root: typeof AudioPlaylistPrimitive & {
        displayName: string;
    };
    Provider: typeof AudioPlaylistContextProvider & {
        displayName: string;
    };
    Header: typeof AudioPlaylistHeader & {
        displayName: string;
    };
    Dismiss: typeof AudioPlaylistDismiss & {
        displayName: string;
    };
    Tracks: typeof AudioPlaylistTracks & {
        displayName: string;
    };
    ControlToggle: typeof AudioPlaylistControlToggle & {
        displayName: string;
    };
    Track: typeof AudioPlaylistTrack & {
        displayName: string;
    };
    TrackTitle: typeof AudioPlaylistTrackTitle & {
        displayName: string;
    };
    TrackAuthor: typeof AudioPlaylistTrackAuthor & {
        displayName: string;
    };
    TrackImage: typeof AudioPlaylistTrackImage & {
        displayName: string;
    };
    ExpandableContainer: typeof AudioPlaylistExpandableContainer & {
        displayName: string;
    };
};

/**
 * Provider component for managing playlist visibility state and references
 */
export declare function AudioPlaylistContextProvider(props: AudioPlaylistContextProviderProps): JSX.Element;

/**
 * Props for the audio playlist context provider
 */
export declare type AudioPlaylistContextProviderProps = PropsWithChildren & {
    /**
     * Whether the playlist is initially visible
     * @default false
     */
    defaultVisible?: boolean;
    /**
     * The tracks to display in the playlist
     */
    tracks: AudioTrackData[];
    /**
     * The id of the playlist, primarily used for accessibility attributes
     * @default 'audio-playlist'
     */
    id?: string;
};

export declare interface AudioPlaylistContextType {
    isPlaylistVisible: boolean;
    togglePlaylist: () => void;
    toggleRef: RefObject<HTMLButtonElement | null>;
    expandableContainerRef: RefObject<HTMLElement | null>;
    tracks: AudioTrackData[];
    id: string;
}

/**
 * Toggle button for showing/hiding the audio playlist
 */
export declare function AudioPlaylistControlToggle(props: AudioPlaylistControlToggleProps): JSX.Element;

/**
 * Button component for toggling playlist visibility
 */
export declare function AudioPlaylistControlTogglePrimitive(props: AudioPlaylistControlTogglePrimitiveProps): JSX.Element;

/**
 * Props for the playlist toggle button primitive component
 */
export declare type AudioPlaylistControlTogglePrimitiveProps = ComponentPropsWithRef<'button'> & {
    /** Whether the playlist is currently expanded/visible */
    active?: boolean;
};

/**
 * Props for the playlist toggle component
 */
export declare type AudioPlaylistControlToggleProps = Omit<AudioPlaylistControlTogglePrimitiveProps, 'active'>;

/**
 * Dismiss button that integrates with the playlist toggle context
 */
export declare function AudioPlaylistDismiss(props: AudioPlaylistDismissProps): JSX.Element;

/**
 * Button component for dismissing/closing the playlist
 */
export declare function AudioPlaylistDismissPrimitive(props: AudioPlaylistDismissPrimitiveProps): JSX.Element;

/**
 * Props for the audio playlist dismiss button primitive component
 */
export declare type AudioPlaylistDismissPrimitiveProps = ComponentPropsWithRef<'button'>;

/**
 * Props for the playlist dismiss component
 */
export declare type AudioPlaylistDismissProps = AudioPlaylistDismissPrimitiveProps;

/**
 * Container component that connects to AudioPlaylistContext and expands/collapses based on context state
 * This component is a client component as it uses React hooks and context
 */
export declare function AudioPlaylistExpandableContainer<T extends ElementType = 'div'>(props: AudioPlaylistExpandableContainerProps<T>): JSX.Element;

/**
 * Primitive container component that can expand/collapse its content
 * This component is purely presentational and can be server-rendered
 */
export declare function AudioPlaylistExpandableContainerPrimitive<T extends ElementType = 'div'>(props: AudioPlaylistExpandableContainerPrimitiveProps<T>): JSX.Element;

/**
 * Props for the expandable container primitive component
 */
export declare type AudioPlaylistExpandableContainerPrimitiveProps<T extends ElementType = 'div'> = AudioPlaylistExpandableContainerProps<T> & {
    isExpanded?: boolean;
};

/**
 * Props for the context-connected expandable container component - same as primitive
 * but without the isExpanded prop which comes from context
 */
export declare type AudioPlaylistExpandableContainerProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Header component for playlist with consistent styling
 */
export declare function AudioPlaylistHeader<T extends ElementType = 'div'>(props: AudioPlaylistHeaderProps<T>): JSX.Element;

/**
 * Props for the audio playlist header component
 */
export declare type AudioPlaylistHeaderProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Base component for displaying a playlist of audio tracks, providing the essential markup
 */
export declare function AudioPlaylistPrimitive<T extends ElementType = 'div'>(props: AudioPlaylistPropsPrimitive<T>): JSX.Element;

/**
 * Props for the audio playlist primitive component
 */
export declare type AudioPlaylistPropsPrimitive<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Individual playlist track component
 */
export declare function AudioPlaylistTrack<T extends ElementType = 'li'>(props: AudioPlaylistTrackProps<T>): JSX.Element;

/**
 * Track author component specifically styled for playlist tracks
 */
export declare function AudioPlaylistTrackAuthor<T extends ElementType = 'span'>(props: AudioPlaylistTrackAuthorProps<T>): JSX.Element;

/**
 * Props for the audio playlist track author component
 */
export declare type AudioPlaylistTrackAuthorProps<T extends ElementType = 'span'> = {
    /** Element to render as @default span */
    as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Component for displaying an audio playlist track image
 */
export declare function AudioPlaylistTrackImage(props: AudioPlaylistTrackImageProps): JSX.Element;

/**
 * Props for the audio playlist track image component
 */
export declare type AudioPlaylistTrackImageProps<T extends ElementType = 'div'> = AudioPlayerImagePrimitiveProps<T> & {
    active?: boolean;
    isPlaying?: boolean;
};

/**
 * Primitive component for rendering a single playlist track item
 */
export declare function AudioPlaylistTrackPrimitive<T extends ElementType = 'li'>(props: AudioPlaylistTrackPrimitiveProps<T>): JSX.Element;

/**
 * Props for the audio playlist track primitive component
 */
export declare type AudioPlaylistTrackPrimitiveProps<T extends ElementType = 'li'> = {
    /** Element to render as @default li */
    as?: T;
    /** Whether the track is active */
    active?: boolean;
} & ComponentPropsWithRef<T>;

/**
 * Props for the audio playlist track component
 */
export declare type AudioPlaylistTrackProps<T extends ElementType = 'li'> = {
    /** Element to render as @default li */
    as?: T;
    /** Title of the track */
    title: string;
    /** Author of the track */
    author: string;
    /** URL to the track thumbnail image */
    thumbnail?: string;
    /** Whether this is the active track */
    active?: boolean;
    /** Whether audio is currently playing */
    isPlaying?: boolean;
    /** Handler for track selection */
    onSelect?: (e: SyntheticEvent) => void;
} & ComponentPropsWithRef<T>;

/**
 * Component for rendering the scrollable list of playlist tracks,
 * connected to audio player context
 */
export declare function AudioPlaylistTracks<T extends ElementType = 'ul'>(props: AudioPlaylistTracksProps<T>): JSX.Element | null;

/**
 * Primitive component for rendering the scrollable list of playlist tracks
 */
export declare function AudioPlaylistTracksPrimitive<T extends ElementType = 'ul'>(props: AudioPlaylistTracksPrimitiveProps<T>): JSX.Element;

/**
 * Props for the audio playlist tracks primitive component
 */
export declare type AudioPlaylistTracksPrimitiveProps<T extends ElementType = 'ul'> = {
    /** Element to render as @default ul */
    as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Props for the audio playlist tracks component
 */
export declare type AudioPlaylistTracksProps<T extends ElementType = 'ul'> = AudioPlaylistTracksPrimitiveProps<T>;

/**
 * Track title component specifically styled for playlist tracks
 */
export declare function AudioPlaylistTrackTitle<T extends ElementType = 'span'>(props: AudioPlaylistTrackTitleProps<T>): JSX.Element;

/**
 * Props for the audio playlist track title component
 */
export declare type AudioPlaylistTrackTitleProps<T extends ElementType = 'span'> = {
    /** Element to render as @default span */
    as?: T;
} & ComponentPropsWithRef<T>;

declare type AudioTrackData = {
    title: string;
    src: string;
    author: string;
    thumbnail?: string;
};

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

export declare function Icon(props: IconProps): JSX.Element;

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

export declare interface IconProps extends ComponentPropsWithRef<'svg'> {
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
    readonly 'play-list-2-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'play-list-add-line': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
    readonly 'close-fill': ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
};

declare type Size = SizesAsTypes[number];

declare const sizes: readonly ["md", "lg", "xl", "xxl"];

declare type SizesAsTypes = typeof sizes;

export declare function useAudioPlayerContextAudio(): AudioPlayerContextAudioType;

export declare function useAudioPlayerContextRefs(): AudioPlayerContextRefsType;

export declare function useAudioPlayerContextTime(): AudioPlayerContextTimeType;

export declare function useAudioPlayerContextTrack(): AudioPlayerContextTrackType;

export declare type useAudioPlayerExpandableContainer = {
    isPlaylistVisible: boolean;
    containerRef: RefObject<HTMLElement | null>;
    toggleRef: RefObject<HTMLElement | null>;
    onClose?: () => void;
};

/**
 * Custom hook for managing audio player progress bar
 * Handles progress bar value updates and animation
 */
export declare function useAudioPlayerProgressBar({ audioRef, cssVariableName, duration, isPlaying, onProgressChange, progressBarRef, }: UseAudioPlayerProgressBarProps): {
    handleProgressChange: ChangeEventHandler<HTMLInputElement>;
};

declare interface UseAudioPlayerProgressBarProps {
    audioRef: RefObject<HTMLAudioElement | null>;
    cssVariableName?: string;
    duration: number;
    isPlaying: boolean;
    onProgressChange: (time: number) => void;
    progressBarRef: RefObject<HTMLInputElement | null>;
}

export declare function useAudioPlayerTime(props: {
    currentTime: number;
    duration: number;
}): {
    currentTimeDisplay: string;
    durationDisplay: string;
};

/**
 * Hook to access playlist context for managing visibility and references
 */
export declare function useAudioPlaylistContext(): AudioPlaylistContextType;

export declare function useAudioPlaylistExpandableContainer(props: useAudioPlayerExpandableContainer): void;

declare type Variant = VariantsAsTypes[number];

declare const variants: readonly ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"];

declare type VariantsAsTypes = typeof variants;

export { }
