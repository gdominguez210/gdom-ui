'use strict';

const AudioPlayerAuthor = require('./AudioPlayerAuthor-DBTgEdyt.js');
const AudioPlayerContextProvider = require('./AudioPlayerContextProvider-C2U4TjZX.js');
const AudioPlayerControls = require('./AudioPlayerControls-BcAQkbgN.js');
const AudioPlayerImage = require('./AudioPlayerImage-CX3aIzli.js');
const AudioPlayerInfo = require('./AudioPlayerInfo-B2i7l4l2.js');
const AudioPlayerProgressBar = require('./AudioPlayerProgressBar-BhapLQHl.js');
const AudioPlayerTime = require('./AudioPlayerTime-B4YaKkhQ.js');
const AudioPlayerTitle = require('./AudioPlayerTitle-DCDnuyeE.js');
const AudioPlayerVolume = require('./AudioPlayerVolume-DL12DVis.js');
const AudioPlayerVolumeButton = require('./AudioPlayerVolumeButton-EgsRwHAF.js');
const AudioPlayerVolumeSlider = require('./AudioPlayerVolumeSlider-oGX8_RkB.js');
const AudioPlayerControlAudio = require('./AudioPlayerControlAudio-CjXjj4UP.js');
const AudioPlayerControlPlay = require('./AudioPlayerControlPlay-DZwvdPED.js');
const AudioPlayerControlPrevious = require('./AudioPlayerControlPrevious-HIoxGA_e.js');
const AudioPlayerControlNext = require('./AudioPlayerControlNext-BC5UpcsG.js');
const AudioPlayerControlShuffle = require('./AudioPlayerControlShuffle-BgjyYCcw.js');
const AudioPlayerControlLoop = require('./AudioPlayerControlLoop-BqKWvVkJ.js');
const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');
const clsx = require('./clsx-BtxeOLZW.js');
const AudioPlayerContextAudioProvider = require('./AudioPlayerContextAudioProvider-BCCY-JlP.js');
const AudioPlayerVisualizerWaveform = require('./AudioPlayerVisualizerWaveform-BAyxv7FE.js');
const AudioPlayerVisualizerFrequencyBars = require('./AudioPlayerVisualizerFrequencyBars-CfKGBPqF.js');
const AudioPlayerProgressWaveform = require('./AudioPlayerProgressWaveform-DhdV08Il.js');

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
