import { useMemo, useRef, type PropsWithChildren } from 'react';
import { AudioPlayerContextRefs } from './AudioPlayerContextRefs';

/**
 * Props for the DOM references context provider
 */
export type AudioPlayerContextRefsProviderProps = PropsWithChildren;

/**
 * Provides references to important DOM elements used by the audio player
 */
export function AudioPlayerContextRefsProvider(props: AudioPlayerContextRefsProviderProps) {
  const { children } = props;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  const contextValue = useMemo(() => ({ audioRef, progressBarRef }), [audioRef, progressBarRef]);

  return (
    <AudioPlayerContextRefs.Provider value={contextValue}>
      {children}
    </AudioPlayerContextRefs.Provider>
  );
}
