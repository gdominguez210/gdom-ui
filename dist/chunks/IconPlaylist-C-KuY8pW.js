import { jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { forwardRef } from 'react';
import { I as Icon } from './Icon-Cr4NuRJP.js';

const SvgPlaylist = (props, ref) => /* @__PURE__ */ React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", viewBox: "0 0 16 16", ref, ...props }, /* @__PURE__ */ React.createElement("path", { d: "M2 4h12a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm0 5h12a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zm0 5h12a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2z" }));
const ForwardRef = forwardRef(SvgPlaylist);

function IconPlaylist(props) {
  return /* @__PURE__ */ jsx(Icon, { as: ForwardRef, ...props });
}

export { IconPlaylist as I };
