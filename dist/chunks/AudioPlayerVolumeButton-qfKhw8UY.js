import { jsxs, jsx } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';
import { A as AudioPlayerControlButton } from './AudioPlayerControlButton-CsltQ7lB.js';
import { I as IconVolumeMuteFill } from './IconVolumeMuteFill-DmfiYgQV.js';
import { I as IconVolumeDownFill } from './IconVolumeDownFill-B0bXgNLh.js';
import { I as IconVolumeUpFill } from './IconVolumeUpFill-DIpAFGc3.js';

function AudioPlayerVolumeButtonPrimitive(props) {
  const { iconName, title, className, ...restProps } = props;
  return /* @__PURE__ */ jsxs(
    AudioPlayerControlButton,
    {
      className: twMerge(clsx("text-2xl", className)),
      title,
      ...restProps,
      children: [
        iconName === "volume-mute-fill" && /* @__PURE__ */ jsx(IconVolumeMuteFill, {}),
        iconName === "volume-down-fill" && /* @__PURE__ */ jsx(IconVolumeDownFill, {}),
        iconName === "volume-up-fill" && /* @__PURE__ */ jsx(IconVolumeUpFill, {})
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
  const { mute, volume, toggleMute } = useAudioPlayerContextPlayback();
  const handleClick = useCallback(
    (e) => {
      onClick?.(e);
      toggleMute();
    },
    [onClick, toggleMute]
  );
  const { name, label } = getVolumeIconProperties(volume, mute);
  return /* @__PURE__ */ jsx(
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

export { AudioPlayerVolumeButton as A, AudioPlayerVolumeButtonPrimitive as a };
