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

const SvgStarLine = (props, ref) => /* @__PURE__ */ React__namespace.createElement("svg", { viewBox: "0 0 16 16", xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M8.00044 12.3471L3.10221 15.0889L4.19619 9.58317L0.0749512 5.77199L5.64928 5.11106L8.00044 0.0137939L10.3516 5.11106L15.9259 5.77199L11.8047 9.58317L12.8986 15.0889L8.00044 12.3471ZM8.00044 10.7555L10.9495 12.4062L10.2909 9.09136L12.7722 6.79671L9.416 6.39875L8.00044 3.32978L6.58485 6.39875L3.22865 6.79671L5.70997 9.09136L5.0513 12.4062L8.00044 10.7555Z" }));
const ForwardRef = React.forwardRef(SvgStarLine);

exports.ForwardRef = ForwardRef;
