import type { ComponentPropsWithRef } from 'react';

export function UsageNote(props: ComponentPropsWithRef<'section'>) {
  const { children } = props;

  return (
    <section
      className="font-inter mt-[24px] mb-[40px] rounded-md border border-slate-400 bg-slate-100 p-3 text-slate-700"
      {...props}
    >
      <span className="font-bold">Usage Note</span>
      {children}
    </section>
  );
}
