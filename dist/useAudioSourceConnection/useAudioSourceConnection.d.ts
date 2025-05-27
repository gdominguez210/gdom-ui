import { UseAudioContextWebAPIReturn } from '../useAudioContextWebAPI/useAudioContextWebAPI';
export type UseAudioSourceConnectionOptions = {
    audioRef: React.RefObject<HTMLAudioElement | null>;
    destinationRef: React.RefObject<AudioNode | null>;
    createAudioSource: UseAudioContextWebAPIReturn['createAudioSource'];
    deleteAudioSource: UseAudioContextWebAPIReturn['deleteAudioSource'];
    isDestinationReady: boolean;
    deleteOnCleanup?: boolean;
    autoConnect?: boolean;
};
export type UseAudioSourceConnectionReturn = {
    isConnected: boolean;
    connect: () => boolean;
    disconnect: () => boolean;
    reconnect: () => boolean;
};
export declare function useAudioSourceConnection(options: UseAudioSourceConnectionOptions): {
    isConnected: boolean;
    connect: () => boolean;
    disconnect: () => boolean;
    reconnect: () => boolean;
};
