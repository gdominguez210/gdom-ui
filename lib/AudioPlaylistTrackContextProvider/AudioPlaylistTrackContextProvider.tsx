'use client';

import { type PropsWithChildren, useMemo, useCallback } from 'react';
import { AudioPlaylistTrackContext } from './AudioPlaylistTrackContext';
import { useAudioPlayerContextPlayback } from '@/lib/AudioPlayerContextPlaybackProvider/useAudioPlayerContextPlayback';
import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';
import type { AudioTrackData } from '@/lib/AudioPlayerContextTrackProvider/reducer';
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

  const { currentTrackIndex, setTrackIndex } = useAudioPlayerContextTrack();
  const { isPlaying, togglePlay, play } = useAudioPlayerContextPlayback();

  const onSelect = useCallback(() => {
    if (currentTrackIndex === index) {
      togglePlay();
      return;
    }

    setTrackIndex(index);
    play();
  }, [currentTrackIndex, index, togglePlay, setTrackIndex, play]);

  const contextValue = useMemo(
    () => ({
      active: currentTrackIndex === index,
      isPlaying,
      track,
      onSelect,
    }),
    [currentTrackIndex, index, isPlaying, track, onSelect],
  );

  return (
    <AudioPlaylistTrackContext.Provider value={contextValue}>
      {children}
    </AudioPlaylistTrackContext.Provider>
  );
}
