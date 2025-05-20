'use strict';

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('./bundle-mjs-BaFtyl1I.js');

function Icon(props) {
  const { as: IconComponent, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    IconComponent,
    {
      className: bundleMjs.twMerge(bundleMjs.clsx("h-[1em] fill-current", className)),
      ...restProps
    }
  );
}

exports.Icon = Icon;
