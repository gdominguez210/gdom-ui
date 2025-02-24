import {
  useMemo,
  createContext,
  useRef,
  useReducer,
  type Dispatch,
  type RefObject,
  type ReactNode,
} from 'react';

const AUDIO_PLAYER_ACTIONS = {
  SET_CURRENT_TRACK_INDEX: 'SET_CURRENT_TRACK_INDEX',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_DURATION: 'SET_DURATION',
  SET_IS_PLAYING: 'SET_IS_PLAYING',
} as const;

type ActionPayloads = {
  [AUDIO_PLAYER_ACTIONS.SET_CURRENT_TRACK_INDEX]: { currentTrackIndex: number };
  [AUDIO_PLAYER_ACTIONS.SET_CURRENT_TIME]: { currentTime: number };
  [AUDIO_PLAYER_ACTIONS.SET_DURATION]: { duration: number };
  [AUDIO_PLAYER_ACTIONS.SET_IS_PLAYING]: { isPlaying: boolean | 'toggle' };
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
};

function getInitialState(defaultTrackIndex: number): State {
  return {
    currentTrackIndex: defaultTrackIndex,
    currentTime: 0,
    duration: 0,
    isPlaying: false,
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
  audioRef: RefObject<HTMLAudioElement>;
  currentTrack: AudioTrackData | undefined;
  progressBarRef: RefObject<HTMLInputElement>;
  tracks: AudioTrackData[];
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
}

export function AudioPlayerContextProvider(props: AudioPlayerContextProviderProps) {
  const { children, defaultTrackIndex = 0, tracks = [] } = props;

  const [{ currentTime, duration, currentTrackIndex, isPlaying }, dispatch] = useReducer(
    audioPlayerReducer,
    null,
    () => getInitialState(defaultTrackIndex),
  );

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const stateContextValue: AudioPlayerContextStateType = useMemo(
    () => ({
      audioRef,
      progressBarRef,
      currentTrackIndex,
      currentTime,
      duration,
      currentTrack: tracks[currentTrackIndex],
      isPlaying,
      tracks,
    }),
    [currentTrackIndex, currentTime, duration, tracks, isPlaying],
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
