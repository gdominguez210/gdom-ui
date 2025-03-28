'use client';

import { type PropsWithChildren } from 'react';
import { type AudioTrackData } from '@lib/AudioPlayerContextTrackProvider/reducer';
import { AudioPlayerContextRefsProvider } from '@lib/AudioPlayerContextRefsProvider/AudioPlayerContextRefsProvider';
import { AudioPlayerContextTrackProvider } from '@lib/AudioPlayerContextTrackProvider/AudioPlayerContextTrackProvider';
import { AudioPlayerContextTimeProvider } from '@lib/AudioPlayerContextTimeProvider/AudioPlayerContextTimeProvider';
import { AudioPlayerContextAudioProvider } from '@lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudioProvider';

/**
 * Props for the main audio player context provider
 */
export type AudioPlayerContextProviderProps = {
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
 * Main provider that composes all context providers needed for the audio player
 */
export function AudioPlayerContextProvider({
  children,
  defaultTrackIndex,
  defaultVolume,
  defaultMute,
  defaultShuffle,
  defaultLoop,
  tracks,
}: AudioPlayerContextProviderProps) {
  return (
    <AudioPlayerContextRefsProvider>
      <AudioPlayerContextTrackProvider
        defaultTrackIndex={defaultTrackIndex}
        tracks={tracks}
      >
        <AudioPlayerContextTimeProvider>
          <AudioPlayerContextAudioProvider
            defaultVolume={defaultVolume}
            defaultMute={defaultMute}
            defaultShuffle={defaultShuffle}
            defaultLoop={defaultLoop}
          >
            {children}
          </AudioPlayerContextAudioProvider>
        </AudioPlayerContextTimeProvider>
      </AudioPlayerContextTrackProvider>
    </AudioPlayerContextRefsProvider>
  );
}
