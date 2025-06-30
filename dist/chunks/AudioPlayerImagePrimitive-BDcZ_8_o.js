import { jsx } from 'react/jsx-runtime';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { I as IconDiscFill } from './IconDiscFill-DujXGtnK.js';

function AudioPlayerImagePrimitive(props) {
  const {
    as: Element = "div",
    className,
    altText,
    width = 96,
    height = 96,
    src,
    ...restProps
  } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(
        clsx(
          "flex h-24 w-24 items-center justify-center overflow-hidden bg-neutral-100/10",
          className
        )
      ),
      ...restProps,
      children: src ? /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt: altText,
          className: "h-full w-full object-cover",
          width,
          height
        }
      ) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-4xl", children: /* @__PURE__ */ jsx(IconDiscFill, {}) }) })
    }
  );
}

export { AudioPlayerImagePrimitive as A };
