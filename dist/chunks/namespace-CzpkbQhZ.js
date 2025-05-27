import { A as AudioPlayerAuthor } from './AudioPlayerAuthor-BBycZ6Lm.js';
import { A as AudioPlayerContextProvider } from './AudioPlayerContextProvider-BKvQlk55.js';
import { A as AudioPlayerControls } from './AudioPlayerControls-DioYqCnv.js';
import { A as AudioPlayerImage } from './AudioPlayerImage-CPs8XPnY.js';
import { A as AudioPlayerInfo } from './AudioPlayerInfo-D6mEczht.js';
import { A as AudioPlayerProgressBar } from './AudioPlayerProgressBar-C2oQhsiE.js';
import { A as AudioPlayerTime } from './AudioPlayerTime-BiVggrX2.js';
import { A as AudioPlayerTitle } from './AudioPlayerTitle-37BxUk1m.js';
import { A as AudioPlayerVolume } from './AudioPlayerVolume-B7cy5z8X.js';
import { A as AudioPlayerVolumeButton } from './AudioPlayerVolumeButton-DwLeiha1.js';
import { A as AudioPlayerVolumeSlider } from './AudioPlayerVolumeSlider-g7kp8oil.js';
import { A as AudioPlayerControlAudio } from './AudioPlayerControlAudio-CkqTD3Cb.js';
import { A as AudioPlayerControlPlay } from './AudioPlayerControlPlay-1RK8q_BX.js';
import { A as AudioPlayerControlPrevious } from './AudioPlayerControlPrevious-C6xJ7SXG.js';
import { A as AudioPlayerControlNext } from './AudioPlayerControlNext-BHCFUYhN.js';
import { A as AudioPlayerControlShuffle } from './AudioPlayerControlShuffle--vJcWJCN.js';
import { A as AudioPlayerControlLoop } from './AudioPlayerControlLoop-D3hDaOWo.js';
import { jsx } from 'react/jsx-runtime';
import { t as twMerge } from './bundle-mjs-BBFHkixS.js';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { A as AudioPlayerContextAudioProvider } from './AudioPlayerContextAudioProvider-aiIvYh96.js';
import { A as AudioPlayerVisualizerWaveform } from './AudioPlayerVisualizerWaveform-C4U476Ir.js';
import { A as AudioPlayerVisualizerFrequencyBars } from './AudioPlayerVisualizerFrequencyBars-ZzgzrWG2.js';
import { A as AudioPlayerProgressWaveform } from './AudioPlayerProgressWaveform-DaCBeq0x.js';

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
