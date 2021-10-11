import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import { RecoilRoot } from 'recoil';

import Executive from './Executive';
import { useSetExecutiveTestData } from '../../../../tests/hooks/useSetExecutiveTestData';

const executiveName = 'John Doe';
const executiveTitle = 'CEO';
const executiveId = 1;

const InitializeState = ({ executiveId, executiveName, executiveTitle }) => {
  
  const loading = useSetExecutiveTestData({ executiveId, executiveName, executiveTitle });

  return loading ? null : <Executive executiveId={ executiveId } />

};

const component = (executiveId, executiveName, executiveTitle) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } executiveName={ executiveName } executiveTitle={ executiveTitle } />
  </RecoilRoot>
);


test('should render name, title and delete button', () => {
  const { getByText } = render(component(executiveId, executiveName, executiveTitle));
  const name = getByText(executiveName);
  const title = getByText(executiveTitle);
  const deleteButton = getByText('Delete Executive');  
  expect(name).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
