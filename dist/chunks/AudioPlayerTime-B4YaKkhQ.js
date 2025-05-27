'use strict';

const jsxRuntime = require('react/jsx-runtime');
const useAudioPlayerContextTime = require('./useAudioPlayerContextTime-BhBAi2PV.js');
const formatDurationForDisplay = require('./formatDurationForDisplay-CG8pgKOh.js');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');
const clsx = require('./clsx-BtxeOLZW.js');

function useAudioPlayerTime(props) {
  const { currentTime, duration } = props;
  return {
    currentTimeDisplay: formatDurationForDisplay.formatDurationForDisplay(currentTime),
    durationDisplay: formatDurationForDisplay.formatDurationForDisplay(duration)
  };
}

function AudioPlayerTimePrimitive(props) {
  const { as: Element = "span", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(
        clsx.clsx(
          "line-clamp-1 inline-block min-w-[6ch] truncate font-mono text-sm tabular-nums",
          className
        )
      ),
      ...restProps,
      children
    }
  );
}

function AudioPlayerTime(props) {
  const { currentTime, duration, previewTime } = useAudioPlayerContextTime.useAudioPlayerContextTime();
  const _currentTime = previewTime ?? currentTime;
  const { currentTimeDisplay, durationDisplay } = useAudioPlayerTime({
    currentTime: _currentTime,
    duration
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(AudioPlayerTimePrimitive, { ...props, children: [
    /* @__PURE__ */ jsxRuntime.jsx("span", { className: clsx.clsx(previewTime && "opacity-80"), children: currentTimeDisplay }),
    " /",
    " ",
    /* @__PURE__ */ jsxRuntime.jsx("span", { children: durationDisplay })
  ] });
}

exports.AudioPlayerTime = AudioPlayerTime;
exports.AudioPlayerTimePrimitive = AudioPlayerTimePrimitive;
exports.useAudioPlayerTime = useAudioPlayerTime;
