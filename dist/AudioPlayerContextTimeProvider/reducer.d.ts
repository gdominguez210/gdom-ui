export declare const TIME_ACTIONS: {
    readonly SET_CURRENT_TIME: "SET_CURRENT_TIME";
    readonly SET_DURATION: "SET_DURATION";
    readonly SET_PREVIEW_TIME: "SET_PREVIEW_TIME";
};
export type ActionPayloads = {
    [TIME_ACTIONS.SET_CURRENT_TIME]: {
        currentTime: number;
    };
    [TIME_ACTIONS.SET_DURATION]: {
        duration: number;
    };
    [TIME_ACTIONS.SET_PREVIEW_TIME]: {
        previewTime: number | null;
    };
};
export type TimeAction = {
    [K in keyof ActionPayloads]: {
        type: K;
        payload: ActionPayloads[K];
    };
}[keyof ActionPayloads];
export type TimeState = {
    currentTime: number;
    duration: number;
    previewTime: number | null;
};
export declare function timeReducer(state: TimeState, action: TimeAction): TimeState;
