'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlaylistContext = require('./useAudioPlaylistContext-B1FRcv_T.js');

function AudioPlaylistContextProvider(props) {
  const { children, defaultVisible = false, id = "audio-playlist" } = props;
  const [isPlaylistVisible, setIsPlaylistVisible] = React.useState(defaultVisible);
  const toggleRef = React.useRef(null);
  const expandableContainerRef = React.useRef(null);
  const togglePlaylist = React.useCallback(() => {
    setIsPlaylistVisible((prev) => !prev);
  }, []);
  const contextValue = React.useMemo(
    () => ({ isPlaylistVisible, togglePlaylist, toggleRef, expandableContainerRef, id }),
    [isPlaylistVisible, togglePlaylist, id]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(useAudioPlaylistContext.AudioPlaylistContext.Provider, { value: contextValue, children });
}

exports.AudioPlaylistContextProvider = AudioPlaylistContextProvider;
