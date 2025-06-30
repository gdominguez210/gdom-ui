import { jsx } from 'react/jsx-runtime';
import { u as useAudioPlayerContextTrack } from './useAudioPlayerContextTrack-cY9WiuJR.js';
import { A as AudioPlayerTitlePrimitive } from './AudioPlayerTitlePrimitive-DbyhpYoc.js';

function AudioPlayerTitle(props) {
  const { currentTrack: { title } = {} } = useAudioPlayerContextTrack();
  if (!title) return null;
  return /* @__PURE__ */ jsx(
    AudioPlayerTitlePrimitive,
    {
      title,
      ...props,
      children: title
    }
  );
}

export { AudioPlayerTitle as A };
