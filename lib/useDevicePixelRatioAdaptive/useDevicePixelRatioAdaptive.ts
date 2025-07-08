import { useMemo } from 'react';

const RESOLUTION_MODES = {
  HIGH: 'high',
  LOW: 'low',
  AUTO: 'auto',
} as const;

type ResolutionMode = (typeof RESOLUTION_MODES)[keyof typeof RESOLUTION_MODES];

export type UseDevicePixelRatioAdaptiveOptions = {
  resolutionMode?: ResolutionMode;
};

export function useDevicePixelRatioAdaptive(options?: UseDevicePixelRatioAdaptiveOptions) {
  const { resolutionMode = RESOLUTION_MODES.AUTO } = options ?? {};

  const adaptiveDevicePixelRatio = useMemo(() => {
    const nativeDPR = window?.devicePixelRatio ?? 1;

    switch (resolutionMode) {
      case 'high':
        return nativeDPR % 1 === 0 ? nativeDPR : Math.ceil(nativeDPR);
      case 'low':
        return 1;
      case 'auto':
      default:
        return nativeDPR;
    }
  }, [resolutionMode]);

  return {
    adaptiveDevicePixelRatio,
  };
}
