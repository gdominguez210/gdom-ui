import { useRefReady } from '@lib/useRefReady/useRefReady';
import { type UseAudioContextWebAPIReturn } from '@lib/useAudioContextWebAPI/useAudioContextWebAPI';
import { useCallback, useEffect, useRef } from 'react';

export type UseAudioConnectionOptions = {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  destinationRef: React.RefObject<AudioNode | null>;
  audioContextRef: UseAudioContextWebAPIReturn['audioContextRef'];
  createAudioSource: UseAudioContextWebAPIReturn['createAudioSource'];
  deleteAudioSource: UseAudioContextWebAPIReturn['deleteAudioSource'];
  isAudioContextReady: UseAudioContextWebAPIReturn['isReady'];
  isDestinationReady: boolean;
  connectToDestination?: boolean;
  deleteOnCleanup?: boolean;
  autoConnect?: boolean;
};

export type UseAudioConnectionReturn = {
  isConnected: boolean;
  connect: () => boolean;
  disconnect: () => boolean;
  reconnect: () => boolean;
};

export function useAudioConnection(options: UseAudioConnectionOptions) {
  const {
    audioRef,
    destinationRef,
    audioContextRef,
    createAudioSource,
    deleteAudioSource,
    isAudioContextReady,
    connectToDestination = true,
    deleteOnCleanup = true,
    autoConnect = true,
  } = options;

  const [setIsConnectedRef, isConnected, isConnectedRef] = useRefReady<boolean>(false);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const connect = useCallback(() => {
    if (isConnectedRef.current) return true;

    const audioContext = audioContextRef.current;
    const destinationNode = destinationRef.current;
    const audioElement = audioRef.current;

    if (!isAudioContextReady || !audioContext || !destinationNode || !audioElement) return false;

    try {
      const sourceNode = createAudioSource(audioElement);
      if (!sourceNode) return false;

      sourceNodeRef.current = sourceNode;

      sourceNode.connect(destinationNode);

      if (connectToDestination) {
        destinationNode.connect(audioContext.destination);
      }

      setIsConnectedRef(true);
      return true;
    } catch (error) {
      console.error('Failed to connect audio source to destination', error);
      return false;
    }
  }, [
    audioRef,
    destinationRef,
    audioContextRef,
    createAudioSource,
    isAudioContextReady,
    connectToDestination,
    setIsConnectedRef,
    isConnectedRef,
  ]);

  const disconnect = useCallback(() => {
    if (!isConnectedRef.current) return true;

    const audioElement = audioRef.current;
    const audioContext = audioContextRef.current;
    const destinationNode = destinationRef.current;

    if (!audioContext || !destinationNode || !audioElement) return false;

    try {
      if (connectToDestination && destinationNode && audioContext) {
        destinationNode.disconnect(audioContext.destination);
      }

      sourceNodeRef.current?.disconnect(destinationNode);

      if (deleteOnCleanup) {
        deleteAudioSource(audioElement);
      } else if (sourceNodeRef.current && destinationNode) {
        sourceNodeRef.current.disconnect(destinationNode);
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
    audioContextRef,
    deleteAudioSource,
    connectToDestination,
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
