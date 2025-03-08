export const AUDIO_PLAYER_ACTIONS = {
  SET_CURRENT_TRACK_INDEX: 'SET_CURRENT_TRACK_INDEX',
  SET_CURRENT_TIME: 'SET_CURRENT_TIME',
  SET_DURATION: 'SET_DURATION',
  SET_IS_PLAYING: 'SET_IS_PLAYING',
  SET_VOLUME: 'SET_VOLUME',
  SET_MUTE: 'SET_MUTE',
} as const;

export const AUDIO_PLAYER_CONTEXT_ERROR = {
  STATE: 'useAudioPlayerContextState must be used within an AudioPlayerContextProvider',
  DISPATCH: 'useAudioPlayerContextDispatch must be used within an AudioPlayerContextProvider',
} as const;

export type AudioPlayerContextErrorType =
  (typeof AUDIO_PLAYER_CONTEXT_ERROR)[keyof typeof AUDIO_PLAYER_CONTEXT_ERROR];
