declare const RESOLUTION_MODES: {
    readonly HIGH: "high";
    readonly LOW: "low";
    readonly AUTO: "auto";
};
type ResolutionMode = (typeof RESOLUTION_MODES)[keyof typeof RESOLUTION_MODES];
export type UseDevicePixelRatioAdaptiveOptions = {
    resolutionMode?: ResolutionMode;
};
export declare function useDevicePixelRatioAdaptive(options?: UseDevicePixelRatioAdaptiveOptions): {
    adaptiveDevicePixelRatio: number;
};
export {};
