import { AudioPlayerCompoundComponent as AudioPlayer } from '@/lib/AudioPlayer/namespace';
import { waveformData } from '@/data/waveformData';
import { trackData } from '@/data/trackData';
import {
  AudioPlayerProgressWaveform,
  type AudioPlayerProgressWaveformProps,
} from '@/lib/AudioPlayerProgressWaveform/AudioPlayerProgressWaveform';
import { useAudioPlayerContextTrack } from '@/lib/AudioPlayerContextTrackProvider/useAudioPlayerContextTrack';

function AudioPlayerProgressWaveformWithWaveformData(
  props: Omit<AudioPlayerProgressWaveformProps, 'waveformData'>,
) {
  const { currentTrack } = useAudioPlayerContextTrack();
  const currentTrackWaveformData = waveformData[currentTrack?.id ?? ''] || [];

  return (
    <AudioPlayerProgressWaveform
      {...props}
      waveformData={currentTrackWaveformData}
    />
  );
}

AudioPlayerProgressWaveformWithWaveformData.displayName = 'AudioProgressWaveform';

export function FeaturedAudioProgressWaveform(props: AudioPlayerProgressWaveformProps) {
  return (
    <AudioPlayer.Provider tracks={trackData}>
      <AudioPlayer.Root className="sb-unstyled @container/audio-player">
        <AudioPlayerProgressWaveformWithWaveformData
          className="h-[150px]"
          progressColor="#9f9fa9"
          colorMode="solid"
          {...props}
        />
        <div className="justify-space-between flex grow gap-4">
          <AudioPlayer.Info className="basis-1/3">
            <AudioPlayer.Image />
            <div className="p-2 @min-lg/audio-player:py-2">
              <AudioPlayer.Title />
              <AudioPlayer.Author />
              <AudioPlayer.Time />
            </div>
          </AudioPlayer.Info>
          <AudioPlayer.Controls className="basis-2/3 @min-lg/audio-player:gap-1 @min-lg/audio-player:text-2xl">
            <AudioPlayer.ControlAudio />
            <AudioPlayer.ControlLoop className="hidden @min-lg/audio-player:block" />
            <AudioPlayer.ControlPrevious />
            <AudioPlayer.ControlPlay />
            <AudioPlayer.ControlNext />
            <AudioPlayer.ControlShuffle className="hidden @min-lg/audio-player:block" />
          </AudioPlayer.Controls>
          <AudioPlayer.Volume className="ml-auto pr-4">
            <AudioPlayer.VolumeButton />
            <AudioPlayer.VolumeSlider />
          </AudioPlayer.Volume>
        </div>
      </AudioPlayer.Root>
    </AudioPlayer.Provider>
  );
}
