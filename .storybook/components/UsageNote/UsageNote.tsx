import type { ComponentPropsWithRef } from 'react';

export function UsageNote(props: ComponentPropsWithRef<'section'>) {
  const { children } = props;

  return (
    <section
      className="font-inter mt-[24px] mb-[40px] rounded-md border border-slate-400 bg-slate-100 p-3 text-slate-700 shadow-[0px_1px_3px_0px_rgba(38,85,115,0.15)]"
      {...props}
    >
      <span className="font-bold">Usage Note</span>
      {children}
    </section>
  );
}
