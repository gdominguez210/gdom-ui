import { useMemo, useRef, useCallback, type RefObject } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

async function resumeAudioContext(audioContext: AudioContext): Promise<boolean> {
  try {
    await audioContext.resume();
    return true;
  } catch (error) {
    console.error('Failed to resume AudioContext', error);
    return false;
  }
}

async function suspendAudioContext(audioContext: AudioContext): Promise<boolean> {
  try {
    await audioContext.suspend();
    return true;
  } catch (error) {
    console.error('Failed to suspend AudioContext', error);
    return false;
  }
}

async function closeAudioContext(audioContext: AudioContext): Promise<boolean> {
  try {
    await audioContext.close();
    return true;
  } catch (error) {
    console.error('Failed to close AudioContext', error);
    return false;
  }
}

function createAudioContext(): AudioContext | void {
  try {
    return new AudioContext();
  } catch (error) {
    console.error('Failed to create AudioContext', error);
  }
}

export type AudioContextWebAPIOptions = {
  isPlaying: boolean;
};

export type AudioContextWebAPIReturn = {
  audioContextRef: RefObject<AudioContext | null>;
  createAudioSource: (audioElement: HTMLAudioElement) => MediaElementAudioSourceNode | void;
  deleteAudioSource: (audioElement: HTMLAudioElement) => boolean;
  isInitialized: boolean;
  sourceNodesRef: RefObject<Map<HTMLAudioElement, MediaElementAudioSourceNode>>;
};

export function useAudioContextWebAPI(options: AudioContextWebAPIOptions) {
  const { isPlaying } = options;

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodesRef = useRef<Map<HTMLAudioElement, MediaElementAudioSourceNode>>(new Map());

  const [isInitialized, setIsInitialized] = useState(false);

  const createAudioSource = useCallback(
    (audioElement: HTMLAudioElement): MediaElementAudioSourceNode | void => {
      const audioContext = audioContextRef.current;
      const sourceNodes = sourceNodesRef.current;

      if (!audioContext || !isInitialized || !audioElement) return;

      if (sourceNodes.has(audioElement)) {
        return sourceNodes.get(audioElement);
      }

      try {
        const sourceNode = audioContext.createMediaElementSource(audioElement);
        sourceNodes.set(audioElement, sourceNode);

        return sourceNode;
      } catch (error) {
        console.error('Failed to create audio source node:', error);

        if (error instanceof DOMException && error.message.includes('already connected')) {
          console.warn('This audio element may already be connected to another AudioContext');
        }
      }
    },
    [audioContextRef, isInitialized],
  );

  const deleteAudioSource = useCallback((audioElement: HTMLAudioElement): boolean => {
    const sourceNodes = sourceNodesRef.current;

    if (!audioElement) {
      console.warn('No audio element provided to disconnectAudioSource');
      return false;
    }

    if (!sourceNodes.has(audioElement)) {
      return false;
    }

    try {
      const sourceNode = sourceNodes.get(audioElement)!;

      sourceNode.disconnect();

      sourceNodes.delete(audioElement);

      return true;
    } catch (error) {
      console.error('Failed to disconnect audio source node:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    if (isPlaying && !audioContextRef.current) {
      const audioContext = createAudioContext();

      if (audioContext) {
        audioContextRef.current = audioContext;
        setIsInitialized(true);
      }
    }

    if (isPlaying && audioContextRef.current?.state === 'suspended') {
      resumeAudioContext(audioContextRef.current);
    }

    if (!isPlaying && audioContextRef.current?.state === 'running') {
      suspendAudioContext(audioContextRef.current);
    }
  }, [isPlaying]);

  useEffect(() => {
    const audioContext = audioContextRef.current;
    const sourceNodes = sourceNodesRef.current;

    return () => {
      if (sourceNodes.size > 0) {
        sourceNodes.forEach((sourceNode) => {
          try {
            sourceNode.disconnect();
          } catch (error) {
            console.error('Error disconnecting source node:', error);
          }
        });
        sourceNodes.clear();
      }

      if (audioContext) {
        closeAudioContext(audioContext);
      }
    };
  }, []);

  const result = useMemo(
    () => ({
      audioContextRef,
      createAudioSource,
      deleteAudioSource,
      sourceNodesRef,
      isInitialized,
    }),
    [audioContextRef, createAudioSource, deleteAudioSource, isInitialized],
  );

  return result;
}
