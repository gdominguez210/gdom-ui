import { jsx } from 'react/jsx-runtime';
import { t as twMerge } from './bundle-mjs-BBFHkixS.js';
import { c as clsx } from './clsx-ChV9xqsO.js';

function AudioPlaylistScrollableContainer(props) {
  const {
    as: Element = "div",
    children,
    className,
    maxHeight = "300px",
    style,
    ...restProps
  } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "overflow-y-auto",
          "scrollbar-thin scrollbar-thumb-slate-400/30 scrollbar-track-slate-800/20 hover:scrollbar-thumb-slate-400/50",
          "scrollbar-thumb-rounded-none",
          className
        )
      ),
      style: {
        maxHeight,
        ...style
      },
      ...restProps,
      children
    }
  );
}

export { AudioPlaylistScrollableContainer as A };
