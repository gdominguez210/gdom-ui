'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const useAudioPlayerContextRefs = require('./useAudioPlayerContextRefs-c-7Q5bUc.js');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');
const clsx = require('./clsx-BtxeOLZW.js');

function AudioPlayerVolumeSliderPrimitive(props) {
  const { className, min = 0, max = 100, value, orientation = "horizontal", ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      className: bundleMjs.twMerge(
        clsx.clsx(
          "[--volume-value:0%]",
          "appearance-none",
          "bg-gray-500",
          "relative",
          "cursor-pointer",
          "focus-within:outline-white",
          orientation === "horizontal" ? ["w-full", "h-2"] : ["[writing-mode:bt-lr]", "[appearance:slider-vertical]", "h-32", "w-2"],
          // Progress bar styles
          "before:block",
          "before:w-(--volume-value)",
          "before:bg-neutral-100",
          `before:content-['']`,
          "before:absolute",
          "before:top-0",
          "before:left-0",
          "before:h-full",
          // WebKit track styles
          "[&::-webkit-slider-runnable-track]:bg-transparent",
          "[&::-webkit-slider-runnable-track]:appearance-none",
          "[&::-webkit-slider-runnable-track]:shadow-none",
          "[&::-webkit-slider-runnable-track]:border-transparent",
          // WebKit thumb (hidden)
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:w-0",
          "[&::-webkit-slider-thumb]:h-0",
          "[&::-webkit-slider-thumb]:border-none",
          // Firefox track styles
          "[&::-moz-range-track]:bg-transparent",
          "[&::-moz-range-track]:appearance-none",
          "[&::-moz-range-track]:border-none",
          "[&::-moz-range-progress]:appearance-none",
          "[&::-moz-range-progress]:bg-neutral-100",
          "[&::-moz-range-progress]:h-2",
          // Firefox thumb (hidden)
          "[&::-moz-range-thumb]:appearance-none",
          "[&::-moz-range-thumb]:w-0",
          "[&::-moz-range-thumb]:h-0",
          "[&::-moz-range-thumb]:border-none",
          // IE/Edge track styles
          "[&::-ms-track]:bg-transparent",
          "[&::-ms-track]:appearance-none",
          "[&::-ms-track]:border-none",
          "[&::-ms-fill-lower]:bg-neutral-100",
          "[&::-ms-fill-upper]:bg-gray-500",
          // IE/Edge thumb (hidden)
          "[&::-ms-thumb]:appearance-none",
          "[&::-ms-thumb]:w-0",
          "[&::-ms-thumb]:h-0",
          "[&::-ms-thumb]:border-none",
          className
        )
      ),
      type: "range",
      min,
      max,
      value,
      "aria-label": "Volume Control",
      role: "slider",
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-valuetext": `Volume ${value}%`,
      "aria-orientation": orientation,
      style: { "--volume-value": `${value}%` },
      ...restProps
    }
  );
}

function updateAudioVolume(audio, volume) {
  if (!audio) return;
  audio.volume = volume / 100;
}
function AudioPlayerVolumeSlider(props) {
  const { onChange, ...restProps } = props;
  const { volume, setVolume } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const { audioRef } = useAudioPlayerContextRefs.useAudioPlayerContextRefs();
  const handleVolumeChange = React.useCallback(
    (e) => {
      const newVolume = Number(e.target.value);
      setVolume(newVolume);
      onChange?.(e);
      updateAudioVolume(audioRef.current, newVolume);
    },
    [onChange, setVolume, audioRef]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerVolumeSliderPrimitive,
    {
      ...restProps,
      value: volume,
      onChange: handleVolumeChange
    }
  );
}

exports.AudioPlayerVolumeSlider = AudioPlayerVolumeSlider;
exports.AudioPlayerVolumeSliderPrimitive = AudioPlayerVolumeSliderPrimitive;
