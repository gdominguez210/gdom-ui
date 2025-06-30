'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const AudioPlayerContextRefs = require('./AudioPlayerContextRefs-DHqMOcS8.js');

function AudioPlayerContextRefsProvider(props) {
  const { children } = props;
  const audioRef = React.useRef(null);
  const progressBarRef = React.useRef(null);
  const contextValue = React.useMemo(() => ({ audioRef, progressBarRef }), [audioRef, progressBarRef]);
  return /* @__PURE__ */ jsxRuntime.jsx(AudioPlayerContextRefs.AudioPlayerContextRefs.Provider, { value: contextValue, children });
}

exports.AudioPlayerContextRefsProvider = AudioPlayerContextRefsProvider;
