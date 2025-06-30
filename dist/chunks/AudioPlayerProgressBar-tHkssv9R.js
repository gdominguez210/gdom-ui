'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const useAudioPlayerContextRefs = require('./useAudioPlayerContextRefs-c-7Q5bUc.js');
const useAnimationFrame = require('./useAnimationFrame-CpulgwJu.js');
const useElementDimensions = require('./useElementDimensions-DeYYmJ_A.js');
const useDelayedMouseMove = require('./useDelayedMouseMove-C5F20XFY.js');
const useAudioPlayerContextTime = require('./useAudioPlayerContextTime-BhBAi2PV.js');
const useAudioPlayerContextPlayback = require('./useAudioPlayerContextPlayback-lQhY1vk1.js');
const useComposedRefs = require('./useComposedRefs-CewP366o.js');
const clsx = require('./clsx-BtxeOLZW.js');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const useKeyboardMediaSeek = require('./useKeyboardMediaSeek-CiZqxsyu.js');

function updateProgressBar(progressBar, value) {
  if (!progressBar) return;
  progressBar.value = value.toString();
}
function updateAudioCurrentTime(audio, time) {
  if (!audio) return;
  audio.currentTime = time;
}
function useAudioPlayerProgressBar({
  audioRef,
  progressCssVariableName = "--range-progress",
  previewCssVariableName = "--range-preview",
  duration,
  isPlaying,
  onProgressChange,
  onPreviewTimeChange,
  progressBarRef
}) {
  const { dimensionsRef, elementRef } = useElementDimensions.useElementDimensions();
  const _handleMouseMove = React.useCallback(
    (e) => {
      if (!progressBarRef.current) return;
      const { width, left } = dimensionsRef.current;
      if (width === 0) return;
      const mouseX = e.clientX - left;
      const position = mouseX / width;
      const previewTime = position * duration;
      progressBarRef.current.style.setProperty(
        previewCssVariableName,
        `${previewTime / duration * 100}%`
      );
      onPreviewTimeChange?.(previewTime);
    },
    [progressBarRef, previewCssVariableName, duration, onPreviewTimeChange, dimensionsRef]
  );
  const _handleMouseOut = React.useCallback(() => {
    if (!progressBarRef.current) return;
    progressBarRef.current.style.setProperty(previewCssVariableName, "0%");
    onPreviewTimeChange?.(null);
  }, [progressBarRef, previewCssVariableName, onPreviewTimeChange]);
  const handleProgressChange = React.useCallback(() => {
    if (!audioRef.current || !progressBarRef.current) return;
    const newTime = Number(progressBarRef.current.value);
    updateAudioCurrentTime(audioRef.current, newTime);
    onProgressChange(newTime);
    progressBarRef.current.style.setProperty(
      progressCssVariableName,
      `${newTime / duration * 100}%`
    );
  }, [audioRef, progressBarRef, duration, progressCssVariableName, onProgressChange]);
  const updateProgress = React.useCallback(() => {
    if (!audioRef.current || !progressBarRef.current || !duration) return;
    const currentTime = audioRef.current.currentTime;
    onProgressChange(currentTime);
    updateProgressBar(progressBarRef.current, currentTime);
    progressBarRef.current.style.setProperty(
      progressCssVariableName,
      `${currentTime / duration * 100}%`
    );
  }, [audioRef, progressBarRef, duration, progressCssVariableName, onProgressChange]);
  useAnimationFrame.useAnimationFrame({
    isActive: isPlaying,
    callback: updateProgress,
    dependencies: [duration]
  });
  const { handleMouseEnter, handleMouseMove, handleMouseOut } = useDelayedMouseMove.useDelayedMouseMove({
    onMouseMove: _handleMouseMove,
    onMouseLeave: _handleMouseOut
  });
  React.useEffect(() => {
    if (!isPlaying) {
      updateProgress();
    }
  }, [isPlaying, updateProgress]);
  return {
    handleProgressChange,
    handleMouseEnter,
    handleMouseMove,
    handleMouseOut,
    elementRef
  };
}

function AudioPlayerProgressBarPrimitive(props) {
  const { className, previewPercentage, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    "input",
    {
      className: bundleMjs.twMerge(
        clsx.clsx(
          // Base styles
          "[--range-progress:0%]",
          "[--range-preview:0%]",
          "appearance-none",
          "bg-gray-500",
          "relative",
          "w-full",
          "h-2",
          "cursor-pointer",
          "focus-within:outline-white",
          // Progress bar styles
          "before:block",
          "before:w-(--range-progress)",
          "before:bg-neutral-100",
          `before:content-['']`,
          "before:absolute",
          "before:top-0",
          "before:left-0",
          "before:h-2",
          "before:z-[1]",
          // Preview styles
          "after:block",
          "after:transition-opacity",
          "after:delay-150",
          "after:duration-300",
          "after:ease-in-out",
          "after:w-(--range-preview)",
          "after:opacity-0",
          "after:bg-neutral-400",
          'after:content-[""]',
          "after:absolute",
          "after:top-0",
          "after:left-0",
          "after:h-2",
          "after:z-[0]",
          "hover:after:opacity-100",
          // WebKit (Chrome, Safari, newer Edge) track styles
          "[&::-webkit-slider-runnable-track]:bg-transparent",
          "[&::-webkit-slider-runnable-track]:appearance-none",
          "[&::-webkit-slider-runnable-track]:shadow-none",
          "[&::-webkit-slider-runnable-track]:border-transparent",
          // WebKit thumb (hidden)
          "[&::-webkit-slider-thumb]:appearance-none",
          "[&::-webkit-slider-thumb]:w-0",
          "[&::-webkit-slider-thumb]:h-0",
          "[&::-webkit-slider-thumb]:border-none",
          // Firefox track styles
          "[&::-moz-range-track]:bg-transparent",
          "[&::-moz-range-track]:appearance-none",
          "[&::-moz-range-track]:border-none",
          "[&::-moz-range-progress]:appearance-none",
          "[&::-moz-range-progress]:bg-neutral-100",
          "[&::-moz-range-progress]:h-2",
          // Firefox thumb (hidden)
          "[&::-moz-range-thumb]:appearance-none",
          "[&::-moz-range-thumb]:w-0",
          "[&::-moz-range-thumb]:h-0",
          "[&::-moz-range-thumb]:border-none",
          // IE/Edge track styles
          "[&::-ms-track]:bg-transparent",
          "[&::-ms-track]:appearance-none",
          "[&::-ms-track]:border-none",
          "[&::-ms-fill-lower]:bg-neutral-100",
          "[&::-ms-fill-upper]:bg-gray-500",
          // IE/Edge thumb (hidden)
          "[&::-ms-thumb]:appearance-none",
          "[&::-ms-thumb]:w-0",
          "[&::-ms-thumb]:h-0",
          "[&::-ms-thumb]:border-none",
          className
        )
      ),
      "aria-label": "Audio progress",
      role: "slider",
      defaultValue: "0",
      ...restProps,
      type: "range",
      style: {
        "--range-progress": `${restProps.value ?? 0}%`,
        "--range-preview": `${previewPercentage ?? 0}%`
      }
    }
  );
}

function AudioPlayerProgressBar(props) {
  const { onChange, ref, seekIncrement, maxSeekIncrement, ...restProps } = props;
  const { audioRef, progressBarRef } = useAudioPlayerContextRefs.useAudioPlayerContextRefs();
  const { isPlaying } = useAudioPlayerContextPlayback.useAudioPlayerContextPlayback();
  const { duration, seek, setPreviewTime } = useAudioPlayerContextTime.useAudioPlayerContextTime();
  const { handleProgressChange, handleMouseEnter, handleMouseMove, handleMouseOut, elementRef } = useAudioPlayerProgressBar({
    audioRef,
    duration,
    isPlaying,
    onProgressChange: seek,
    progressBarRef,
    onPreviewTimeChange: setPreviewTime
  });
  const handleChange = React.useCallback(
    (e) => {
      handleProgressChange(e);
      onChange?.(e);
    },
    [handleProgressChange, onChange]
  );
  const { handleKeyDown, handleKeyUp } = useKeyboardMediaSeek.useKeyboardMediaSeek({
    mediaRef: audioRef,
    duration,
    onSeekComplete: seek,
    seekIncrement,
    maxSeekIncrement
  });
  const composedRef = useComposedRefs.useComposedRefs(progressBarRef, ref, elementRef);
  return /* @__PURE__ */ jsxRuntime.jsx(
    AudioPlayerProgressBarPrimitive,
    {
      ...restProps,
      onChange: handleChange,
      ref: composedRef,
      onMouseEnter: handleMouseEnter,
      onMouseOut: handleMouseOut,
      onMouseMove: handleMouseMove,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp
    }
  );
}

exports.AudioPlayerProgressBar = AudioPlayerProgressBar;
exports.AudioPlayerProgressBarPrimitive = AudioPlayerProgressBarPrimitive;
exports.useAudioPlayerProgressBar = useAudioPlayerProgressBar;
