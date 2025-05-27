import { jsx } from 'react/jsx-runtime';
import { C as CanvasResponsive } from './CanvasResponsive-DZEodUk-.js';
import { c as clsx } from './clsx-ChV9xqsO.js';
import { t as twMerge } from './bundle-mjs-BBFHkixS.js';

const AudioVisualizerCanvas = (props) => {
  const { className, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    CanvasResponsive,
    {
      className: twMerge(
        clsx(
          'relative bg-radial from-slate-800 from-0% to-slate-950 to-90% before:absolute before:inset-0 before:bg-radial before:from-white before:to-transparent before:bg-[size:1px_1px] before:content-[""]',
          className
        )
      ),
      ...restProps
    }
  );
};

export { AudioVisualizerCanvas as A };
