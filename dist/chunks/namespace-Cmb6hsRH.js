import { A as AudioPlayerAuthor } from './AudioPlayerAuthor-1eZHa9Vu.js';
import { A as AudioPlayerContextProvider } from './AudioPlayerContextProvider-BKvQlk55.js';
import { A as AudioPlayerControls } from './AudioPlayerControls-jb6DfQpQ.js';
import { A as AudioPlayerImage } from './AudioPlayerImage-BZ6lKC7u.js';
import { A as AudioPlayerInfo } from './AudioPlayerInfo-BTaqxDR_.js';
import { A as AudioPlayerProgressBar } from './AudioPlayerProgressBar-CMSsF6LZ.js';
import { A as AudioPlayerTime } from './AudioPlayerTime-BpjZzQhH.js';
import { A as AudioPlayerTitle } from './AudioPlayerTitle-Ds1at8Tw.js';
import { A as AudioPlayerVolume } from './AudioPlayerVolume-CEnyI3xg.js';
import { A as AudioPlayerVolumeButton } from './AudioPlayerVolumeButton-qfKhw8UY.js';
import { A as AudioPlayerVolumeSlider } from './AudioPlayerVolumeSlider-CcuIdVrw.js';
import { A as AudioPlayerControlAudio } from './AudioPlayerControlAudio-CkqTD3Cb.js';
import { A as AudioPlayerControlPlay } from './AudioPlayerControlPlay-ePWNpRa0.js';
import { A as AudioPlayerControlPrevious } from './AudioPlayerControlPrevious-gyI25hn7.js';
import { A as AudioPlayerControlNext } from './AudioPlayerControlNext-GnbKxE_-.js';
import { A as AudioPlayerControlShuffle } from './AudioPlayerControlShuffle-CgoEpSHw.js';
import { A as AudioPlayerControlLoop } from './AudioPlayerControlLoop-Ba2RVJwJ.js';
import { jsx } from 'react/jsx-runtime';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';
import { A as AudioPlayerContextAudioProvider } from './AudioPlayerContextAudioProvider-aiIvYh96.js';
import { A as AudioPlayerVisualizerWaveform } from './AudioPlayerVisualizerWaveform-tlBB1yVi.js';
import { A as AudioPlayerVisualizerFrequencyBars } from './AudioPlayerVisualizerFrequencyBars-Cb03lqzA.js';
import { A as AudioPlayerProgressWaveform } from './AudioPlayerProgressWaveform-CzpydCVL.js';

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
