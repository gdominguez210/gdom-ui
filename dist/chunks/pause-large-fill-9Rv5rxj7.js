'use strict';

const React = require('react');

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

const SvgPauseLargeFill = (props, ref) => /* @__PURE__ */ React__namespace.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M6 3H8V21H6V3ZM16 3H18V21H16V3Z" }));
const ForwardRef = React.forwardRef(SvgPauseLargeFill);

exports.ForwardRef = ForwardRef;
