import {
  useMemo,
  createContext,
  useRef,
  useReducer,
  type Dispatch,
  type RefObject,
  type ReactNode,
} from 'react';
import { AUDIO_PLAYER_ACTIONS } from './data';

type ActionPayloads = {
  [AUDIO_PLAYER_ACTIONS.SET_CURRENT_TRACK_INDEX]: { currentTrackIndex: number };
  [AUDIO_PLAYER_ACTIONS.SET_CURRENT_TIME]: { currentTime: number };
  [AUDIO_PLAYER_ACTIONS.SET_DURATION]: { duration: number };
  [AUDIO_PLAYER_ACTIONS.SET_IS_PLAYING]: { isPlaying: boolean | 'toggle' };
  [AUDIO_PLAYER_ACTIONS.SET_VOLUME]: { volume: number };
  [AUDIO_PLAYER_ACTIONS.SET_MUTE]: { mute: boolean | 'toggle' };
};

type ReducerAction = {
  [K in keyof ActionPayloads]: ActionPayloads[K] extends undefined
    ? { type: K }
    : { type: K; payload: ActionPayloads[K] };
}[keyof ActionPayloads];

type State = {
  currentTrackIndex: number;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  mute: boolean;
};

function getInitialState(defaultTrackIndex: number, defaultVolume: number): State {
  return {
    currentTrackIndex: defaultTrackIndex,
    currentTime: 0,
    duration: 0,
    isPlaying: false,
    volume: defaultVolume,
    mute: false,
  };
}

function audioPlayerReducer(state: State, action: ReducerAction) {
  switch (action.type) {
    case AUDIO_PLAYER_ACTIONS.SET_CURRENT_TIME:
      return { ...state, ...action.payload };
    case AUDIO_PLAYER_ACTIONS.SET_CURRENT_TRACK_INDEX:
      return { ...state, ...action.payload };
    case AUDIO_PLAYER_ACTIONS.SET_DURATION:
      return { ...state, ...action.payload };
    case AUDIO_PLAYER_ACTIONS.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying:
          action.payload.isPlaying === 'toggle' ? !state.isPlaying : action.payload.isPlaying,
      };
    case AUDIO_PLAYER_ACTIONS.SET_VOLUME:
      return { ...state, ...action.payload };
    case AUDIO_PLAYER_ACTIONS.SET_MUTE:
      return {
        ...state,
        mute: action.payload.mute === 'toggle' ? !state.mute : action.payload.mute,
      };
    default:
      return state;
  }
}

export interface AudioTrackData {
  title: string;
  src: string;
  author: string;
  thumbnail?: string;
}

export interface AudioPlayerContextStateType extends State {
  audioRef: RefObject<HTMLAudioElement | null>;
  currentTrack: AudioTrackData | undefined;
  progressBarRef: RefObject<HTMLInputElement | null>;
  tracks: AudioTrackData[];
  containerRef: RefObject<HTMLElement | null>;
}

export interface AudioPlayerContextDispatchType {
  dispatch: Dispatch<ReducerAction>;
  actions: typeof AUDIO_PLAYER_ACTIONS;
}

export const AudioPlayerContextState = createContext<AudioPlayerContextStateType | undefined>(
  undefined,
);

export const AudioPlayerContextDispatch = createContext<AudioPlayerContextDispatchType | undefined>(
  undefined,
);

export interface AudioPlayerContextProviderProps {
  /** @default 0 */
  defaultTrackIndex?: number;
  children: ReactNode;
  tracks: AudioTrackData[];
  defaultVolume?: number;
}

export function AudioPlayerContextProvider({
  children,
  defaultTrackIndex = 0,
  tracks = [],
  defaultVolume = 50,
}: AudioPlayerContextProviderProps) {
  const [{ currentTime, duration, currentTrackIndex, isPlaying, volume, mute }, dispatch] =
    useReducer(audioPlayerReducer, null, () => getInitialState(defaultTrackIndex, defaultVolume));

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  const stateContextValue: AudioPlayerContextStateType = useMemo(
    () => ({
      audioRef,
      progressBarRef,
      containerRef,
      currentTrackIndex,
      currentTime,
      duration,
      currentTrack: tracks[currentTrackIndex],
      isPlaying,
      tracks,
      volume,
      mute,
    }),
    [currentTrackIndex, currentTime, duration, tracks, isPlaying, volume, mute],
  );

  const dispatchContextValue: AudioPlayerContextDispatchType = useMemo(
    () => ({
      dispatch,
      actions: AUDIO_PLAYER_ACTIONS,
    }),
    [],
  );

  return (
    <AudioPlayerContextDispatch.Provider value={dispatchContextValue}>
      <AudioPlayerContextState.Provider value={stateContextValue}>
        {children}
      </AudioPlayerContextState.Provider>
    </AudioPlayerContextDispatch.Provider>
  );
}
