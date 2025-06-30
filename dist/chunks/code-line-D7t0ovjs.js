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

const SvgCodeLine = (props, ref) => /* @__PURE__ */ React__namespace.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M23 12L15.9289 19.0711L14.5147 17.6569L20.1716 12L14.5147 6.34317L15.9289 4.92896L23 12ZM3.82843 12L9.48528 17.6569L8.07107 19.0711L1 12L8.07107 4.92896L9.48528 6.34317L3.82843 12Z" }));
const ForwardRef = React.forwardRef(SvgCodeLine);

exports.ForwardRef = ForwardRef;
