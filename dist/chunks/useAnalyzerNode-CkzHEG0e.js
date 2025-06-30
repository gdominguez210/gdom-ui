'use strict';

const React = require('react');
const useRefReady = require('./useRefReady-BYj4xHLo.js');

function useAnalyzerNode(options) {
  const {
    audioContextRef,
    isAudioContextReady,
    connectToAudioContext = false,
    fftSize = 2048,
    smoothingTimeConstant = 0.8,
    maxDecibels = -30,
    minDecibels = -100
  } = options;
  const [setAnalyzerRef, isAnalyzerReady, analyzerRef] = useRefReady.useRefReady(null);
  const dataArrayRef = React.useRef(null);
  const previousDataRef = React.useRef(null);
  React.useEffect(() => {
    const audioContext = audioContextRef.current;
    if (!audioContext || !isAudioContextReady || audioContext.state === "closed") return;
    if (!analyzerRef.current) {
      const analyzer = new AnalyserNode(audioContext, {
        fftSize,
        smoothingTimeConstant,
        maxDecibels,
        minDecibels
      });
      setAnalyzerRef(analyzer);
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      dataArrayRef.current = dataArray;
      const previousData = new Uint8Array(analyzer.frequencyBinCount);
      previousDataRef.current = previousData;
    } else {
      const analyzer = analyzerRef.current;
      analyzer.fftSize = fftSize;
      analyzer.smoothingTimeConstant = smoothingTimeConstant;
      analyzer.maxDecibels = maxDecibels;
      analyzer.minDecibels = minDecibels;
      if (dataArrayRef.current?.length !== analyzer.frequencyBinCount) {
        dataArrayRef.current = new Uint8Array(analyzer.frequencyBinCount);
        previousDataRef.current = new Uint8Array(analyzer.frequencyBinCount);
      }
    }
  }, [
    audioContextRef,
    isAudioContextReady,
    fftSize,
    smoothingTimeConstant,
    maxDecibels,
    minDecibels,
    setAnalyzerRef,
    analyzerRef
  ]);
  React.useEffect(() => {
    if (!connectToAudioContext) return;
    const audioContext = audioContextRef.current;
    const analyzer = analyzerRef.current;
    if (!audioContext || !isAudioContextReady || audioContext.state === "closed" || !isAnalyzerReady || !analyzer) {
      return;
    }
    analyzer.connect(audioContext.destination);
    return () => {
      if (analyzer) {
        analyzer.disconnect(audioContext.destination);
      }
    };
  }, [connectToAudioContext, audioContextRef, isAudioContextReady, isAnalyzerReady, analyzerRef]);
  React.useEffect(() => {
    return () => {
      if (analyzerRef.current) {
        analyzerRef.current.disconnect();
        analyzerRef.current = null;
      }
    };
  }, []);
  return {
    analyzerRef,
    dataArrayRef,
    previousDataRef,
    isAnalyzerReady
  };
}

exports.useAnalyzerNode = useAnalyzerNode;
