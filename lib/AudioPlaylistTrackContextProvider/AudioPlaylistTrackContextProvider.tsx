'use client';

import { type PropsWithChildren, useMemo } from 'react';
import { AudioPlaylistTrackContext } from './AudioPlaylistTrackContext';
import { useAudioPlayerContextAudio } from '@lib/AudioPlayerContextAudioProvider/useAudioPlayerContextAudio';
import { useAudioPlayerContextTrack } from '@lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import type { AudioTrackData } from '@lib/AudioPlayerContextTrackProvider/reducer';
/**
 * Props for the AudioPlaylistTrack context provider
 */
export interface AudioPlaylistTrackContextProviderProps extends PropsWithChildren {
  /**
   * Index of the track in the playlist
   */
  index: number;
  /**
   * Track data
   */
  track: AudioTrackData;
}

/**
 * Provider component that makes track data and behavior available to all
 * child components within an AudioPlaylistTrack
 */
export function AudioPlaylistTrackContextProvider(props: AudioPlaylistTrackContextProviderProps) {
  const { children, index, track } = props;

  const { currentTrackIndex } = useAudioPlayerContextTrack();
  const { isPlaying, togglePlay } = useAudioPlayerContextAudio();

  const contextValue = useMemo(
    () => ({
      active: currentTrackIndex === index,
      isPlaying,
      track,
      togglePlay,
    }),
    [currentTrackIndex, index, isPlaying, togglePlay, track],
  );

  return (
    <AudioPlaylistTrackContext.Provider value={contextValue}>
      {children}
    </AudioPlaylistTrackContext.Provider>
  );
}
