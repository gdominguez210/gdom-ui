import { jsx } from 'react/jsx-runtime';
import { A as AudioPlayerControlButton } from './AudioPlayerControlButton-BOz7NgLV.js';
import { I as IconPauseLargeFill } from './IconPauseLargeFill-C8uJhWwp.js';
import { I as IconPlayLargeFill } from './IconPlayLargeFill-BLu7UEiT.js';

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
