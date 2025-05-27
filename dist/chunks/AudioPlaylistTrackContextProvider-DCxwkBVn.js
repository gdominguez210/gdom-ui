'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlaylistTrackContext = require('./useAudioPlaylistTrackContext-CIWKsUBJ.js');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const useAudioPlayerContextTrack = require('./useAudioPlayerContextTrack-CAXCg0ao.js');

function AudioPlaylistTrackContextProvider(props) {
  const { children, index, track } = props;
  const { currentTrackIndex, setTrackIndex } = useAudioPlayerContextTrack.useAudioPlayerContextTrack();
  const { isPlaying, togglePlay, play } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const onSelect = React.useCallback(() => {
    if (currentTrackIndex === index) {
      togglePlay();
      return;
    }
    setTrackIndex(index);
    play();
  }, [currentTrackIndex, index, togglePlay, setTrackIndex, play]);
  const contextValue = React.useMemo(
    () => ({
      active: currentTrackIndex === index,
      isPlaying,
      track,
      onSelect
    }),
    [currentTrackIndex, index, isPlaying, track, onSelect]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(useAudioPlaylistTrackContext.AudioPlaylistTrackContext.Provider, { value: contextValue, children });
}

exports.AudioPlaylistTrackContextProvider = AudioPlaylistTrackContextProvider;
