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
    // Store the most recent arguments
    lastArgs = args;

    if (!scheduled) {
      scheduled = true;

      requestAnimationFrame((timestamp) => {
        scheduled = false;

        // If a frameRate is specified, enforce the timing
        if (frameIntervalMs > 0) {
          const elapsed = timestamp - lastExecutionTime;

          // If not enough time has passed since the last execution
          if (elapsed < frameIntervalMs) {
            // Schedule another frame but don't execute yet
            scheduled = true;
            requestAnimationFrame((nextTimestamp) => {
              scheduled = false;
              lastExecutionTime = nextTimestamp;
              callback(...(lastArgs as Parameters<T>));
            });
            return;
          }

          // Update last execution time, accounting for any remainder
          lastExecutionTime = timestamp - (elapsed % frameIntervalMs);
        } else {
          // No framerate limit, just update the timestamp
          lastExecutionTime = timestamp;
        }

        // Execute the callback with the latest arguments
        callback(...(lastArgs as Parameters<T>));
      });
    }
  };

  return throttledFn;
}
