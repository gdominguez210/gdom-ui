import { jsx, jsxs } from 'react/jsx-runtime';
import { u as useAudioPlayerContextTime } from './useAudioPlayerContextTime-BOJ7zmrG.js';
import { f as formatDurationForDisplay } from './index-D6BfGXTZ.js';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { c as clsx } from './clsx-ChV9xqsO.js';

function useAudioPlayerTime(props) {
  const { currentTime, duration } = props;
  return {
    currentTimeDisplay: formatDurationForDisplay(currentTime),
    durationDisplay: formatDurationForDisplay(duration)
  };
}

function AudioPlayerTimePrimitive(props) {
  const { as: Element = "span", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "line-clamp-1 inline-block min-w-[6ch] truncate font-mono text-sm tabular-nums",
          className
        )
      ),
      ...restProps,
      children
    }
  );
}

function AudioPlayerTime(props) {
  const { currentTime, duration, previewTime } = useAudioPlayerContextTime();
  const _currentTime = previewTime ?? currentTime;
  const { currentTimeDisplay, durationDisplay } = useAudioPlayerTime({
    currentTime: _currentTime,
    duration
  });
  return /* @__PURE__ */ jsxs(AudioPlayerTimePrimitive, { ...props, children: [
    /* @__PURE__ */ jsx("span", { className: clsx(previewTime && "opacity-80"), children: currentTimeDisplay }),
    " /",
    " ",
    /* @__PURE__ */ jsx("span", { children: durationDisplay })
  ] });
}

export { AudioPlayerTime as A, AudioPlayerTimePrimitive as a, useAudioPlayerTime as u };
