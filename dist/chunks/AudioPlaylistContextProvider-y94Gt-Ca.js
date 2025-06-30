import { jsx } from 'react/jsx-runtime';
import { useState, useRef, useCallback, useMemo } from 'react';
import { A as AudioPlaylistContext } from './useAudioPlaylistContext-CslAPyjC.js';

function AudioPlaylistContextProvider(props) {
  const { children, defaultVisible = false, id = "audio-playlist" } = props;
  const [isPlaylistVisible, setIsPlaylistVisible] = useState(defaultVisible);
  const toggleRef = useRef(null);
  const expandableContainerRef = useRef(null);
  const togglePlaylist = useCallback(() => {
    setIsPlaylistVisible((prev) => !prev);
  }, []);
  const contextValue = useMemo(
    () => ({ isPlaylistVisible, togglePlaylist, toggleRef, expandableContainerRef, id }),
    [isPlaylistVisible, togglePlaylist, id]
  );
  return /* @__PURE__ */ jsx(AudioPlaylistContext.Provider, { value: contextValue, children });
}

export { AudioPlaylistContextProvider as A };
