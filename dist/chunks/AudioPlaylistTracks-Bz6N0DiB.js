import { jsx } from 'react/jsx-runtime';
import { t as twMerge } from './bundle-mjs-BME7zF0Z.js';
import { c as clsx } from './clsx-ChV9xqsO.js';

function AudioPlaylistTracks(props) {
  const { as: Element = "ul", className, children, ...restProps } = props;
  return /* @__PURE__ */ jsx(
    Element,
    {
      className: twMerge(clsx("flex flex-col gap-2 p-4", className)),
      ...restProps,
      children
    }
  );
}

export { AudioPlaylistTracks as A };
