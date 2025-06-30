import { jsx } from 'react/jsx-runtime';
import { c as cva } from './index-CO0T2jO4.js';
import { P as Polymorphic } from './Polymorphic-BFTiRnwF.js';

const buttonStyles = cva(
  ["inline-flex justify-center items-center rounded-sm font-medium focus-visible:outline-hidden"],
  {
    variants: {
      variant: {
        primary: "bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-600 text-white ring-blue-600/30 focus:ring-4",
        secondary: "bg-white hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50 border active:border border-solid border-neutral-200 ring-neutral-500/30 focus:ring-4",
        tertiary: "text-blue-500 hover:bg-neutral-50 focus:bg-neutral-50 active:bg-neutral-50 ring-neutral-500/30 focus:ring-4",
        destructive: "text-white bg-red-600 hover:bg-red-700 focus:bg-red-700 active:bg-red-700 ring-red-700/30 focus:ring-4",
        linkColor: "text-blue-500 hover:text-blue-600 focus:text-blue-600 active:text-blue-600 ring-blue-600/30 focus:ring-4",
        linkGray: "text-neutral-600 hover:text-neutral-900 focus:text-neutral-900 active:text-neutral-900 ring-neutral-900/30 focus:ring-4"
      },
      size: {
        md: "gap-1 text-sm",
        lg: "gap-1.5 text-base",
        xl: "gap-2 text-base",
        xxl: "gap-2.5 text-lg"
      },
      disabled: {
        true: "text-neutral-400 pointer-events-none",
        false: ""
      },
      iconOnly: {
        true: "gap-2",
        false: ""
      }
    },
    compoundVariants: [
      {
        variant: ["primary", "secondary", "tertiary", "destructive"],
        size: "md",
        className: "px-3.5 py-2.5"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive"],
        size: "lg",
        className: "px-4 py-2.5"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive"],
        size: "xl",
        className: "px-5 py-3"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive"],
        size: "xxl",
        className: "px-6 py-4"
      },
      {
        variant: ["linkColor", "linkGray"],
        size: ["md", "lg", "xl", "xxl"],
        className: "px-1"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive"],
        disabled: true,
        className: "bg-neutral-100 text-neutral-400 pointer-events-none"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"],
        iconOnly: true,
        size: "md",
        className: "p-2.5 gap-2"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"],
        iconOnly: true,
        size: "lg",
        className: "p-3 gap-2"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"],
        iconOnly: true,
        size: "xl",
        className: "p-3.5"
      },
      {
        variant: ["primary", "secondary", "tertiary", "destructive", "linkColor", "linkGray"],
        iconOnly: true,
        size: "xxl",
        className: "p-4"
      }
    ],
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);
function Button(props) {
  const {
    as = "button",
    children,
    disabled,
    variant = "primary",
    size = "md",
    className,
    iconOnly,
    ...restProps
  } = props;
  return /* @__PURE__ */ jsx(
    Polymorphic,
    {
      as,
      className: buttonStyles({ variant, size, disabled, iconOnly, className }),
      disabled,
      ...restProps,
      children
    }
  );
}

export { Button as B };
