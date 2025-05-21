'use strict';

const AudioPlayerAuthor = require('./AudioPlayerAuthor-C9TmpKGk.js');
const AudioPlayerContextProvider = require('./AudioPlayerContextProvider-C2U4TjZX.js');
const AudioPlayerControls = require('./AudioPlayerControls-BEEewZ3V.js');
const AudioPlayerImage = require('./AudioPlayerImage-Bd5Sdnac.js');
const AudioPlayerInfo = require('./AudioPlayerInfo-DFTcxUza.js');
const AudioPlayerProgressBar = require('./AudioPlayerProgressBar-BLuqZYJs.js');
const AudioPlayerTime = require('./AudioPlayerTime-Bxkn6bUW.js');
const AudioPlayerTitle = require('./AudioPlayerTitle-BU7tUS4w.js');
const AudioPlayerVolume = require('./AudioPlayerVolume-BdCzIGdU.js');
const AudioPlayerVolumeButton = require('./AudioPlayerVolumeButton-BhFAXmYY.js');
const AudioPlayerVolumeSlider = require('./AudioPlayerVolumeSlider-CxDZCeI9.js');
const AudioPlayerControlAudio = require('./AudioPlayerControlAudio-CjXjj4UP.js');
const AudioPlayerControlPlay = require('./AudioPlayerControlPlay-CrMaNmne.js');
const AudioPlayerControlPrevious = require('./AudioPlayerControlPrevious-C93yxyiC.js');
const AudioPlayerControlNext = require('./AudioPlayerControlNext-D9NNKT0c.js');
const AudioPlayerControlShuffle = require('./AudioPlayerControlShuffle-Z-ZWQJ9m.js');
const AudioPlayerControlLoop = require('./AudioPlayerControlLoop-b_vx9Bu_.js');
const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');
const AudioPlayerContextAudioProvider = require('./AudioPlayerContextAudioProvider-BCCY-JlP.js');
const AudioPlayerVisualizerWaveform = require('./AudioPlayerVisualizerWaveform-DUOb_Lsu.js');
const AudioPlayerVisualizerFrequencyBars = require('./AudioPlayerVisualizerFrequencyBars-ioRL8bnE.js');
const AudioPlayerProgressWaveform = require('./AudioPlayerProgressWaveform-BiqN33IN.js');

function AudioPlayer(props) {
  const { as: Element = "div", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(
        bundleMjs.clsx(
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
  Provider: Object.assign(AudioPlayerContextProvider.AudioPlayerContextProvider, { displayName: "AudioPlayer.Provider" }),
  AudioContextProvider: Object.assign(AudioPlayerContextAudioProvider.AudioPlayerContextAudioProvider, {
    displayName: "AudioPlayer.AudioContextProvider"
  }),
  Author: Object.assign(AudioPlayerAuthor.AudioPlayerAuthor, { displayName: "AudioPlayer.Author" }),
  Controls: Object.assign(AudioPlayerControls.AudioPlayerControls, { displayName: "AudioPlayer.Controls" }),
  Image: Object.assign(AudioPlayerImage.AudioPlayerImage, { displayName: "AudioPlayer.Image" }),
  Info: Object.assign(AudioPlayerInfo.AudioPlayerInfo, { displayName: "AudioPlayer.Info" }),
  ProgressBar: Object.assign(AudioPlayerProgressBar.AudioPlayerProgressBar, { displayName: "AudioPlayer.ProgressBar" }),
  Time: Object.assign(AudioPlayerTime.AudioPlayerTime, { displayName: "AudioPlayer.Time" }),
  Title: Object.assign(AudioPlayerTitle.AudioPlayerTitle, { displayName: "AudioPlayer.Title" }),
  Volume: Object.assign(AudioPlayerVolume.AudioPlayerVolume, { displayName: "AudioPlayer.Volume" }),
  VolumeButton: Object.assign(AudioPlayerVolumeButton.AudioPlayerVolumeButton, { displayName: "AudioPlayer.VolumeButton" }),
  VolumeSlider: Object.assign(AudioPlayerVolumeSlider.AudioPlayerVolumeSlider, { displayName: "AudioPlayer.VolumeSlider" }),
  ControlAudio: Object.assign(AudioPlayerControlAudio.AudioPlayerControlAudio, { displayName: "AudioPlayer.ControlAudio" }),
  ControlPlay: Object.assign(AudioPlayerControlPlay.AudioPlayerControlPlay, { displayName: "AudioPlayer.ControlPlay" }),
  ControlPrevious: Object.assign(AudioPlayerControlPrevious.AudioPlayerControlPrevious, {
    displayName: "AudioPlayer.ControlPrevious"
  }),
  ControlNext: Object.assign(AudioPlayerControlNext.AudioPlayerControlNext, { displayName: "AudioPlayer.ControlNext" }),
  ControlShuffle: Object.assign(AudioPlayerControlShuffle.AudioPlayerControlShuffle, {
    displayName: "AudioPlayer.ControlShuffle"
  }),
  ControlLoop: Object.assign(AudioPlayerControlLoop.AudioPlayerControlLoop, { displayName: "AudioPlayer.ControlLoop" }),
  VisualizerWaveform: Object.assign(AudioPlayerVisualizerWaveform.AudioPlayerVisualizerWaveform, {
    displayName: "AudioPlayer.VisualizerWaveform"
  }),
  VisualizerFrequencyBars: Object.assign(AudioPlayerVisualizerFrequencyBars.AudioPlayerVisualizerFrequencyBars, {
    displayName: "AudioPlayer.VisualizerFrequencyBars"
  }),
  ProgressWaveform: Object.assign(AudioPlayerProgressWaveform.AudioPlayerProgressWaveform, {
    displayName: "AudioPlayer.ProgressWaveform"
  })
};

exports.AudioPlayer = AudioPlayer;
exports.AudioPlayerCompoundComponent = AudioPlayerCompoundComponent;
