import { jsx } from 'react/jsx-runtime';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { A as AudioPlayerAuthorPrimitive } from './AudioPlayerAuthorPrimitive-DbiueuXQ.js';
import { u as useAudioPlaylistTrackContext } from './useAudioPlaylistTrackContext-DJcdpyEq.js';

function AudioPlaylistTrackAuthorPrimitive(props) {
  const { as, className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerAuthorPrimitive,
    {
      as,
      className: twMerge(clsx("text-xs", className)),
      ...restProps,
      children
    }
  );
}

function AudioPlaylistTrackAuthor(props) {
  const {
    track: { author }
  } = useAudioPlaylistTrackContext();
  return /* @__PURE__ */ jsx(AudioPlaylistTrackAuthorPrimitive, { ...props, children: author });
}

export { AudioPlaylistTrackAuthor as A, AudioPlaylistTrackAuthorPrimitive as a };
