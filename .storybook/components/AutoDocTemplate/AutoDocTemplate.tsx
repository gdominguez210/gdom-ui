import {
  DocBlockContainer,
  Header,
  ApiReference,
  Sandbox,
  Features,
  Usage,
  Stories,
  TableOfContents,
  Custom,
} from '@/.storybook/doc-blocks';

export function AutoDocTemplate() {
  return (
    <DocBlockContainer>
      <TableOfContents />
      <Header />

      <Sandbox />
      <ApiReference />
      <Features />

      <Usage />

      <Stories />
      <Custom />
    </DocBlockContainer>
  );
}
