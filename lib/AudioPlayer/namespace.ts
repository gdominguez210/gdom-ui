import { AudioPlayerAuthor } from '@/lib/AudioPlayerAuthor/AudioPlayerAuthor';
import { AudioPlayerContextProvider } from '@/lib/AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AudioPlayerControls } from '@/lib/AudioPlayerControls/AudioPlayerControls';
import { AudioPlayerImage } from '@/lib/AudioPlayerImage/AudioPlayerImage';
import { AudioPlayerInfo } from '@/lib/AudioPlayerInfo/AudioPlayerInfo';
import { AudioPlayerProgressBar } from '@/lib/AudioPlayerProgressBar/AudioPlayerProgressBar';
import { AudioPlayerTime } from '@/lib/AudioPlayerTime/AudioPlayerTime';
import { AudioPlayerTitle } from '@/lib/AudioPlayerTitle/AudioPlayerTitle';
import { AudioPlayerVolume } from '@/lib/AudioPlayerVolume/AudioPlayerVolume';
import { AudioPlayerVolumeButton } from '@/lib/AudioPlayerVolumeButton/AudioPlayerVolumeButton';
import { AudioPlayerVolumeSlider } from '@/lib/AudioPlayerVolumeSlider/AudioPlayerVolumeSlider';
import { AudioPlayerControlAudio } from '@/lib/AudioPlayerControlAudio/AudioPlayerControlAudio';
import { AudioPlayerControlPlay } from '@/lib/AudioPlayerControlPlay/AudioPlayerControlPlay';
import { AudioPlayerControlPrevious } from '@/lib/AudioPlayerControlPrevious/AudioPlayerControlPrevious';
import { AudioPlayerControlNext } from '@/lib/AudioPlayerControlNext/AudioPlayerControlNext';
import { AudioPlayerControlShuffle } from '@/lib/AudioPlayerControlShuffle/AudioPlayerControlShuffle';
import { AudioPlayerControlLoop } from '@/lib/AudioPlayerControlLoop/AudioPlayerControlLoop';
import { AudioPlayer } from '@/lib/AudioPlayer/AudioPlayer';
import { AudioPlayerContextAudioProvider } from '@/lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudioProvider';
import { AudioPlayerVisualizerWaveform } from '@/lib/AudioPlayerVisualizerWaveform/AudioPlayerVisualizerWaveform';
import { AudioPlayerVisualizerFrequencyBars } from '@/lib/AudioPlayerVisualizerFrequencyBars/AudioPlayerVisualizerFrequencyBars';
import { AudioPlayerProgressWaveform } from '@/lib/AudioPlayerProgressWaveform/AudioPlayerProgressWaveform';

// Create the namespace with Object.assign inline for each component
export const AudioPlayerCompoundComponent = {
  Root: Object.assign(AudioPlayer, { displayName: 'AudioPlayer.Root' }),
  Provider: Object.assign(AudioPlayerContextProvider, { displayName: 'AudioPlayer.Provider' }),
  AudioContextProvider: Object.assign(AudioPlayerContextAudioProvider, {
    displayName: 'AudioPlayer.AudioContextProvider',
  }),
  Author: Object.assign(AudioPlayerAuthor, { displayName: 'AudioPlayer.Author' }),
  Controls: Object.assign(AudioPlayerControls, { displayName: 'AudioPlayer.Controls' }),
  Image: Object.assign(AudioPlayerImage, { displayName: 'AudioPlayer.Image' }),
  Info: Object.assign(AudioPlayerInfo, { displayName: 'AudioPlayer.Info' }),
  ProgressBar: Object.assign(AudioPlayerProgressBar, { displayName: 'AudioPlayer.ProgressBar' }),
  Time: Object.assign(AudioPlayerTime, { displayName: 'AudioPlayer.Time' }),
  Title: Object.assign(AudioPlayerTitle, { displayName: 'AudioPlayer.Title' }),
  Volume: Object.assign(AudioPlayerVolume, { displayName: 'AudioPlayer.Volume' }),
  VolumeButton: Object.assign(AudioPlayerVolumeButton, { displayName: 'AudioPlayer.VolumeButton' }),
  VolumeSlider: Object.assign(AudioPlayerVolumeSlider, { displayName: 'AudioPlayer.VolumeSlider' }),
  ControlAudio: Object.assign(AudioPlayerControlAudio, { displayName: 'AudioPlayer.ControlAudio' }),
  ControlPlay: Object.assign(AudioPlayerControlPlay, { displayName: 'AudioPlayer.ControlPlay' }),
  ControlPrevious: Object.assign(AudioPlayerControlPrevious, {
    displayName: 'AudioPlayer.ControlPrevious',
  }),
  ControlNext: Object.assign(AudioPlayerControlNext, { displayName: 'AudioPlayer.ControlNext' }),
  ControlShuffle: Object.assign(AudioPlayerControlShuffle, {
    displayName: 'AudioPlayer.ControlShuffle',
  }),
  ControlLoop: Object.assign(AudioPlayerControlLoop, { displayName: 'AudioPlayer.ControlLoop' }),
  VisualizerWaveform: Object.assign(AudioPlayerVisualizerWaveform, {
    displayName: 'AudioPlayer.VisualizerWaveform',
  }),
  VisualizerFrequencyBars: Object.assign(AudioPlayerVisualizerFrequencyBars, {
    displayName: 'AudioPlayer.VisualizerFrequencyBars',
  }),
  ProgressWaveform: Object.assign(AudioPlayerProgressWaveform, {
    displayName: 'AudioPlayer.ProgressWaveform',
  }),
};
