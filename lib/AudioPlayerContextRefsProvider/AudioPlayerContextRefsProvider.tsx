import { useMemo, useRef, type PropsWithChildren, memo } from 'react';
import { AudioPlayerContextRefs } from './AudioPlayerContextRefs';

export type AudioPlayerContextRefsProviderProps = PropsWithChildren;

function AudioPlayerContextRefsProvider(props: AudioPlayerContextRefsProviderProps) {
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

const AudioPlayerContextRefsProviderMemo = memo(AudioPlayerContextRefsProvider);
AudioPlayerContextRefsProviderMemo.displayName = 'AudioPlayerContextRefsProvider';
export { AudioPlayerContextRefsProviderMemo as AudioPlayerContextRefsProvider };
