import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';


import { stringify, formatDate } from "../../../utilities/date/date";
import { useSetCompanyTestData } from '../../../tests/hooks/useSetCompanyTestData';
import { useSetExecutiveTestData } from '../../../tests/hooks/useSetExecutiveTestData';
import { useSetExecutiveIds } from '../../../tests/hooks/useSetExecutiveIds';

import CompanyInformation from './CompanyInformation';

const InitializeState = ({ companyId, projectName, companyName, transactionDate, transactionPrice, executiveId, executiveName, executiveTitle }) => {

  const loadingCompany = useSetCompanyTestData({ companyId, projectName, companyName, transactionDate, transactionPrice });
  
  const loadingId = useSetExecutiveIds({ companyId, executiveIds: [executiveId] });

  const loadingExecutive = useSetExecutiveTestData({ executiveId, executiveName, executiveTitle });

  return (loadingCompany || loadingId || loadingExecutive ) ? null : <CompanyInformation companyId={ companyId } />

};

const component = (companyId, projectName, companyName, transactionDate, transactionPrice, executiveId, executiveName, executiveTitle) => {
  
  const history = createMemoryHistory();

  return (
    <RecoilRoot>
      <Router history={ history }>
        <InitializeState companyId={ companyId } projectName={ projectName } companyName={ companyName } transactionDate={ transactionDate } 
                         transactionPrice={ transactionPrice } executiveId={ executiveId } executiveName={ executiveName } executiveTitle={ executiveTitle } />
      </Router>
    </RecoilRoot>
  );

};

const companyId = 12;
const projectName = 'Test Project';
const companyName = 'Test Company';
const transactionDate = stringify(new Date('December 1, 2021'));
const transactionPrice = 10;

const executiveId = 1;
const executiveName = 'John Doe';
const executiveTitle = 'CEO';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ companyId })
}));

jest.mock('../../../api/company/createCompany', () => ({
  createCompany: () => ({ _id: companyId })
}));

jest.mock('../../../hooks/useLoadCompany', () => ({
  useLoadCompany: () => ({ loading: false, error: null })
}));

jest.mock('../../../hooks/useLoadExecutives', () => ({
  useLoadExecutives: () => ({ loading: false, error: null })
}));


test('should show Company Information and Executives', () => {
  const { getByText, getAllByText } = render(component(companyId, projectName, companyName, transactionDate, transactionPrice, executiveId, executiveName, executiveTitle));
  const project = getByText(projectName);
  const company = getByText(companyName);
  const date = getByText(formatDate(transactionDate));
  const price = getByText(transactionPrice);
  const executive = getAllByText(executiveName);
  expect(project).toBeInTheDocument();
  expect(company).toBeInTheDocument();
  expect(date).toBeInTheDocument();
  expect(price).toBeInTheDocument();
  expect(executive.length).toBe(2);
});

test('should show company information forms and no executives', () => {
  const { getAllByRole, queryByText } = render(component('','','','','','','',''));
  const forms = getAllByRole('textbox');
  const executive = queryByText(executiveName);
  expect(forms.length).toBe(4);
  expect(executive).not.toBeInTheDocument();
});