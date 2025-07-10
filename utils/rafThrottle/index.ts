/**
 * Creates a throttled function using requestAnimationFrame with optional framerate control
 *
 * @param callback - The function to throttle
 * @param frameRate - Optional frame rate limit in frames per second (if not provided, runs at browser's native refresh rate)
 * @returns A throttled version of the callback function
 */

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export function rafThrottle<T extends (...args: any[]) => any>(
  callback: T,
  frameRate?: number,
): (...args: Parameters<T>) => void {
  let scheduled = false;
  let lastArgs: Parameters<T> | null = null;
  let lastExecutionTime = 0;
  const frameIntervalMs = frameRate ? 1000 / frameRate : 0;

  const throttledFn = (...args: Parameters<T>) => {
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
              callback(...(lastArgs as Parameters<T>));
            });
            return;
          }

          lastExecutionTime = timestamp - (elapsed % frameIntervalMs);
        } else {
          lastExecutionTime = timestamp;
        }

        callback(...(lastArgs as Parameters<T>));
      });
    }
  };

  return throttledFn;
}
