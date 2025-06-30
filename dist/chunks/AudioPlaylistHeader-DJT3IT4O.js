import { jsx } from 'react/jsx-runtime';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { c as clsx } from './clsx-ChV9xqsO.js';

function AudioPlaylistHeader(props) {
  const { as: Element = "div", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "flex items-center justify-between border-b border-slate-700 p-4 text-lg font-medium",
          className
        )
      ),
      ...restProps,
      children
    }
  );
}

export { AudioPlaylistHeader as A };
