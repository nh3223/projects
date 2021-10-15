import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import { RecoilRoot, useRecoilValue } from 'recoil';

import { companiesState } from '../recoil/company';
import { useSetCompanies } from '../tests/hooks/useSetCompanies';
import * as fetchCompanies from '../api/company/fetchCompanies';

import { useLoadCompanies } from './useLoadCompanies';

const UseLoadCompaniesTest = () => {

  const { status } = useLoadCompanies();
  const companies = useRecoilValue(companiesState);

  if (status === 'loading') return <p>Loading</p>;

    return (
      <>
        { companies.map((company) => <p key={ company } >{ company }</p>) }
      </>
    );

};

const InitializeState = ({ companies }) => {
  const loading = useSetCompanies({ companies });
  return (loading) ? null : <UseLoadCompaniesTest companies={ companies } />
};

const Component = ({ companies }) => (
  <RecoilRoot>
    <InitializeState companies={ companies } />
  </RecoilRoot>
);

test('should show Companies if already loaded', async () => {

  const companies = [ 'companyA', 'companyB' ]

  const { getByText } = render(<Component companies = { companies } />);
  
  await waitFor(() => {
    const companyA = getByText('companyA');
    const companyB = getByText('companyB');
    expect(companyA).toBeInTheDocument();
    expect(companyB).toBeInTheDocument();
  });

});

test('should load companies if not yet loaded', async () => {
  
  const companies = [];

  jest.spyOn(fetchCompanies, 'fetchCompanies').mockImplementation(() => Promise.resolve(['companyA', 'companyB']));
  
  const { getByText } = render(<Component companies = { companies } />);
  await waitFor(() => {
    const companyA = getByText('companyA');
    const companyB = getByText('companyB');
    expect(companyA).toBeInTheDocument();
    expect(companyB).toBeInTheDocument();
  });

});