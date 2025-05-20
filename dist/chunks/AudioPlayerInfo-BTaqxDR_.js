import { jsx } from 'react/jsx-runtime';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';

function AudioPlayerInfo(props) {
  const { as: Element = "div", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("flex items-center gap-4", className)),
      ...restProps,
      children
    }
  );
}

export { AudioPlayerInfo as A };
