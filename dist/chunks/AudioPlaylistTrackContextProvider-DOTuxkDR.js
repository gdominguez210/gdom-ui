import { jsx } from 'react/jsx-runtime';
import { useCallback, useMemo } from 'react';
import { A as AudioPlaylistTrackContext } from './useAudioPlaylistTrackContext-DJcdpyEq.js';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { u as useAudioPlayerContextTrack } from './useAudioPlayerContextTrack-cY9WiuJR.js';

function AudioPlaylistTrackContextProvider(props) {
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
      onSelect
    }),
    [currentTrackIndex, index, isPlaying, track, onSelect]
  );
  return /* @__PURE__ */ jsx(AudioPlaylistTrackContext.Provider, { value: contextValue, children });
}

export { AudioPlaylistTrackContextProvider as A };
