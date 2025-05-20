import { jsx } from 'react/jsx-runtime';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';

function AudioPlayerAuthorPrimitive(props) {
  const { as: Element = "p", children, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("line-clamp-1 text-sm text-gray-400", className)),
      ...restProps,
      children
    }
  );
}

export { AudioPlayerAuthorPrimitive as A };
