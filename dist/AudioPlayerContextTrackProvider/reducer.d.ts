export type AudioTrackData = {
    id: string;
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
export declare const TRACK_ACTIONS: {
    readonly SET_CURRENT_TRACK_INDEX: "SET_CURRENT_TRACK_INDEX";
};
type ActionPayloads = {
    [TRACK_ACTIONS.SET_CURRENT_TRACK_INDEX]: {
        currentTrackIndex: number;
    };
};
export type TrackAction = {
    [K in keyof ActionPayloads]: {
        type: K;
        payload: ActionPayloads[K];
    };
}[keyof ActionPayloads];
export declare function trackReducer(state: TrackState, action: TrackAction): TrackState;
export {};
