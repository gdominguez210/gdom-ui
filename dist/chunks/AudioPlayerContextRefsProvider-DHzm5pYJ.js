import { jsx } from 'react/jsx-runtime';
import { useRef, useMemo } from 'react';
import { A as AudioPlayerContextRefs } from './AudioPlayerContextRefs-xp3NvrV9.js';

function AudioPlayerContextRefsProvider(props) {
  const { children } = props;
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const contextValue = useMemo(() => ({ audioRef, progressBarRef }), [audioRef, progressBarRef]);
  return /* @__PURE__ */ jsx(AudioPlayerContextRefs.Provider, { value: contextValue, children });
}

export { AudioPlayerContextRefsProvider as A };
