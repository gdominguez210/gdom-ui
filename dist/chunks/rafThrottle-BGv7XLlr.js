'use strict';

function rafThrottle(callback, frameRate) {
  let scheduled = false;
  let lastArgs = null;
  let lastExecutionTime = 0;
  const frameIntervalMs = frameRate ? 1e3 / frameRate : 0;
  const throttledFn = (...args) => {
    lastArgs = args;
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame((timestamp) => {
        scheduled = false;
        if (frameIntervalMs > 0) {
          const elapsed = timestamp - lastExecutionTime;
          if (elapsed < frameIntervalMs) {
            scheduled = true;
            requestAnimationFrame((nextTimestamp) => {
              scheduled = false;
              lastExecutionTime = nextTimestamp;
              callback(...lastArgs);
            });
            return;
          }
          lastExecutionTime = timestamp - elapsed % frameIntervalMs;
        } else {
          lastExecutionTime = timestamp;
        }
        callback(...lastArgs);
      });
    }
  };
  return throttledFn;
}

exports.rafThrottle = rafThrottle;
