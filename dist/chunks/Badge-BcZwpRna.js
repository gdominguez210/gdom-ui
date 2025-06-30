'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const bundleMjs = require('./bundle-mjs-BqLi5MZM.js');
const index = require('./index-Ce-Pd1T7.js');

const badgeStyles = index.cva(
  "inline-flex items-center rounded-full border border-solid font-normal text-center",
  {
    variants: {
      variant: {
        neutral: "bg-gray-50 border-neutral-200 text-neutral-600",
        danger: "bg-red-50 border-red-200 text-red-600",
        warning: "bg-amber-50 border-amber-200 text-amber-600",
        success: "bg-green-50 border-green-200 text-green-600",
        brand: "bg-indigo-50 border-indigo-50 text-indigo-600"
      },
      size: {
        sm: "text-xs px-1.5 py-0.5",
        md: "text-sm px-2 py-0.5",
        lg: "text-sm px-2.5 py-1"
      }
    },
    defaultVariants: {
      variant: "neutral",
      size: "md"
    }
  }
);
function _Badge(props, ref) {
  const {
    as = "span",
    children,
    className,
    variant = "neutral",
    size = "md",
    ...restProps
  } = props;
  const Node = as;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Node,
    {
      className: bundleMjs.twMerge(badgeStyles({ variant, size, className })),
      ...restProps,
      ref,
      children
    }
  );
}
const Badge = React.forwardRef(_Badge);
Badge.displayName = "Badge";

exports.Badge = Badge;
