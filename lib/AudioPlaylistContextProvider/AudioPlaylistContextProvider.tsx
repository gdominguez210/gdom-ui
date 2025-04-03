'use client';

import { useState, useMemo, useCallback, useRef, type PropsWithChildren } from 'react';
import { AudioPlaylistContext } from './AudioPlaylistContext';

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
   * The id of the playlist, primarily used for accessibility attributes
   * @default 'audio-playlist'
   */
  id?: string;
};

/**
 * Provider component for managing playlist visibility state and references
 */
export function AudioPlaylistContextProvider(props: AudioPlaylistContextProviderProps) {
  const { children, defaultVisible = false, id = 'audio-playlist' } = props;
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(defaultVisible);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const expandableContainerRef = useRef<HTMLElement>(null);

  const togglePlaylist = useCallback(() => {
    setIsPlaylistVisible((prev) => !prev);
  }, []);

  const contextValue = useMemo(
    () => ({ isPlaylistVisible, togglePlaylist, toggleRef, expandableContainerRef, id }),
    [isPlaylistVisible, togglePlaylist, id],
  );

  return (
    <AudioPlaylistContext.Provider value={contextValue}>{children}</AudioPlaylistContext.Provider>
  );
}
