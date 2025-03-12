import { type PropsWithChildren } from 'react';
import { type AudioTrackData } from '@lib/AudioPlayerContextTrackProvider/AudioPlayerContextTrackProvider';
import { AudioPlayerContextRefsProvider } from '@lib/AudioPlayerContextRefsProvider/AudioPlayerContextRefsProvider';
import { AudioPlayerContextTrackProvider } from '@lib/AudioPlayerContextTrackProvider/AudioPlayerContextTrackProvider';
import { AudioPlayerContextTimeProvider } from '@lib/AudioPlayerContextTimeProvider/AudioPlayerContextTimeProvider';
import { AudioPlayerContextAudioProvider } from '@lib/AudioPlayerContextAudioProvider/AudioPlayerContextAudioProvider';

export interface AudioPlayerContextProviderProps extends PropsWithChildren {
  defaultTrackIndex?: number;
  defaultVolume?: number;
  defaultMute?: boolean;
  defaultShuffle?: boolean;
  defaultLoop?: boolean;
  tracks: AudioTrackData[];
}

export function AudioPlayerContextProvider({
  children,
  defaultTrackIndex,
  defaultVolume,
  defaultMute,
  defaultShuffle,
  defaultLoop,
  tracks,
}: AudioPlayerContextProviderProps) {
  return (
    <AudioPlayerContextRefsProvider>
      <AudioPlayerContextTrackProvider
        defaultTrackIndex={defaultTrackIndex}
        tracks={tracks}
      >
        <AudioPlayerContextTimeProvider>
          <AudioPlayerContextAudioProvider
            defaultVolume={defaultVolume}
            defaultMute={defaultMute}
            defaultShuffle={defaultShuffle}
            defaultLoop={defaultLoop}
          >
            {children}
          </AudioPlayerContextAudioProvider>
        </AudioPlayerContextTimeProvider>
      </AudioPlayerContextTrackProvider>
    </AudioPlayerContextRefsProvider>
  );
}
