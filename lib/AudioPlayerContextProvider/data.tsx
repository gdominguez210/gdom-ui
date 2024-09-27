import type { ReactNode } from 'react';
import { trackData } from '@lib/AudioPlayer/data';
import { AudioPlayerContextProvider } from '@lib/AudioPlayerContextProvider/AudioPlayerContextProvider';

export const AUDIO_PLAYER_CONTEXT_ERROR =
  'useAudioPlayerContext must be used within an AudioPlayerContextProvider';

export const AudioPlayerContextProviderWithTrackData = ({ children }: { children: ReactNode }) => (
  <AudioPlayerContextProvider tracks={trackData}>{children}</AudioPlayerContextProvider>
);
