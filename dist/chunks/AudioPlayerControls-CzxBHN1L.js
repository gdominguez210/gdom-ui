import { jsx } from 'react/jsx-runtime';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { c as clsx } from './clsx-ChV9xqsO.js';

function AudioPlayerControls(props) {
  const { as: Element = "div", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("flex items-center justify-center gap-1 p-4 text-2xl", className)),
      ...restProps,
      children
    }
  );
}

export { AudioPlayerControls as A };
