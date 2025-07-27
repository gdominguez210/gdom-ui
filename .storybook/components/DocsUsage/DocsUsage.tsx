import { useOf } from '@storybook/addon-docs/blocks';
import { Tabs } from '@storybook-components/Tabs';
import { Source, Markdown } from '@storybook/addon-docs/blocks';

export function DocsUsage() {
  const resolvedOfMeta = useOf('meta');
  const resolvedCsf = resolvedOfMeta.type === 'meta' ? resolvedOfMeta.csfFile : null;
  const storyModuleExports = Object.values(resolvedCsf?.stories ?? {})
    .map((story) => story?.moduleExport)
    .filter((moduleExport) => !moduleExport?.name?.includes('Usage'));

  if (!storyModuleExports?.length) {
    return null;
  }

  return (
    <div>
      <Markdown>## Usage</Markdown>
      <Tabs.Root
        defaultValue={storyModuleExports[0].name}
        className="mt-[25px] mb-[25px]"
      >
        <Tabs.List>
          {storyModuleExports.map((moduleExport) => (
            <Tabs.Trigger
              key={moduleExport.name}
              value={moduleExport.name}
            >
              {moduleExport.name}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {storyModuleExports.map((moduleExport) => (
          <Tabs.Content
            key={moduleExport.name}
            value={moduleExport.name}
          >
            <Source
              language="tsx"
              dark
              of={moduleExport}
            />
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}
