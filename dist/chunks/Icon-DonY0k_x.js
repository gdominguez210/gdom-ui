import { jsx } from 'react/jsx-runtime';
import { t as twMerge, c as clsx } from './bundle-mjs-Cl353mOg.js';

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
