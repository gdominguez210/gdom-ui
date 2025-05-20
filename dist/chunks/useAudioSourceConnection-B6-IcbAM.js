'use strict';

const useRefReady = require('./useRefReady-BYj4xHLo.js');
const React = require('react');

function useAudioSourceConnection(options) {
  const {
    audioRef,
    destinationRef,
    createAudioSource,
    deleteAudioSource,
    isDestinationReady,
    deleteOnCleanup = true,
    autoConnect = true
  } = options;
  const [setIsConnectedRef, isConnected, isConnectedRef] = useRefReady.useRefReady(false);
  const sourceNodeRef = React.useRef(null);
  const connect = React.useCallback(() => {
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
      console.error("Failed to connect audio source to destination", error);
      return false;
    }
  }, [
    audioRef,
    destinationRef,
    createAudioSource,
    setIsConnectedRef,
    isConnectedRef,
    isDestinationReady
  ]);
  const disconnect = React.useCallback(() => {
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
      console.error("Failed to disconnect audio source from destination", error);
      return false;
    }
  }, [
    audioRef,
    destinationRef,
    deleteAudioSource,
    deleteOnCleanup,
    isConnectedRef,
    setIsConnectedRef
  ]);
  const reconnect = React.useCallback(() => {
    disconnect();
    return connect();
  }, [connect, disconnect]);
  React.useEffect(() => {
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
    reconnect
  };
}

exports.useAudioSourceConnection = useAudioSourceConnection;
