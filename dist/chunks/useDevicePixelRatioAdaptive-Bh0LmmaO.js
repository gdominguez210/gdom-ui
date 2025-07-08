'use strict';

const React = require('react');

const RESOLUTION_MODES = {
  AUTO: "auto"
};
function useDevicePixelRatioAdaptive(options) {
  const { resolutionMode = RESOLUTION_MODES.AUTO } = options ?? {};
  const adaptiveDevicePixelRatio = React.useMemo(() => {
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

exports.useDevicePixelRatioAdaptive = useDevicePixelRatioAdaptive;
