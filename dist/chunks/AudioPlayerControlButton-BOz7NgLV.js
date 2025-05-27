import { jsx } from 'react/jsx-runtime';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { t as twMerge } from './bundle-mjs-BBFHkixS.js';

function AudioPlayerControlButton(props) {
  const { active = false, className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    "button",
    {
      className: twMerge(
        clsx(
          "rounded-md p-2 focus-within:outline-white hover:bg-black/30 focus:bg-black/30",
          active && "bg-black/30",
          className
        )
      ),
      type: "button",
      ...restProps,
      children
    }
  );
}

export { AudioPlayerControlButton as A };
