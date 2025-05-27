'use strict';

const jsxRuntime = require('react/jsx-runtime');
const clsx = require('./clsx-BtxeOLZW.js');
const bundleMjs = require('./bundle-mjs-CqGQhiOy.js');

function Icon(props) {
  const { as: IconComponent, className, ...restProps } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    IconComponent,
    {
      className: bundleMjs.twMerge(clsx.clsx("h-[1em] fill-current", className)),
      ...restProps
    }
  );
}

exports.Icon = Icon;
