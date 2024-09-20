import {
  useState,
  useMemo,
  createContext,
  useRef,
  type Dispatch,
  type SetStateAction,
  type RefObject,
  type ReactNode,
} from 'react';

export interface AudioTrackData {
  title: string;
  src: string;
  author: string;
  thumbnail?: string;
}

export interface AudioPlayerContextType {
  audioRef: RefObject<HTMLAudioElement>;
  currentTime: number;
  currentTrack: AudioTrackData | undefined;
  duration: number;
  isPlaying: boolean;
  progressBarRef: RefObject<HTMLInputElement>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  setCurrentTrackIndex: Dispatch<SetStateAction<number>>;
  setDuration: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  tracks: AudioTrackData[];
}

export const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export interface AudioPlayerContextProviderProps {
  /** @default 0 */
  defaultTrackIndex?: number;
  children: ReactNode;
  tracks: AudioTrackData[];
}

export function AudioPlayerContextProvider(props: AudioPlayerContextProviderProps) {
  const { children, defaultTrackIndex = 0, tracks = [] } = props;

  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(defaultTrackIndex);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const contextValue = useMemo(
    () => ({
      audioRef,
      progressBarRef,
      currentTime,
      duration,
      currentTrack: tracks[currentTrackIndex],
      isPlaying,
      setCurrentTrackIndex,
      setCurrentTime,
      setDuration,
      setIsPlaying,
      tracks,
    }),
    [currentTrackIndex, currentTime, duration, tracks, isPlaying],
  );

  return <AudioPlayerContext.Provider value={contextValue}>{children}</AudioPlayerContext.Provider>;
}
