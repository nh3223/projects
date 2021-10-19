import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';

import Home from './Home';
import { stringify } from '../../../utilities/date/date';
import { useSetCompanies } from '../../../tests/hooks/useSetCompanies';

const InitializeState = ({ companies }) => {
  const loading = useSetCompanies({ companies });
  return loading ? null : <Home />;
};

const component = (history, companies) => (
  <RecoilRoot>
    <Router history={ history }>
      <InitializeState companies={ companies } />
    </Router>
  </RecoilRoot>
);

const companyA = { 
  _id: 1,
  projectName: 'Project A',
  companyName: 'Company A',
  transactionDate: stringify(new Date('December 1, 2021')),
  transactionPrice: 10
};
const companyB = { 
  _id: 2,
  projectName: 'Project B',
  companyName: 'Company B',
  transactionDate: stringify(new Date('December 2, 2021')),
  transactionPrice: 20
 };

const companies = [ companyA, companyB ];

const history = createMemoryHistory();

jest.mock('../../../hooks/useLoadCompanies', () => ({
  useLoadCompanies: () => ({ loading: false, error: null })
}));

jest.mock('../../../api/company/createCompany', () => ({
  createCompany: () => ({ _id: 3 })
}))

jest.mock('../../../api/company/deleteCompany', () => ({
  deleteCompany: () => ({  })
}));

test('should show Add Button, project names, and delete buttons', () => {
  const { getByRole, getByText } = render(component(history, companies));
  const addButton = getByRole('button', { name: 'Add Company' });
  const projectA = getByText('Project A');
  const projectB = getByText('Project B');
  const deleteA = getByRole('button', { name: 'Delete Company-1' });
  const deleteB = getByRole('button', { name: 'Delete Company-2' });
  expect(addButton).toBeInTheDocument();
  expect(projectA).toBeInTheDocument();
  expect(projectB).toBeInTheDocument();
  expect(deleteA).toBeInTheDocument();
  expect(deleteB).toBeInTheDocument();
});

test('should redirect to company information page when Add button is clicked', async () => {
  const { getByRole } = render(component(history, companies));  
  const addButton = getByRole('button', { name: 'Add Company' });
  expect(addButton).toBeInTheDocument();
  userEvent.click(addButton);
  await waitFor(() => expect(history.location.pathname).toBe(`/company/3/info`));
});

test('should delete project when delete button is clicked', async () => {
  const { getByRole, queryByRole } = render(component(history, companies));
  const deleteA = queryByRole('button', { name: 'Delete Company-1' });
  const deleteB = getByRole('button', { name: 'Delete Company-2' });
  userEvent.click(deleteA);
  await waitFor( () => {
    expect(deleteA).not.toBeInTheDocument();
    expect(deleteB).toBeInTheDocument();
  });
});