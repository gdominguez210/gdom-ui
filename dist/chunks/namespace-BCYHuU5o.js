'use strict';

const AudioPlayerAuthor = require('./AudioPlayerAuthor-B6Byzvp1.js');
const AudioPlayerContextProvider = require('./AudioPlayerContextProvider-C2U4TjZX.js');
const AudioPlayerControls = require('./AudioPlayerControls-Bc9DdJPr.js');
const AudioPlayerImage = require('./AudioPlayerImage-C0kU7rTk.js');
const AudioPlayerInfo = require('./AudioPlayerInfo-CK4t9mec.js');
const AudioPlayerProgressBar = require('./AudioPlayerProgressBar-tHkssv9R.js');
const AudioPlayerTime = require('./AudioPlayerTime-BLng6yq5.js');
const AudioPlayerTitle = require('./AudioPlayerTitle-BbPbPGdP.js');
const AudioPlayerVolume = require('./AudioPlayerVolume-BFj268Rn.js');
const AudioPlayerVolumeButton = require('./AudioPlayerVolumeButton-DxgHGlxF.js');
const AudioPlayerVolumeSlider = require('./AudioPlayerVolumeSlider-dtwjSIkz.js');
const AudioPlayerControlAudio = require('./AudioPlayerControlAudio-CjXjj4UP.js');
const AudioPlayerControlPlay = require('./AudioPlayerControlPlay-COhx3RXV.js');
const AudioPlayerControlPrevious = require('./AudioPlayerControlPrevious-DGhnh_We.js');
const AudioPlayerControlNext = require('./AudioPlayerControlNext-Cj1vVGM3.js');
const AudioPlayerControlShuffle = require('./AudioPlayerControlShuffle-vkep9vtK.js');
const AudioPlayerControlLoop = require('./AudioPlayerControlLoop-Crd0jpmD.js');
const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const clsx = require('./clsx-BtxeOLZW.js');
const AudioPlayerContextAudioProvider = require('./AudioPlayerContextAudioProvider-BCCY-JlP.js');
const AudioPlayerVisualizerWaveform = require('./AudioPlayerVisualizerWaveform-msO7bXAk.js');
const AudioPlayerVisualizerFrequencyBars = require('./AudioPlayerVisualizerFrequencyBars-RarOkXmZ.js');
const AudioPlayerProgressWaveform = require('./AudioPlayerProgressWaveform-CEU7JJJt.js');

function AudioPlayer(props) {
  const { as: Element = "div", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(
        clsx.clsx(
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
