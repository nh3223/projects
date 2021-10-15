import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import { RecoilRoot, useRecoilValue } from 'recoil';

import { equityGrantIdsState } from '../recoil/equityGrant';
import { useSetGrantIds} from '../tests/hooks/useSetGrantIds';
import * as fetchGrants from '../api/equitygrant/fetchGrants';

import { useLoadGrants } from './useLoadGrants';

const UseLoadGrantsTest = ({ executiveId }) => {

  const { status } = useLoadGrants(executiveId);

  const grantIds = useRecoilValue(equityGrantIdsState(executiveId));

  if (status === 'loading') return <p>Loading</p>;

    return (
      <>
        { grantIds.map((grantId) => <p key={ grantId }>{ grantId }</p>) }
      </>
    );

};

const InitializeState = ({ executiveId, grantIds }) => {
  const loading = useSetGrantIds({ executiveId, grantIds });
  return (loading) ? null : <UseLoadGrantsTest executiveId={ executiveId } />
};

const Component = ({ executiveId, grantIds }) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } grantIds={ grantIds } />
  </RecoilRoot>
);

test('should show grant Ids if already loaded', async () => {

  const executiveId = 1;
  const grantIds = [ '1001' , '1002' ]

  const { getByText } = render(<Component executiveId={ executiveId } grantIds = { grantIds } />);
  
  await waitFor(() => {
    const grant1 = getByText('1001');
    const grant2 = getByText('1002');
    expect(grant1).toBeInTheDocument();
    expect(grant2).toBeInTheDocument();
  });

});

test('should load grantIds if not yet loaded', async () => {
  
  jest.spyOn(fetchGrants, 'fetchGrants').mockImplementation(() => Promise.resolve([
    { _id: '1001' },
    { _id: '1002' }
  ]));
  
  const executiveId = 1;
  const grantIds = [ ]

  const { getByText } = render(<Component executiveId={ executiveId } grantIds = { grantIds } />);
  
  await waitFor(() => {
    const grant1 = getByText('1001');
    const grant2 = getByText('1002');
    expect(grant1).toBeInTheDocument();
    expect(grant2).toBeInTheDocument();
  });

});