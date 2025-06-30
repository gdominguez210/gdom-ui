'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');
const IconRepeatOneFill = require('./IconRepeatOneFill-C-JzC_4a.js');
const IconRepeat2Fill = require('./IconRepeat2Fill-BHfsajda.js');
const AudioPlayerControlButton = require('./AudioPlayerControlButton-BmFswfI-.js');

function AudioPlayerControlLoopPrimitive(props) {
  const { active = false, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlButton.AudioPlayerControlButton,
    {
      className: bundleMjs.twMerge(
        clsx.clsx(
          { "text-neutral-100/50": !active },
          "hover:text-neutral-100",
          "focus-within:text-neutral-100",
          className
        )
      ),
      "aria-label": "Toggle Loop",
      "aria-pressed": active,
      ...restProps,
      children: active ? /* @__PURE__ */ jsxRuntime.jsx(IconRepeatOneFill.IconRepeatOneFill, { className: "scale-75" }) : /* @__PURE__ */ jsxRuntime.jsx(IconRepeat2Fill.IconRepeat2Fill, { className: "scale-75" })
    }
  );
}

function AudioPlayerControlLoop(props) {
  const { onClick, ...restProps } = props;
  const { loop, toggleLoop } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const handleClick = React.useCallback(
    (e) => {
      toggleLoop();
      onClick?.(e);
    },
    [toggleLoop, onClick]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlLoopPrimitive,
    {
      active: loop,
      onClick: handleClick,
      ...restProps
    }
  );
}

exports.AudioPlayerControlLoop = AudioPlayerControlLoop;
exports.AudioPlayerControlLoopPrimitive = AudioPlayerControlLoopPrimitive;
