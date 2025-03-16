export const AUDIO_ACTIONS = {
  SET_IS_PLAYING: 'SET_IS_PLAYING',
  SET_VOLUME: 'SET_VOLUME',
  SET_MUTE: 'SET_MUTE',
  SET_SHUFFLE: 'SET_SHUFFLE',
  SET_LOOP: 'SET_LOOP',
} as const;

export type AudioState = {
  isPlaying: boolean;
  volume: number;
  mute: boolean;
  shuffle: boolean;
  loop: boolean;
};

type ActionPayloads = {
  [AUDIO_ACTIONS.SET_IS_PLAYING]: { isPlaying: boolean | 'toggle' };
  [AUDIO_ACTIONS.SET_VOLUME]: { volume: number };
  [AUDIO_ACTIONS.SET_MUTE]: { mute: boolean | 'toggle' };
  [AUDIO_ACTIONS.SET_SHUFFLE]: { shuffle: boolean | 'toggle' };
  [AUDIO_ACTIONS.SET_LOOP]: { loop: boolean | 'toggle' };
};

export type AudioAction = {
  [K in keyof ActionPayloads]: { type: K; payload: ActionPayloads[K] };
}[keyof ActionPayloads];

export function audioReducer(state: AudioState, action: AudioAction): AudioState {
  switch (action.type) {
    case AUDIO_ACTIONS.SET_IS_PLAYING:
      return {
        ...state,
        isPlaying:
          action.payload.isPlaying === 'toggle' ? !state.isPlaying : action.payload.isPlaying,
      };
    case AUDIO_ACTIONS.SET_VOLUME:
      return { ...state, volume: action.payload.volume };
    case AUDIO_ACTIONS.SET_MUTE:
      return {
        ...state,
        mute: action.payload.mute === 'toggle' ? !state.mute : action.payload.mute,
      };
    case AUDIO_ACTIONS.SET_SHUFFLE:
      return {
        ...state,
        shuffle: action.payload.shuffle === 'toggle' ? !state.shuffle : action.payload.shuffle,
      };
    case AUDIO_ACTIONS.SET_LOOP:
      return {
        ...state,
        loop: action.payload.loop === 'toggle' ? !state.loop : action.payload.loop,
      };
    default:
      return state;
  }
}
