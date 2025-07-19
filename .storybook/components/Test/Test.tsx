import { useStorybookState } from 'storybook/manager-api';
import { useEffect } from 'react';

export function Test() {
  const state = useStorybookState();

  console.log(state);

  return null;
}
