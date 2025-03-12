import { useMemo, useRef, type PropsWithChildren } from 'react';
import { AudioPlayerContextRefs } from './AudioPlayerContextRefs';

export function AudioPlayerContextRefsProvider(props: PropsWithChildren) {
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
