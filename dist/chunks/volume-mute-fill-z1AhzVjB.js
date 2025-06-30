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

const SvgVolumeMuteFill = (props, ref) => /* @__PURE__ */ React__namespace.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "currentColor", width: "1em", height: "1em", ref, ...props }, /* @__PURE__ */ React__namespace.createElement("path", { d: "M5.88889 16H2C1.44772 16 1 15.5523 1 15V9.00001C1 8.44772 1.44772 8.00001 2 8.00001H5.88889L11.1834 3.66815C11.3971 3.49329 11.7121 3.52479 11.887 3.73851C11.9601 3.82784 12 3.93971 12 4.05513V19.9449C12 20.221 11.7761 20.4449 11.5 20.4449C11.3846 20.4449 11.2727 20.405 11.1834 20.3319L5.88889 16ZM20.4142 12L23.9497 15.5355L22.5355 16.9498L19 13.4142L15.4645 16.9498L14.0503 15.5355L17.5858 12L14.0503 8.46447L15.4645 7.05026L19 10.5858L22.5355 7.05026L23.9497 8.46447L20.4142 12Z" }));
const ForwardRef = React.forwardRef(SvgVolumeMuteFill);

exports.ForwardRef = ForwardRef;
