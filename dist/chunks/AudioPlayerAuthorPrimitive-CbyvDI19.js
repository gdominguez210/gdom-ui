import { jsx } from 'react/jsx-runtime';
import { t as twMerge } from './bundle-mjs-BBFHkixS.js';
import { c as clsx } from './clsx-ChV9xqsO.js';

function AudioPlayerAuthorPrimitive(props) {
  const { as: Element = "span", children, className, ...restProps } = props;
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
