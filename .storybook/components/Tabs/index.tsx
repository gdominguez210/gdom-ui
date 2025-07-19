import * as RadixTabs from '@radix-ui/react-tabs';
import type { ComponentProps } from 'react';
import { cn } from '@/utils/cn';

function TabsRoot(props: ComponentProps<typeof RadixTabs.Root>) {
  const { className, ...rest } = props;
  return (
    <RadixTabs.Root
      className={cn('flex flex-col', className)}
      {...rest}
    />
  );
}

function TabsList(props: ComponentProps<typeof RadixTabs.TabsList>) {
  const { className, ...rest } = props;
  return (
    <RadixTabs.List
      className={cn('inline-flex items-center gap-4', className)}
      {...rest}
    />
  );
}

function TabsTrigger(props: ComponentProps<typeof RadixTabs.TabsTrigger>) {
  const { className, ...rest } = props;
  return (
    <RadixTabs.Trigger
      className={cn(
        'border-b-3 border-transparent px-3.5 py-2.5 text-sm font-bold text-neutral-400 data-[state=active]:border-blue-300 data-[state=active]:text-black',
        className,
      )}
      {...rest}
    />
  );
}

function TabsContent(props: ComponentProps<typeof RadixTabs.TabsContent>) {
  return <RadixTabs.Content {...props} />;
}

export const Tabs = {
  Root: Object.assign(TabsRoot, { displayName: 'Tabs.Root' }),
  List: Object.assign(TabsList, { displayName: 'Tabs.List' }),
  Trigger: Object.assign(TabsTrigger, { displayName: 'Tabs.Trigger' }),
  Content: Object.assign(TabsContent, { displayName: 'Tabs.Content' }),
};
