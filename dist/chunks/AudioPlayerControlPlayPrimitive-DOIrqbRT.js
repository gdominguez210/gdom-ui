import { jsx } from 'react/jsx-runtime';
import { A as AudioPlayerControlButton } from './AudioPlayerControlButton-BipoFLlY.js';
import { I as IconPauseLargeFill } from './IconPauseLargeFill-B_E8EWb3.js';
import { I as IconPlayLargeFill } from './IconPlayLargeFill-DKUrmo9o.js';

function AudioPlayerControlPlayPrimitive(props) {
  const { active = false, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      "aria-label": active ? "Pause" : "Play",
      "aria-pressed": active,
      ...restProps,
      children: active ? /* @__PURE__ */ jsx(IconPauseLargeFill, {}) : /* @__PURE__ */ jsx(IconPlayLargeFill, {})
    }
  );
}

export { AudioPlayerControlPlayPrimitive as A };
