import { jsx } from 'react/jsx-runtime';
import { u as useAudioPlayerContextTrack } from './useAudioPlayerContextTrack-cY9WiuJR.js';
import { A as AudioPlayerImagePrimitive } from './AudioPlayerImagePrimitive-BDcZ_8_o.js';

function AudioPlayerImage(props) {
  const { currentTrack: { thumbnail, title } = {} } = useAudioPlayerContextTrack();
  return /* @__PURE__ */ jsx(
    AudioPlayerImagePrimitive,
    {
      ...props,
      src: thumbnail,
      altText: title ? `${title} thumbnail` : ""
    }
  );
}

export { AudioPlayerImage as A };
