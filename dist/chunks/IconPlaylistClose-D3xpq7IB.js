'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const Icon = require('./Icon-BTYAW3mV.js');

function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const React__namespace = /*#__PURE__*/_interopNamespaceDefault(React);

const SvgPlaylistClose = (props, ref) => /* @__PURE__ */ React__namespace.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 16 16", ref, ...props }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" }));
const ForwardRef = React.forwardRef(SvgPlaylistClose);

function IconPlaylistClose(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(Icon.Icon, { as: ForwardRef, ...props });
}

exports.IconPlaylistClose = IconPlaylistClose;
