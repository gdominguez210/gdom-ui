'use client';

import { useState, useMemo, useCallback, useRef, type PropsWithChildren } from 'react';
import { AudioPlaylistContext } from './AudioPlaylistContext';
import { type AudioTrackData } from '@lib/AudioPlayerContextTrackProvider/reducer';
/**
 * Props for the audio playlist context provider
 */
export type AudioPlaylistContextProviderProps = PropsWithChildren & {
  /**
   * Whether the playlist is initially visible
   * @default false
   */
  defaultVisible?: boolean;
  /**
   * The tracks to display in the playlist
   */
  tracks: AudioTrackData[];
};

/**
 * Provider component for managing playlist visibility state and references
 */
export function AudioPlaylistContextProvider(props: AudioPlaylistContextProviderProps) {
  const { children, defaultVisible = false, tracks } = props;
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(defaultVisible);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const dismissRef = useRef<HTMLButtonElement>(null);

  const togglePlaylist = useCallback(() => {
    setIsPlaylistVisible((prev) => !prev);
  }, []);

  const contextValue = useMemo(
    () => ({ isPlaylistVisible, togglePlaylist, toggleRef, dismissRef, tracks }),
    [isPlaylistVisible, togglePlaylist, tracks],
  );

  return (
    <AudioPlaylistContext.Provider value={contextValue}>{children}</AudioPlaylistContext.Provider>
  );
}
