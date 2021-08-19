import React, { useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import Executive from './Executive';
import { executiveNameState, executiveTitleState } from '../../../../../recoil/executive';

const executiveName = 'John Doe';
const executiveTitle = 'CEO';
const executiveId = 1;

const InitializeState = ({ executiveId, name, title }) => {
  const setExecutiveName = useSetRecoilState(executiveNameState(executiveId));
  const setExecutiveTitle = useSetRecoilState(executiveTitleState(executiveId));
  useEffect(() => {
    setExecutiveName(name);
    setExecutiveTitle(title);
  }, [name, title, setExecutiveName, setExecutiveTitle]);
  return null;
};

const component = (executiveId, executiveName, executiveTitle) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } name={ executiveName } title={ executiveTitle } />
    <Executive executiveId={ executiveId } />
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
