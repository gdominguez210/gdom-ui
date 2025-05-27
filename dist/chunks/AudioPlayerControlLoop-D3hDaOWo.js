import { jsx } from 'react/jsx-runtime';
import { useCallback } from 'react';
import { u as useAudioPlayerContextPlayback } from './useAudioPlayerContextPlayback-1tEUh5id.js';
import { t as twMerge } from './bundle-mjs-BBFHkixS.js';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { I as IconRepeatOneFill } from './IconRepeatOneFill-eQYzm9o2.js';
import { I as IconRepeat2Fill } from './IconRepeat2Fill-DE3yZh4X.js';
import { A as AudioPlayerControlButton } from './AudioPlayerControlButton-BOz7NgLV.js';

function AudioPlayerControlLoopPrimitive(props) {
  const { active = false, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    AudioPlayerControlButton,
    {
      className: twMerge(
        clsx(
          { "text-neutral-100/50": !active },
          "hover:text-neutral-100",
          "focus-within:text-neutral-100",
          className
        )
      ),
      "aria-label": "Toggle Loop",
      "aria-pressed": active,
      ...restProps,
      children: active ? /* @__PURE__ */ jsx(IconRepeatOneFill, { className: "scale-75" }) : /* @__PURE__ */ jsx(IconRepeat2Fill, { className: "scale-75" })
    }
  );
}

function AudioPlayerControlLoop(props) {
  const { onClick, ...restProps } = props;
  const { loop, toggleLoop } = useAudioPlayerContextPlayback();
  const handleClick = useCallback(
    (e) => {
      toggleLoop();
      onClick?.(e);
    },
    [toggleLoop, onClick]
  );
  return /* @__PURE__ */ jsx(
    AudioPlayerControlLoopPrimitive,
    {
      active: loop,
      onClick: handleClick,
      ...restProps
    }
  );
}

export { AudioPlayerControlLoop as A, AudioPlayerControlLoopPrimitive as a };
