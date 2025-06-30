import { A as AudioPlayerAuthor } from './AudioPlayerAuthor-C_7q7LM5.js';
import { A as AudioPlayerContextProvider } from './AudioPlayerContextProvider-BKvQlk55.js';
import { A as AudioPlayerControls } from './AudioPlayerControls-CzxBHN1L.js';
import { A as AudioPlayerImage } from './AudioPlayerImage-B39iT5SY.js';
import { A as AudioPlayerInfo } from './AudioPlayerInfo-BOrpSYse.js';
import { A as AudioPlayerProgressBar } from './AudioPlayerProgressBar-CcnCaLFG.js';
import { A as AudioPlayerTime } from './AudioPlayerTime-BCAhy_oh.js';
import { A as AudioPlayerTitle } from './AudioPlayerTitle-CB1maEba.js';
import { A as AudioPlayerVolume } from './AudioPlayerVolume-BD7DZhD5.js';
import { A as AudioPlayerVolumeButton } from './AudioPlayerVolumeButton-E8wZOx6t.js';
import { A as AudioPlayerVolumeSlider } from './AudioPlayerVolumeSlider-C1Igc-gU.js';
import { A as AudioPlayerControlAudio } from './AudioPlayerControlAudio-CkqTD3Cb.js';
import { A as AudioPlayerControlPlay } from './AudioPlayerControlPlay-5bALjx4T.js';
import { A as AudioPlayerControlPrevious } from './AudioPlayerControlPrevious-CjkYQ9D3.js';
import { A as AudioPlayerControlNext } from './AudioPlayerControlNext-BLcEzdYx.js';
import { A as AudioPlayerControlShuffle } from './AudioPlayerControlShuffle-DpflJi-Z.js';
import { A as AudioPlayerControlLoop } from './AudioPlayerControlLoop-Btmtk0kH.js';
import { jsx } from 'react/jsx-runtime';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { A as AudioPlayerContextAudioProvider } from './AudioPlayerContextAudioProvider-aiIvYh96.js';
import { A as AudioPlayerVisualizerWaveform } from './AudioPlayerVisualizerWaveform-MjfgHf8N.js';
import { A as AudioPlayerVisualizerFrequencyBars } from './AudioPlayerVisualizerFrequencyBars-C5TTtZDe.js';
import { A as AudioPlayerProgressWaveform } from './AudioPlayerProgressWaveform-B3cKDUAp.js';

function AudioPlayer(props) {
  const { as: Element = "div", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "flex flex-col justify-center overflow-hidden rounded-md bg-slate-700 text-neutral-100"
        ),
        className
      ),
      tabIndex: -1,
      ...restProps,
      children
    }
  );
}

const AudioPlayerCompoundComponent = {
  Root: Object.assign(AudioPlayer, { displayName: "AudioPlayer.Root" }),
  Provider: Object.assign(AudioPlayerContextProvider, { displayName: "AudioPlayer.Provider" }),
  AudioContextProvider: Object.assign(AudioPlayerContextAudioProvider, {
    displayName: "AudioPlayer.AudioContextProvider"
  }),
  Author: Object.assign(AudioPlayerAuthor, { displayName: "AudioPlayer.Author" }),
  Controls: Object.assign(AudioPlayerControls, { displayName: "AudioPlayer.Controls" }),
  Image: Object.assign(AudioPlayerImage, { displayName: "AudioPlayer.Image" }),
  Info: Object.assign(AudioPlayerInfo, { displayName: "AudioPlayer.Info" }),
  ProgressBar: Object.assign(AudioPlayerProgressBar, { displayName: "AudioPlayer.ProgressBar" }),
  Time: Object.assign(AudioPlayerTime, { displayName: "AudioPlayer.Time" }),
  Title: Object.assign(AudioPlayerTitle, { displayName: "AudioPlayer.Title" }),
  Volume: Object.assign(AudioPlayerVolume, { displayName: "AudioPlayer.Volume" }),
  VolumeButton: Object.assign(AudioPlayerVolumeButton, { displayName: "AudioPlayer.VolumeButton" }),
  VolumeSlider: Object.assign(AudioPlayerVolumeSlider, { displayName: "AudioPlayer.VolumeSlider" }),
  ControlAudio: Object.assign(AudioPlayerControlAudio, { displayName: "AudioPlayer.ControlAudio" }),
  ControlPlay: Object.assign(AudioPlayerControlPlay, { displayName: "AudioPlayer.ControlPlay" }),
  ControlPrevious: Object.assign(AudioPlayerControlPrevious, {
    displayName: "AudioPlayer.ControlPrevious"
  }),
  ControlNext: Object.assign(AudioPlayerControlNext, { displayName: "AudioPlayer.ControlNext" }),
  ControlShuffle: Object.assign(AudioPlayerControlShuffle, {
    displayName: "AudioPlayer.ControlShuffle"
  }),
  ControlLoop: Object.assign(AudioPlayerControlLoop, { displayName: "AudioPlayer.ControlLoop" }),
  VisualizerWaveform: Object.assign(AudioPlayerVisualizerWaveform, {
    displayName: "AudioPlayer.VisualizerWaveform"
  }),
  VisualizerFrequencyBars: Object.assign(AudioPlayerVisualizerFrequencyBars, {
    displayName: "AudioPlayer.VisualizerFrequencyBars"
  }),
  ProgressWaveform: Object.assign(AudioPlayerProgressWaveform, {
    displayName: "AudioPlayer.ProgressWaveform"
  })
};

export { AudioPlayerCompoundComponent as A, AudioPlayer as a };
