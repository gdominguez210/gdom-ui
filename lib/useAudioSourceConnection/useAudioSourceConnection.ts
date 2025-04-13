import { useRefReady } from '@lib/useRefReady/useRefReady';
import { type UseAudioContextWebAPIReturn } from '@lib/useAudioContextWebAPI/useAudioContextWebAPI';
import { useCallback, useEffect, useRef } from 'react';

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

export function useAudioSourceConnection(options: UseAudioSourceConnectionOptions) {
  const {
    audioRef,
    destinationRef,
    createAudioSource,
    deleteAudioSource,
    isDestinationReady,
    deleteOnCleanup = true,
    autoConnect = true,
  } = options;

  const [setIsConnectedRef, isConnected, isConnectedRef] = useRefReady<boolean>(false);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const connect = useCallback(() => {
    if (isConnectedRef.current) return true;

    const destinationNode = destinationRef.current;
    const audioElement = audioRef.current;

    if (!destinationNode || !isDestinationReady || !audioElement) return false;

    try {
      const sourceNode = createAudioSource(audioElement);
      if (!sourceNode) return false;

      sourceNodeRef.current = sourceNode;

      sourceNode.connect(destinationNode);

      setIsConnectedRef(true);
      return true;
    } catch (error) {
      console.error('Failed to connect audio source to destination', error);
      return false;
    }
  }, [
    audioRef,
    destinationRef,
    createAudioSource,
    setIsConnectedRef,
    isConnectedRef,
    isDestinationReady,
  ]);

  const disconnect = useCallback(() => {
    if (!isConnectedRef.current) return true;

    const audioElement = audioRef.current;
    const destinationNode = destinationRef.current;

    if (!destinationNode || !audioElement) return false;

    try {
      sourceNodeRef.current?.disconnect(destinationNode);

      if (deleteOnCleanup) {
        deleteAudioSource(audioElement);
      }

      setIsConnectedRef(false);
      sourceNodeRef.current = null;
      return true;
    } catch (error) {
      console.error('Failed to disconnect audio source from destination', error);
      return false;
    }
  }, [
    audioRef,
    destinationRef,
    deleteAudioSource,
    deleteOnCleanup,
    isConnectedRef,
    setIsConnectedRef,
  ]);

  const reconnect = useCallback(() => {
    disconnect();
    return connect();
  }, [connect, disconnect]);

  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    return () => {
      disconnect();
    };
  }, [autoConnect, connect, disconnect]);

  return {
    isConnected,
    connect,
    disconnect,
    reconnect,
  };
}
