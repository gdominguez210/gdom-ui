import { jsx } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';
import { I as IconShuffleFill } from './IconShuffleFill-CDT-vZb0.js';
import { A as AudioPlayerControlButton } from './AudioPlayerControlButton-CsltQ7lB.js';

function AudioPlayerControlShufflePrimitive(props) {
  const { active = false, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      className: twMerge(
        clsx(
          { "text-neutral-100/50": !active },
          "hover:text-neutral-100",
          "focus:text-neutral-100",
          className
        )
      ),
      "aria-label": "Toggle Shuffle",
      "aria-pressed": active,
      ...restProps,
      children: /* @__PURE__ */ jsx(IconShuffleFill, { className: "scale-75" })
    }
  );
}

function AudioPlayerControlShuffle(props) {
  const { onClick, ...restProps } = props;
  const { shuffle, toggleShuffle } = useAudioPlayerContextPlayback();
  const handleClick = useCallback(
    (e) => {
      toggleShuffle();
      onClick?.(e);
    },
    [toggleShuffle, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerControlShufflePrimitive,
    {
      active: shuffle,
      onClick: handleClick,
      ...restProps
    }
  );
}

export { AudioPlayerControlShuffle as A, AudioPlayerControlShufflePrimitive as a };
