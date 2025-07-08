import { useMemo } from 'react';

const RESOLUTION_MODES = {
  AUTO: "auto"
};
function useDevicePixelRatioAdaptive(options) {
  const { resolutionMode = RESOLUTION_MODES.AUTO } = options ?? {};
  const adaptiveDevicePixelRatio = useMemo(() => {
    const nativeDPR = window?.devicePixelRatio ?? 1;
    switch (resolutionMode) {
      case "high":
        return nativeDPR % 1 === 0 ? nativeDPR : Math.ceil(nativeDPR);
      case "low":
        return 1;
      case "auto":
      default:
        return nativeDPR;
    }
  }, [resolutionMode]);
  return {
    adaptiveDevicePixelRatio
  };
}

export { useDevicePixelRatioAdaptive as u };
