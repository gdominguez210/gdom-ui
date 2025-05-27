import { jsx } from 'react/jsx-runtime';
import { t as twMerge } from '../chunks/bundle-mjs-BBFHkixS.js';

function Polymorphic(props) {
  const { as: Element = "div", children, className, ...rest } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(className),
      ...rest,
      children
    }
  );
}

export { Polymorphic };
