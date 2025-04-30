import { AudioPlaylistTrack as AudioPlaylistTrack_2 } from '..';
import { AudioPlaylistTrackAuthor as AudioPlaylistTrackAuthor_2 } from '..';
import { AudioPlaylistTrackContextProvider } from '../AudioPlaylistTrackContextProvider';
import { AudioPlaylistTrackImage as AudioPlaylistTrackImage_2 } from '..';
import { AudioPlaylistTrackTitle as AudioPlaylistTrackTitle_2 } from '..';
import { ChangeEventHandler } from 'react';
import { ComponentPropsWithRef } from 'react';
import { DependencyList } from 'react';
import { ElementType } from 'react';
import { ForwardRefExoticComponent } from 'react';
import { HTMLAttributes } from 'react';
import { JSX } from 'react/jsx-runtime';
import { PropsWithChildren } from 'react';
import { RefAttributes } from 'react';
import { RefCallback } from 'react';
import { RefObject } from 'react';
import { SVGProps } from 'react';

/**
 * Color modes for the audio progress waveform
 */
declare const AUDIO_PROGRESS_COLOR_MODES: {
    /**
     * Solid colors for played and unplayed regions
     */
    readonly SOLID: "solid";
    /**
     * Gradient effect for played regions
     */
    readonly GRADIENT: "gradient";
};

declare type AudioContextProviderProps = PropsWithChildren & {
    isPlaying?: boolean;
};

export declare const AudioPlayer: {
    Root: typeof AudioPlayerPrimitive & {
        displayName: string;
    };
    Provider: typeof AudioPlayerContextProvider & {
        displayName: string;
    };
    AudioContextProvider: typeof AudioPlayerContextAudioProvider & {
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
    VisualizerWaveform: typeof AudioPlayerVisualizerWaveform & {
        displayName: string;
    };
    VisualizerFrequencyBars: typeof AudioPlayerVisualizerFrequencyBars & {
        displayName: string;
    };
    ProgressWaveform: typeof AudioPlayerProgressWaveform & {
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

declare function AudioPlayerContextAudioProvider(props: AudioPlayerContextAudioProviderProps): JSX.Element;

declare type AudioPlayerContextAudioProviderProps = Omit<AudioContextProviderProps, 'isPlaying'>;

/**
 * Provides context for controlling audio playback state
 */
export declare function AudioPlayerContextPlaybackProvider(props: AudioPlayerContextPlaybackProviderProps): JSX.Element;

/**
 * Props for the audio playback context provider
 */
export declare interface AudioPlayerContextPlaybackProviderProps extends PropsWithChildren {
    /** Initial volume level @default 50 */
    defaultVolume?: number;
    /** Whether audio is initially muted @default false */
    defaultMute?: boolean;
    /** Whether shuffle is initially enabled @default false */
    defaultShuffle?: boolean;
    /** Whether loop is initially enabled @default false */
    defaultLoop?: boolean;
}

declare interface AudioPlayerContextPlaybackType {
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

export declare function AudioPlayerProgressWaveform(props: AudioPlayerProgressWaveformProps): JSX.Element;

export declare type AudioPlayerProgressWaveformProps = Omit<AudioProgressWaveformProps, 'audioRef' | 'duration' | 'onProgressChange' | 'isActive'>;

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

export declare function AudioPlayerVisualizerFrequencyBars(props: AudioPlayerVisualizerFrequencyBarsProps): JSX.Element;

export declare type AudioPlayerVisualizerFrequencyBarsProps = Omit<AudioVisualizerFrequencyBarsProps, 'isActive' | 'audioRef' | 'duration' | 'audioContextRef' | 'isAudioContextReady' | 'createAudioSource' | 'deleteAudioSource'>;

export declare function AudioPlayerVisualizerWaveform(props: AudioPlayerVisualizerWaveformProps): JSX.Element;

export declare type AudioPlayerVisualizerWaveformProps = Omit<AudioVisualizerWaveformProps, 'isActive' | 'audioRef' | 'duration' | 'audioContextRef' | 'isAudioContextReady' | 'createAudioSource' | 'deleteAudioSource'>;

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
    Track: {
        Provider: AudioPlaylistTrackContextProvider & {
            displayName: string;
        };
        Root: AudioPlaylistTrack_2 & {
            displayName: string;
        };
        Image: AudioPlaylistTrackImage_2 & {
            displayName: string;
        };
        Title: AudioPlaylistTrackTitle_2 & {
            displayName: string;
        };
        Author: AudioPlaylistTrackAuthor_2 & {
            displayName: string;
        };
    } & {
        displayName: string;
    };
    ExpandableContainer: typeof AudioPlaylistExpandableContainer & {
        displayName: string;
    };
    ScrollableContainer: typeof AudioPlaylistScrollableContainer & {
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
 * A scrollable container component for audio playlist elements
 * Provides consistent custom scrollbar styling across browsers
 */
export declare function AudioPlaylistScrollableContainer<T extends ElementType = 'div'>(props: AudioPlaylistScrollableContainerProps<T>): JSX.Element;

/**
 * Props for the audio playlist scrollable container component
 */
export declare type AudioPlaylistScrollableContainerProps<T extends ElementType = 'div'> = {
    /** Element to render as @default div */
    as?: T;
    /** Maximum height for the scrollable container */
    maxHeight?: string;
} & ComponentPropsWithRef<T>;

/**
 * Individual playlist track component
 */
export declare function AudioPlaylistTrack<T extends ElementType = 'li'>(props: AudioPlaylistTrackProps<T>): JSX.Element;

/**
 * Audio playlist track author component
 */
export declare function AudioPlaylistTrackAuthor<T extends ElementType = 'span'>(props: AudioPlaylistTrackAuthorProps<T>): JSX.Element;

/**
 * Track author component specifically styled for playlist tracks
 */
export declare function AudioPlaylistTrackAuthorPrimitive<T extends ElementType = 'span'>(props: AudioPlaylistTrackAuthorPrimitiveProps<T>): JSX.Element;

/**
 * Props for the audio playlist track author component
 */
export declare type AudioPlaylistTrackAuthorPrimitiveProps<T extends ElementType = 'span'> = {
    /** Element to render as @default span */
    as?: T;
} & ComponentPropsWithRef<T>;

/**
 * Props for the audio playlist track author component
 */
export declare type AudioPlaylistTrackAuthorProps<T extends ElementType = 'span'> = Omit<AudioPlaylistTrackAuthorPrimitiveProps<T>, 'children'>;

export declare function AudioPlaylistTrackImage(props: AudioPlaylistTrackImageProps): JSX.Element;

/**
 * Component for displaying an audio playlist track image
 */
export declare function AudioPlaylistTrackImagePrimitive(props: AudioPlaylistTrackImagePrimitiveProps): JSX.Element;

/**
 * Props for the audio playlist track image component
 */
export declare type AudioPlaylistTrackImagePrimitiveProps<T extends ElementType = 'div'> = AudioPlayerImagePrimitiveProps<T> & {
    active?: boolean;
    isPlaying?: boolean;
};

export declare type AudioPlaylistTrackImageProps<T extends ElementType = 'div'> = AudioPlayerImageProps<T>;

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
} & ComponentPropsWithRef<T>;

/**
 * Audio playlist tracks component for rendering the scrollable list of playlist tracks
 */
export declare function AudioPlaylistTracks<T extends ElementType = 'ul'>(props: AudioPlaylistTracksProps<T>): JSX.Element;

/**
 * Props for the audio playlist tracks container component
 */
export declare type AudioPlaylistTracksProps<T extends ElementType = 'ul'> = {
    /** Element to render as @default ul */
    as?: T;
} & ComponentPropsWithRef<T>;

export declare function AudioPlaylistTrackTitle<T extends ElementType = 'span'>(props: AudioPlaylistTrackTitleProps<T>): JSX.Element;

/**
 * Track title component specifically styled for playlist tracks
 */
export declare function AudioPlaylistTrackTitlePrimitive<T extends ElementType = 'span'>(props: AudioPlaylistTrackTitlePrimitiveProps<T>): JSX.Element;

/**
 * Props for the audio playlist track title component
 */
export declare type AudioPlaylistTrackTitlePrimitiveProps<T extends ElementType = 'span'> = {
    /** Element to render as @default span */
    as?: T;
} & ComponentPropsWithRef<T>;

export declare type AudioPlaylistTrackTitleProps<T extends ElementType = 'span'> = Omit<AudioPlaylistTrackTitlePrimitiveProps<T>, 'children'>;

/**
 * Color mode for the audio progress waveform, as string union
 */
declare type AudioProgressColorMode = (typeof AUDIO_PROGRESS_COLOR_MODES)[keyof typeof AUDIO_PROGRESS_COLOR_MODES];

export declare function AudioProgressWaveform(props: AudioProgressWaveformProps): JSX.Element;

export declare type AudioProgressWaveformProps = Omit<useAudioWaveformOptions, 'getBarColor'> & Omit<useAudioProgressWaveformColorOptions, 'dimensionsRef' | 'hoverPositionRef' | 'getIsHovering'> & Omit<useAnimationFrameOptions, 'callback'> & ComponentPropsWithRef<'canvas'> & useAudioProgressWaveformOptions;

declare type AudioTrackData = {
    id: string;
    title: string;
    src: string;
    author: string;
    thumbnail?: string;
};

export declare function AudioVisualizerFrequencyBars(props: AudioVisualizerFrequencyBarsProps): JSX.Element;

export declare type AudioVisualizerFrequencyBarsProps = Omit<ComponentPropsWithRef<'canvas'>, 'onResize'> & Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'> & useAudioVisualizerFrequencyBarOptions;

export declare function AudioVisualizerWaveform(props: AudioVisualizerWaveformProps): JSX.Element;

export declare type AudioVisualizerWaveformProps = Omit<ComponentPropsWithRef<'canvas'>, 'onResize'> & Omit<UseAudioAnalyzerOptions, 'dataType' | 'onAnalyze'> & useAudioVisualizerWaveformOptions;

export declare function AudioWaveform(props: AudioWaveformProps): JSX.Element;

export declare type AudioWaveformProps = ComponentPropsWithRef<'canvas'> & useAudioWaveformOptions;

export declare const Badge: ForwardRefExoticComponent<BadgeProps & RefAttributes<HTMLElement>>;

export declare interface BadgeProps extends HTMLAttributes<HTMLElement> {
    /** @default span */
    as?: ElementType;
    /** @default neutral */
    variant?: 'neutral' | 'danger' | 'warning' | 'success' | 'brand';
    /** @default md */
    size?: 'sm' | 'md' | 'lg';
}

declare type BarColorResult = string | {
    type: 'gradient';
    stops: GradientStop[];
};

/**
 * Result type for the waveform bar color
 */
declare type BarColorResult_2 = string | {
    type: 'gradient';
    stops: GradientStop_2[];
};

export declare function Button(props: ButtonProps): JSX.Element;

export declare type ButtonProps = CommonButtonProps & iconButtonAccessibleProps;

export declare function CanvasResponsive(props: CanvasResponsiveProps): JSX.Element;

declare type CanvasResponsiveProps = ComponentPropsWithRef<'canvas'> & {
    frameRate?: number;
    onResize?: () => void;
};

declare interface CommonButtonProps extends ComponentPropsWithRef<'button'> {
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

declare type ElementDimensions = {
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    x: number;
    y: number;
};

export declare function formatAudioDurationForDisplay(audioDurationInSeconds?: number): string;

declare type GradientStop = {
    /**
     * Position of the stop (0-1)
     */
    offset: number;
    /**
     * Color of the stop as a CSS color string
     */
    color: string;
};

declare type GradientStop_2 = {
    /**
     * Position of the stop (0-1)
     */
    offset: number;
    /**
     * Color of the stop as a CSS color string
     */
    color: string;
};

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

declare type MousePosition = {
    clientX: number | null;
    clientY: number | null;
    offsetX: number | null;
    offsetY: number | null;
};

declare type Size = (typeof sizes)[number];

declare const sizes: readonly ["md", "lg", "xl", "xxl"];

declare type useAnimationFrameOptions = {
    /**
     * Whether the animation should be running
     */
    isActive: boolean;
    /**
     * Callback function to execute on each animation frame
     */
    callback: (timestamp: number) => void;
    /**
     * Optional frame rate limit in frames per second
     * If not provided, runs at browser's native refresh rate
     */
    frameRate?: number;
    /**
     * Optional dependencies that should trigger a reset of the animation
     * when changed (similar to useEffect dependencies)
     */
    dependencies?: DependencyList;
    /**
     * Whether to automatically start/stop the animation based on isActive
     * If false, you must manually control the animation with start/stop methods
     * @default true
     */
    autoStart?: boolean;
};

declare type UseAudioAnalyzerOptions = Partial<AnalyserOptions> & {
    /**
     * Reference to the audio element
     */
    audioRef: React.RefObject<HTMLAudioElement | null>;
    /**
     * Reference to the shared AudioContext
     */
    audioContextRef: UseAudioContextWebAPIReturn['audioContextRef'];
    /**
     * Function to create an audio source node
     */
    createAudioSource: UseAudioContextWebAPIReturn['createAudioSource'];
    /**
     * Function to delete an audio source node
     */
    deleteAudioSource: UseAudioContextWebAPIReturn['deleteAudioSource'];
    /**
     * Whether the audio context has been initialized
     */
    isAudioContextReady: UseAudioContextWebAPIReturn['isReady'];
    /**
     * Whether the audio analyzer is active
     */
    isActive: boolean;
    /**
     * Audio duration in seconds
     */
    duration?: number;
    /**
     * Frame rate for the analysis in frames per second
     */
    frameRate?: number;
    /**
     * Callback that runs on each frame with the latest audio data
     */
    onAnalyze?: (dataArray: Uint8Array, analyzerNode: AnalyserNode) => void;
    /**
     * Type of data to retrieve
     */
    dataType?: 'timeDomain' | 'frequency';
    /**
     * Smoothing factor for transitions between frames (0-1)
     * Higher values create more gradual visual transitions
     * 0 = no smoothing, 1 = maximum smoothing
     */
    frameTransitionSmoothing?: number;
};

declare type UseAudioContextWebAPIReturn = {
    audioContextRef: RefObject<AudioContext | null>;
    createAudioSource: (audioElement: HTMLAudioElement) => MediaElementAudioSourceNode | void;
    deleteAudioSource: (audioElement: HTMLAudioElement) => boolean;
    isReady: boolean;
    sourceNodesRef: RefObject<Map<HTMLAudioElement, MediaElementAudioSourceNode>>;
};

export declare function useAudioPlayerContextPlayback(): AudioPlayerContextPlaybackType;

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

export declare function useAudioProgressWaveformColor(options: useAudioProgressWaveformColorOptions): useAudioProgressWaveformColorReturn;

export declare type useAudioProgressWaveformColorOptions = {
    /**
     * The duration of the audio to visualize
     */
    duration: number;
    /**
     * The audio element to visualize
     */
    audioRef: RefObject<HTMLAudioElement>;
    /**
     * The dimensions of the waveform
     */
    dimensionsRef: UseElementDimensionsReturn['dimensionsRef'];
    /**
     * The color of the progress bar
     */
    progressColor?: string;
    /**
     * The color of the waveform bars
     */
    barColor?: string;
    /**
     * The color of the waveform bars when hovered
     */
    hoverColor?: string;
    /**
     * The relative position (0-1) of the mouse on the waveform
     */
    hoverPositionRef?: useMousePositionRefReturn['positionRef'];
    /**
     * How much to adjust the progress color for hover effect
     * @default 0.15
     */
    hoverColorDelta?: number;
    /**
     * A function that returns whether the mouse is hovering over the waveform
     */
    getIsHovering?: useMousePositionRefReturn['getIsHovering'];
    /**
     * Color mode for the progress visualization
     * @default AUDIO_PROGRESS_COLOR_MODES.SOLID
     */
    colorMode?: AudioProgressColorMode;
    /**
     * Custom gradient stops for progressed bars when colorMode is GRADIENT
     * If not provided, stops will be generated based on progressColor and gradientLightnessDelta
     */
    gradientStops?: GradientStop_2[];
    /**
     * How much to adjust the lightness of the progress color for the gradient top
     * Positive values make it lighter, negative values make it darker
     * Only used when colorMode is GRADIENT and gradientStops are not provided
     * @default -0.15
     */
    gradientLightnessDelta?: number;
};

export declare type useAudioProgressWaveformColorReturn = {
    getWaveformBarColor: (barInfo: WaveformBarInfo) => BarColorResult_2;
};

declare type useAudioProgressWaveformOptions = {
    /**
     * The duration of the audio to visualize
     */
    duration: number;
    /**
     * The audio element to visualize
     */
    audioRef: RefObject<HTMLAudioElement>;
    /**
     * Callback fired when a seek operation is performed
     * @param time The time in seconds to seek to
     */
    onProgressChange?: (time: number) => void;
};

declare type useAudioVisualizerFrequencyBarOptions = {
    /**
     * Whether the frequency bars are active
     */
    isActive?: boolean;
    /**
     * Duration of the audio to visualize
     */
    duration?: number;
    /**
     * Color of the frequency bars
     * @default '#FFFFFF'
     */
    barColor?: string;
    /**
     * Number of frequency bars to display
     * Lower values will group frequencies together for broader analysis
     * @default 128
     */
    barCount?: number;
    /**
     * Gap between bars as a proportion of canvas width (0-1)
     * For example, 0.01 would make gaps 1% of the total width
     * Default is auto-calculated based on bar count
     * @default 0.004
     */
    barGapRatio?: number;
    /**
     * Height multiplier to enhance visualization
     * Higher values make bars taller
     * @default 1
     */
    heightMultiplier?: number;
    /**
     * Minimum height for bars as percentage of canvas height (0-1)
     * Ensures even quiet frequencies have visible presence
     * @default 0
     */
    minBarHeight?: number;
    /**
     * Minimum width for bars (in pixels)
     * @default 1
     */
    minBarWidth?: number;
    /**
     * Whether to use reactive color
     * @default 'static'
     */
    colorMode?: 'static' | 'frequency' | 'intensity' | 'spectrum' | 'dynamic';
    /**
     * Duration of the color transition in milliseconds
     * @default 1000
     */
    colorTransitionDuration?: number;
};

export declare function useAudioVisualizerWaveform(options?: useAudioVisualizerWaveformOptions): useAudioVisualizerWaveformReturn;

export declare type useAudioVisualizerWaveformOptions = {
    /**
     * Color of the waveform line
     */
    lineColor?: string;
    /**
     * Thickness of the waveform line
     */
    lineWidth?: number;
    /**
     * Coloring mode for the waveform
     */
    colorMode?: WaveformColorMode;
    /**
     * Number of colored segments to divide the waveform into
     * Higher values create more color transitions, lower values improve performance
     * Only applies when colorMode is not 'static'
     * @default 40
     */
    segmentCount?: number;
    /**
     * Duration of the color transition in milliseconds
     * @default 1000
     */
    colorTransitionDuration?: number;
    /**
     * Duration of the audio to visualize
     */
    duration?: number;
    /**
     * Whether the waveform is active
     */
    isActive?: boolean;
};

declare type useAudioVisualizerWaveformReturn = {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    drawWaveform: (dataArray: Uint8Array) => void;
};

declare type useAudioWaveformOptions = {
    /**
     * Waveform data array - normalized values between 0-1
     */
    waveformData: number[];
    /**
     * Color of the waveform
     */
    barColor?: string;
    /**
     * Function to determine bar color based on state
     */
    getBarColor?: (barInfo: WaveformBarInfo) => BarColorResult;
    /**
     * Gap between bars as a proportion of canvas width (0-1)
     * For example, 0.005 would make gaps 0.5% of the total width
     * @default 0.003 (0.3% of canvas width)
     */
    barGapRatio?: number;
    /**
     * Minimum gap between bars as a percentage of canvas width
     * @default 0.001 (0.1% of canvas width)
     */
    minBarGapPercent?: number;
    /**
     * Minimum width for bars (in pixels)
     * @default 1
     */
    minBarWidth?: number;
    /**
     * Height of the waveform as a percentage of canvas height
     * @default 1 (100% of canvas height)
     */
    heightScale?: number;
};

/**
 * Hook to create a canvas that automatically scales to its size and device pixel ratio
 */
export declare function useCanvasResponsive(options?: UseCanvasResponsiveOptions): {
    canvasRef: RefCallback<Element>;
};

/**
 * Options for the useCanvasResponsive hook
 */
declare type UseCanvasResponsiveOptions = {
    /**
     * Optional callback to be called when the canvas is resized
     */
    onResize?: () => void;
    /**
     * Optional frame rate limit for resize handling (fps)
     */
    frameRate?: number;
};

declare type UseElementDimensionsReturn = {
    dimensions: ElementDimensions;
    dimensionsRef: RefObject<ElementDimensions>;
    elementRef: (node: Element | null) => void;
};

declare type useMousePositionRefReturn = {
    getPosition: () => MousePosition;
    positionRef: RefObject<MousePosition>;
    handleMouseMove: (e: React.MouseEvent) => void;
    handleMouseLeave: () => void;
    getIsHovering: () => boolean;
};

declare type Variant = (typeof variants)[number];

declare const variants: readonly ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"];

declare const WAVEFORM_COLOR_MODES: {
    readonly STATIC: "static";
    readonly AMPLITUDE: "amplitude";
    readonly FREQUENCY: "frequency";
    readonly SPECTRUM: "spectrum";
    readonly DYNAMIC: "dynamic";
};

declare type WaveformBarInfo = {
    /**
     * Position in the waveform (0-1)
     */
    position: number;
    /**
     * Amplitude value (0-1)
     */
    value: number;
    /**
     * Index in the waveform data array
     */
    index: number;
    /**
     * Width of this specific bar as a percentage of total width (0-1)
     */
    width: number;
};

/**
 * Types of color modes available for the waveform
 */
declare type WaveformColorMode = (typeof WAVEFORM_COLOR_MODES)[keyof typeof WAVEFORM_COLOR_MODES];

export { }
