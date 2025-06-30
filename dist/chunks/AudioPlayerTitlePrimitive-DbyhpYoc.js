import { jsx } from 'react/jsx-runtime';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';

function AudioPlayerTitlePrimitive(props) {
  const { as: Element = "span", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("line-clamp-1 font-bold lg:max-w-64 lg:truncate", className)),
      ...restProps,
      children
    }
  );
}

export { AudioPlayerTitlePrimitive as A };
