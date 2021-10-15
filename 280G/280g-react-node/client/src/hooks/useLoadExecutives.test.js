import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import { RecoilRoot, useRecoilValue } from 'recoil';

import { executiveIdsState } from '../recoil/executive';
import { useSetExecutiveIds} from '../tests/hooks/useSetExecutiveIds';
import * as fetchExecutives from '../api/executive/fetchExecutives';

import { useLoadExecutives } from './useLoadExecutives';

const UseLoadExecutivesTest = ({ companyId }) => {

  const { status } = useLoadExecutives(companyId);

  const executiveIds = useRecoilValue(executiveIdsState(companyId));

  if (status === 'loading') return <p>Loading</p>;

    return (
      <>
        { executiveIds.map((executiveId) => <p key={ executiveId }>{ executiveId }</p>) }
      </>
    );

};

const InitializeState = ({ companyId, executiveIds }) => {
  const loading = useSetExecutiveIds({ companyId, executiveIds });
  return (loading) ? null : <UseLoadExecutivesTest companyId={ companyId } />
};

const Component = ({ companyId, executiveIds }) => (
  <RecoilRoot>
    <InitializeState companyId={ companyId } executiveIds={ executiveIds } />
  </RecoilRoot>
);

test('should show ExecutiveIds if already loaded', async () => {

  const companyId = 12;
  const executiveIds = [ '1' , '2' ]

  const { getByText } = render(<Component companyId={ companyId } executiveIds = { executiveIds } />);
  
  await waitFor(() => {
    const executive1 = getByText('1');
    const executive2 = getByText('2');
    expect(executive1).toBeInTheDocument();
    expect(executive2).toBeInTheDocument();
  });

});

test('should load executiveIds if not yet loaded', async () => {
  
  jest.spyOn(fetchExecutives, 'fetchExecutives').mockImplementation(() => Promise.resolve([
    { _id: '1' },
    { _id: '2' }
  ]));
  
  const companyId = 12;
  const executiveIds = [ ]

  const { getByText } = render(<Component companyId={ companyId } executiveIds = { executiveIds } />);
  
  await waitFor(() => {
    const executive1 = getByText('1');
    const executive2 = getByText('2');
    expect(executive1).toBeInTheDocument();
    expect(executive2).toBeInTheDocument();
  });

});