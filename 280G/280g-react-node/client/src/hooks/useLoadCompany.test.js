import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import { RecoilRoot, useRecoilValue } from 'recoil';

import { stringify, formatDate } from "../utilities/date/date";
import { projectNameState, companyNameState, transactionDateState, transactionPriceState } from '../recoil/company';
import { useSetCompanyTestData } from '../tests/hooks/useSetCompanyTestData';
import * as fetchCompany from '../api/company/fetchCompany';

import { useLoadCompany } from './useLoadCompany';

const UseLoadCompanyTest = ({ companyId }) => {

  const { status } = useLoadCompany(companyId);

  const projectName = useRecoilValue(projectNameState(companyId));
  const companyName = useRecoilValue(companyNameState(companyId));
  const transactionDate = useRecoilValue(transactionDateState(companyId));
  const transactionPrice = useRecoilValue(transactionPriceState(companyId));

  if (status === 'loading') return <p>Loading</p>;


    return (
      <>
        <p>{ projectName }</p>
        <p>{ companyName }</p>
        <p>{ formatDate(transactionDate) }</p>
        <p>{ transactionPrice }</p>
      </>
    );

};

const InitializeState = ({ companyData }) => {
  const { companyId, projectName, companyName, transactionDate, transactionPrice } = companyData;
  const loading = useSetCompanyTestData({ companyId, projectName, companyName, transactionDate, transactionPrice });
  return (loading) ? null : <UseLoadCompanyTest companyId={ companyId } />
};

const Component = ({ companyData }) => (
  <RecoilRoot>
    <InitializeState companyData={ companyData } />
  </RecoilRoot>
);

const mockTransactionDate = stringify(new Date('December 1, 2021'));

test('should show Company Information if already loaded', async () => {

  const companyId = 12;
  const projectName = 'Test Project';
  const companyName = 'Test Company';
  const transactionDate = stringify(new Date('December 1, 2021'));
  const transactionPrice = 10;

  const companyData = { companyId, projectName, companyName, transactionDate, transactionPrice };
   
  const { getByText } = render(<Component companyData = { companyData } />);
  
  await waitFor(() => {
    const project = getByText(projectName);
    const company = getByText(companyName);
    const date = getByText(formatDate(transactionDate));
    const price = getByText(transactionPrice);
    expect(project).toBeInTheDocument();
    expect(company).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

});

test('should load company information if not yet loaded', async () => {
  
  const companyId = 12;
  const projectName = '';
  const companyName = '';
  const transactionDate = '';
  const transactionPrice = '';

  const companyData = { companyId, projectName, companyName, transactionDate, transactionPrice }

  jest.spyOn(fetchCompany, 'fetchCompany').mockImplementation(() => Promise.resolve({
      projectName: 'Test Project',
      companyName: 'Test Company',
      transactionDate: mockTransactionDate,
      transactionPrice: 10
  }));
  
  const { getByText } = render(<Component companyData = { companyData } />);
  await waitFor(() => {
    const project = getByText('Test Project');
    const company = getByText('Test Company');
    const date = getByText(formatDate(mockTransactionDate));
    const price = getByText(10);
    expect(project).toBeInTheDocument();
    expect(company).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

});
