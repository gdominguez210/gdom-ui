export declare const PLAYBACK_ACTIONS: {
    readonly SET_IS_PLAYING: "SET_IS_PLAYING";
    readonly SET_VOLUME: "SET_VOLUME";
    readonly SET_MUTE: "SET_MUTE";
    readonly SET_SHUFFLE: "SET_SHUFFLE";
    readonly SET_LOOP: "SET_LOOP";
};
export type PlaybackState = {
    isPlaying: boolean;
    volume: number;
    mute: boolean;
    shuffle: boolean;
    loop: boolean;
};
type PlaybackActionPayloads = {
    [PLAYBACK_ACTIONS.SET_IS_PLAYING]: {
        isPlaying: boolean | 'toggle';
    };
    [PLAYBACK_ACTIONS.SET_VOLUME]: {
        volume: number;
    };
    [PLAYBACK_ACTIONS.SET_MUTE]: {
        mute: boolean | 'toggle';
    };
    [PLAYBACK_ACTIONS.SET_SHUFFLE]: {
        shuffle: boolean | 'toggle';
    };
    [PLAYBACK_ACTIONS.SET_LOOP]: {
        loop: boolean | 'toggle';
    };
};
export type PlaybackAction = {
    [K in keyof PlaybackActionPayloads]: {
        type: K;
        payload: PlaybackActionPayloads[K];
    };
}[keyof PlaybackActionPayloads];
export declare function playbackReducer(state: PlaybackState, action: PlaybackAction): PlaybackState;
export {};
