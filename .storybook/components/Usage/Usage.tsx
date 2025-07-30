import { Source, Markdown } from '@storybook/addon-docs/blocks';
import { Tabs } from '@/.storybook/components/Tabs';
import { useOfMeta } from '@/.storybook/hooks/useOfMeta';
import { styled } from '@storybook/theming';
import { Typography } from '@/.storybook/components/Typography';
import { baseCommon } from '@/.storybook/components/Typography/config';

const StyledUsage = styled.div(baseCommon, {
  '.docblock-source': {
    marginBottom: '0px',
  },
});

const StyledHeader = styled(Typography.H2)({
  border: 'none',
  padding: '0px',
  marginBottom: '1rem',
});

export function Usage() {
  const { csfFile } = useOfMeta();

  const storyModuleExports = Object.values(csfFile.stories)
    .filter((story) => story.tags?.includes('usage'))
    .map((story) => story.moduleExport);

  if (!storyModuleExports?.length) {
    return null;
  }

  return (
    <StyledUsage>
      <StyledHeader as="div">
        <Markdown>## Usage</Markdown>
      </StyledHeader>
      <Tabs.Root defaultValue={storyModuleExports[0].name}>
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
    </StyledUsage>
  );
}
