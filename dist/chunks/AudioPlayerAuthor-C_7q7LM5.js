import { jsx } from 'react/jsx-runtime';
import { u as useAudioPlayerContextTrack } from './useAudioPlayerContextTrack-cY9WiuJR.js';
import { A as AudioPlayerAuthorPrimitive } from './AudioPlayerAuthorPrimitive-DbiueuXQ.js';

function AudioPlayerAuthor(props) {
  const { currentTrack: { author } = {} } = useAudioPlayerContextTrack();
  if (!author) return null;
  return /* @__PURE__ */ jsx(
    AudioPlayerAuthorPrimitive,
    {
      ...props,
      title: author,
      children: author
    }
  );
}

export { AudioPlayerAuthor as A };
