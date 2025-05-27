import { jsx } from 'react/jsx-runtime';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { t as twMerge } from './bundle-mjs-BBFHkixS.js';

function Icon(props) {
  const { as: IconComponent, className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    IconComponent,
    {
      className: twMerge(clsx("h-[1em] fill-current", className)),
      ...restProps
    }
  );
}

export { Icon as I };
