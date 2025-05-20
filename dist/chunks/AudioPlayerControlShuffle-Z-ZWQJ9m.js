'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');
const IconShuffleFill = require('./IconShuffleFill-BoHCECEZ.js');
const AudioPlayerControlButton = require('./AudioPlayerControlButton-BIqKuaeL.js');

function AudioPlayerControlShufflePrimitive(props) {
  const { active = false, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlButton.AudioPlayerControlButton,
    {
      className: bundleMjs.twMerge(
        bundleMjs.clsx(
          { "text-neutral-100/50": !active },
          "hover:text-neutral-100",
          "focus:text-neutral-100",
          className
        )
      ),
      "aria-label": "Toggle Shuffle",
      "aria-pressed": active,
      ...restProps,
      children: /* @__PURE__ */ jsxRuntime.jsx(IconShuffleFill.IconShuffleFill, { className: "scale-75" })
    }
  );
}

function AudioPlayerControlShuffle(props) {
  const { onClick, ...restProps } = props;
  const { shuffle, toggleShuffle } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const handleClick = React.useCallback(
    (e) => {
      toggleShuffle();
      onClick?.(e);
    },
    [toggleShuffle, onClick]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerControlShufflePrimitive,
    {
      active: shuffle,
      onClick: handleClick,
      ...restProps
    }
  );
}

exports.AudioPlayerControlShuffle = AudioPlayerControlShuffle;
exports.AudioPlayerControlShufflePrimitive = AudioPlayerControlShufflePrimitive;
