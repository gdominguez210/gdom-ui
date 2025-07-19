import React from 'react';
import { useStorybookState, useGlobals } from 'storybook/manager-api';
import { styled } from 'storybook/theming';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid ${(props) => props.theme.appBorderColor};
`;

const PaginationLink = styled.a`
  color: ${(props) => props.theme.color.secondary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const Pagination = () => {
  const state = useStorybookState();
  console.log('state', state);
  console.log('state.viewMode', state.viewMode);

  // Get the current story ID from the state
  const currentStoryId = state.storyId;

  console.log('currentStoryId', currentStoryId);

  return null;
  // Only show pagination for Core Concepts pages
  if (!currentStoryId.startsWith('core-concepts')) {
    return null;
  }

  // Get the order from the storySort configuration
  const coreConceptsOrder =
    state.storySort?.order?.find((section: string[]) => section[0] === 'Core Concepts')?.slice(1) ||
    [];

  const currentIndex = coreConceptsOrder.indexOf(currentStoryId.split('/').pop());

  const prevPage = currentIndex > 0 ? coreConceptsOrder[currentIndex - 1] : null;
  const nextPage =
    currentIndex < coreConceptsOrder.length - 1 ? coreConceptsOrder[currentIndex + 1] : null;

  return null;

  return (
    <PaginationContainer>
      {prevPage ? (
        <PaginationLink href={`?path=/docs/core-concepts-${prevPage}`}>← {prevPage}</PaginationLink>
      ) : (
        <div />
      )}

      {nextPage ? (
        <PaginationLink href={`?path=/docs/core-concepts-${nextPage}`}>{nextPage} →</PaginationLink>
      ) : (
        <div />
      )}
    </PaginationContainer>
  );
};
