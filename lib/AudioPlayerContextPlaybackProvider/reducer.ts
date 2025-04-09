export const PLAYBACK_ACTIONS = {
  SET_IS_PLAYING: 'SET_IS_PLAYING',
  SET_VOLUME: 'SET_VOLUME',
  SET_MUTE: 'SET_MUTE',
  SET_SHUFFLE: 'SET_SHUFFLE',
  SET_LOOP: 'SET_LOOP',
} as const;

export type PlaybackState = {
  isPlaying: boolean;
  volume: number;
  mute: boolean;
  shuffle: boolean;
  loop: boolean;
};

type PlaybackActionPayloads = {
  [PLAYBACK_ACTIONS.SET_IS_PLAYING]: { isPlaying: boolean | 'toggle' };
  [PLAYBACK_ACTIONS.SET_VOLUME]: { volume: number };
  [PLAYBACK_ACTIONS.SET_MUTE]: { mute: boolean | 'toggle' };
  [PLAYBACK_ACTIONS.SET_SHUFFLE]: { shuffle: boolean | 'toggle' };
  [PLAYBACK_ACTIONS.SET_LOOP]: { loop: boolean | 'toggle' };
};

export type PlaybackAction = {
  [K in keyof PlaybackActionPayloads]: { type: K; payload: PlaybackActionPayloads[K] };
}[keyof PlaybackActionPayloads];

export function playbackReducer(state: PlaybackState, action: PlaybackAction): PlaybackState {
  switch (action.type) {
    case PLAYBACK_ACTIONS.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying:
          action.payload.isPlaying === 'toggle' ? !state.isPlaying : action.payload.isPlaying,
      };
    case PLAYBACK_ACTIONS.SET_VOLUME:
      return { ...state, volume: action.payload.volume };
    case PLAYBACK_ACTIONS.SET_MUTE:
      return {
        ...state,
        mute: action.payload.mute === 'toggle' ? !state.mute : action.payload.mute,
      };
    case PLAYBACK_ACTIONS.SET_SHUFFLE:
      return {
        ...state,
        shuffle: action.payload.shuffle === 'toggle' ? !state.shuffle : action.payload.shuffle,
      };
    case PLAYBACK_ACTIONS.SET_LOOP:
      return {
        ...state,
        loop: action.payload.loop === 'toggle' ? !state.loop : action.payload.loop,
      };
    default:
      return state;
  }
}
