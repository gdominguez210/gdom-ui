'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');
const clsx = require('./clsx-BtxeOLZW.js');
const AudioPlayerControlButton = require('./AudioPlayerControlButton-Dln4zNzP.js');
const IconVolumeMuteFill = require('./IconVolumeMuteFill-z5yBcSBn.js');
const IconVolumeDownFill = require('./IconVolumeDownFill-DUIOuwic.js');
const IconVolumeUpFill = require('./IconVolumeUpFill-wEsy3sT5.js');

function AudioPlayerVolumeButtonPrimitive(props) {
  const { iconName, title, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    AudioPlayerControlButton.AudioPlayerControlButton,
    {
      className: bundleMjs.twMerge(clsx.clsx("text-2xl", className)),
      title,
      ...restProps,
      children: [
        iconName === "volume-mute-fill" && /* @__PURE__ */ jsxRuntime.jsx(IconVolumeMuteFill.IconVolumeMuteFill, {}),
        iconName === "volume-down-fill" && /* @__PURE__ */ jsxRuntime.jsx(IconVolumeDownFill.IconVolumeDownFill, {}),
        iconName === "volume-up-fill" && /* @__PURE__ */ jsxRuntime.jsx(IconVolumeUpFill.IconVolumeUpFill, {})
      ]
    }
  );
}

const VOLUME_ICON_PROPERTIES = {
  MUTE: { name: "volume-mute-fill", label: "Volume Muted" },
  LOW: { name: "volume-down-fill", label: "Volume Low" },
  HIGH: { name: "volume-up-fill", label: "Volume High" }
};
function getVolumeIconProperties(volume, isMuted) {
  if (isMuted || volume < 5) return VOLUME_ICON_PROPERTIES.MUTE;
  if (volume >= 40) return VOLUME_ICON_PROPERTIES.HIGH;
  return VOLUME_ICON_PROPERTIES.LOW;
}
function AudioPlayerVolumeButton(props) {
  const { onClick, ...restProps } = props;
  const { mute, volume, toggleMute } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const handleClick = React.useCallback(
    (e) => {
      onClick?.(e);
      toggleMute();
    },
    [onClick, toggleMute]
  );
  const { name, label } = getVolumeIconProperties(volume, mute);
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerVolumeButtonPrimitive,
    {
      ...restProps,
      "aria-label": mute ? "Unmute" : "Mute",
      "aria-pressed": mute,
      onClick: handleClick,
      iconName: name,
      title: label
    }
  );
}

exports.AudioPlayerVolumeButton = AudioPlayerVolumeButton;
exports.AudioPlayerVolumeButtonPrimitive = AudioPlayerVolumeButtonPrimitive;
