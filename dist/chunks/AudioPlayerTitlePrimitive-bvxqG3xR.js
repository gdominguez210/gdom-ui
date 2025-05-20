import { jsx } from 'react/jsx-runtime';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';

function AudioPlayerTitlePrimitive(props) {
  const { as: Element = "p", children, className, ...restProps } = props;
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
