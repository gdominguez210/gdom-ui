import { AudioPlayerAuthor } from '../AudioPlayerAuthor/AudioPlayerAuthor';
import { AudioPlayerContextProvider } from '../AudioPlayerContextProvider/AudioPlayerContextProvider';
import { AudioPlayerControls } from '../AudioPlayerControls/AudioPlayerControls';
import { AudioPlayerImage } from '../AudioPlayerImage/AudioPlayerImage';
import { AudioPlayerInfo } from '../AudioPlayerInfo/AudioPlayerInfo';
import { AudioPlayerProgressBar } from '../AudioPlayerProgressBar/AudioPlayerProgressBar';
import { AudioPlayerTime } from '../AudioPlayerTime/AudioPlayerTime';
import { AudioPlayerTitle } from '../AudioPlayerTitle/AudioPlayerTitle';
import { AudioPlayerVolume } from '../AudioPlayerVolume/AudioPlayerVolume';
import { AudioPlayerVolumeButton } from '../AudioPlayerVolumeButton/AudioPlayerVolumeButton';
import { AudioPlayerVolumeSlider } from '../AudioPlayerVolumeSlider/AudioPlayerVolumeSlider';
import { AudioPlayerControlAudio } from '../AudioPlayerControlAudio/AudioPlayerControlAudio';
import { AudioPlayerControlPlay } from '../AudioPlayerControlPlay/AudioPlayerControlPlay';
import { AudioPlayerControlPrevious } from '../AudioPlayerControlPrevious/AudioPlayerControlPrevious';
import { AudioPlayerControlNext } from '../AudioPlayerControlNext/AudioPlayerControlNext';
import { AudioPlayerControlShuffle } from '../AudioPlayerControlShuffle/AudioPlayerControlShuffle';
import { AudioPlayerControlLoop } from '../AudioPlayerControlLoop/AudioPlayerControlLoop';
import { AudioPlayer } from './AudioPlayer';
import { AudioPlayerContextAudioProvider } from '../AudioPlayerContextAudioProvider/AudioPlayerContextAudioProvider';
import { AudioPlayerVisualizerWaveform } from '../AudioPlayerVisualizerWaveform/AudioPlayerVisualizerWaveform';
import { AudioPlayerVisualizerFrequencyBars } from '../AudioPlayerVisualizerFrequencyBars/AudioPlayerVisualizerFrequencyBars';
import { AudioPlayerProgressWaveform } from '../AudioPlayerProgressWaveform/AudioPlayerProgressWaveform';
export declare const AudioPlayerCompoundComponent: {
    Root: typeof AudioPlayer & {
        displayName: string;
    };
    Provider: typeof AudioPlayerContextProvider & {
        displayName: string;
    };
    AudioContextProvider: typeof AudioPlayerContextAudioProvider & {
        displayName: string;
    };
    Author: typeof AudioPlayerAuthor & {
        displayName: string;
    };
    Controls: typeof AudioPlayerControls & {
        displayName: string;
    };
    Image: typeof AudioPlayerImage & {
        displayName: string;
    };
    Info: typeof AudioPlayerInfo & {
        displayName: string;
    };
    ProgressBar: typeof AudioPlayerProgressBar & {
        displayName: string;
    };
    Time: typeof AudioPlayerTime & {
        displayName: string;
    };
    Title: typeof AudioPlayerTitle & {
        displayName: string;
    };
    Volume: typeof AudioPlayerVolume & {
        displayName: string;
    };
    VolumeButton: typeof AudioPlayerVolumeButton & {
        displayName: string;
    };
    VolumeSlider: typeof AudioPlayerVolumeSlider & {
        displayName: string;
    };
    ControlAudio: typeof AudioPlayerControlAudio & {
        displayName: string;
    };
    ControlPlay: typeof AudioPlayerControlPlay & {
        displayName: string;
    };
    ControlPrevious: typeof AudioPlayerControlPrevious & {
        displayName: string;
    };
    ControlNext: typeof AudioPlayerControlNext & {
        displayName: string;
    };
    ControlShuffle: typeof AudioPlayerControlShuffle & {
        displayName: string;
    };
    ControlLoop: typeof AudioPlayerControlLoop & {
        displayName: string;
    };
    VisualizerWaveform: typeof AudioPlayerVisualizerWaveform & {
        displayName: string;
    };
    VisualizerFrequencyBars: typeof AudioPlayerVisualizerFrequencyBars & {
        displayName: string;
    };
    ProgressWaveform: typeof AudioPlayerProgressWaveform & {
        displayName: string;
    };
};
