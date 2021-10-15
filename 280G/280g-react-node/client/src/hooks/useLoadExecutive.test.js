import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import { RecoilRoot, useRecoilValue } from 'recoil';

import { executiveNameState, executiveTitleState } from '../recoil/executive';
import { useSetExecutiveTestData } from '../tests/hooks/useSetExecutiveTestData';
import * as fetchExecutive from '../api/executive/fetchExecutive';

import { useLoadExecutive } from './useLoadExecutive';

const UseLoadExecutiveTest = ({ executiveId }) => {

  const { status } = useLoadExecutive(executiveId);

  const executiveName = useRecoilValue(executiveNameState(executiveId));
  const executiveTitle = useRecoilValue(executiveTitleState(executiveId));
  
  if (status === 'loading') return <p>Loading</p>;

  return (
    <>
      <p>{ executiveName }</p>
      <p>{ executiveTitle }</p>
    </>
  );

};

const InitializeState = ({ executiveData }) => {
  const { executiveId, executiveName, executiveTitle } = executiveData;
  const loading = useSetExecutiveTestData({ executiveId, executiveName, executiveTitle });
  return (loading) ? null : <UseLoadExecutiveTest executiveId={ executiveId } />
};

const Component = ({ executiveData }) => (
  <RecoilRoot>
    <InitializeState executiveData={ executiveData } />
  </RecoilRoot>
);

test('should show executive if already loaded', async () => {

  const executiveId = 1;
  const executiveName = 'John';
  const executiveTitle = 'CEO';

  const executiveData = { executiveId, executiveName, executiveTitle };
   
  const { getByText } = render(<Component executiveData = { executiveData } />);
  
  await waitFor(() => {
    const name = getByText('John');
    const title = getByText('CEO');
    expect(name).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

});

test('should load executive if not yet loaded', async () => {
  
  jest.spyOn(fetchExecutive, 'fetchExecutive').mockImplementation(() => Promise.resolve({
      executiveName: 'John',
      executiveTitle: 'CEO'
  }));
  
  const executiveId = 1;
  const executiveName = '';
  const executiveTitle = '';

  const executiveData = { executiveId, executiveName, executiveTitle };
   
  const { getByText } = render(<Component executiveData = { executiveData } />);
  await waitFor(() => {
    const name = getByText('John');
    const title = getByText('CEO');
    expect(name).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

});