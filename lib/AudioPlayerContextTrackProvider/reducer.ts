export type AudioTrackData = {
  title: string;
  src: string;
  author: string;
  thumbnail?: string;
};

export type TrackState = {
  currentTrackIndex: number;
  tracks: AudioTrackData[];
  currentTrack: AudioTrackData | undefined;
};

export const TRACK_ACTIONS = {
  SET_CURRENT_TRACK_INDEX: 'SET_CURRENT_TRACK_INDEX',
} as const;

type ActionPayloads = {
  [TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX]: { currentTrackIndex: number };
};

export type TrackAction = {
  [K in keyof ActionPayloads]: { type: K; payload: ActionPayloads[K] };
}[keyof ActionPayloads];

export function trackReducer(state: TrackState, action: TrackAction): TrackState {
  switch (action.type) {
    case TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX:
      return {
        ...state,
        currentTrackIndex: action.payload.currentTrackIndex,
        currentTrack: state.tracks[action.payload.currentTrackIndex],
      };
    default:
      return state;
  }
}
