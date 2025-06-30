'use strict';

const jsxRuntime = require('react/jsx-runtime');
const AudioPlayerControlButton = require('./AudioPlayerControlButton-BmFswfI-.js');
const IconPauseLargeFill = require('./IconPauseLargeFill-BIbLpOPH.js');
const IconPlayLargeFill = require('./IconPlayLargeFill-DUi94csA.js');

function AudioPlayerControlPlayPrimitive(props) {
  const { active = false, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlButton.AudioPlayerControlButton,
    {
      "aria-label": active ? "Pause" : "Play",
      "aria-pressed": active,
      ...restProps,
      children: active ? /* @__PURE__ */ jsxRuntime.jsx(IconPauseLargeFill.IconPauseLargeFill, {}) : /* @__PURE__ */ jsxRuntime.jsx(IconPlayLargeFill.IconPlayLargeFill, {})
    }
  );
}

exports.AudioPlayerControlPlayPrimitive = AudioPlayerControlPlayPrimitive;
