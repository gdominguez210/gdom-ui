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

const SvgPlaylist = (props, ref) => /* @__PURE__ */ React__namespace.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 16 16", ref, ...props }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M2 4h12a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm0 5h12a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm0 5h12a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2z" }));
const ForwardRef = React.forwardRef(SvgPlaylist);

function IconPlaylist(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(Icon.Icon, { as: ForwardRef, ...props });
}

exports.IconPlaylist = IconPlaylist;
