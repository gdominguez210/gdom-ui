'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const bundleMjs = require('../chunks/bundle-mjs-CqGQhiOy.js');

function Polymorphic(props) {
  const { as: Element = "div", children, className, ...rest } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(
    Element,
    {
      className: bundleMjs.twMerge(className),
      ...rest,
      children
    }
  );
}

exports.Polymorphic = Polymorphic;
