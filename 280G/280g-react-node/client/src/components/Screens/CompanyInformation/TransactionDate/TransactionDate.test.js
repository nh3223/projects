import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import TransactionDate from './TransactionDate';
import { transactionDateState } from '../../../../recoil/company';
import * as editCompany from '../../../../api/company/editCompany';
import { stringify, formatDate } from '../../../../utilities/formatDate';

const component = (transactionDate) => (
  <RecoilRoot initializeState={ ({ set }) => set(transactionDateState, transactionDate) }>
    <TransactionDate />
  </RecoilRoot>
);

const defaultTransactionDate = '';
const givenTransactionDate = new Date('October 1, 2021');
const isoFormatGivenTransactionDate = stringify(givenTransactionDate)
const descriptionText = 'Transaction Date:';


test('should render description and form if no transaction date is provided', () => {
  const { getByRole, getByText } = render(component(defaultTransactionDate)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument(); 
});


test('should render description if transaction date is provided', () => {
  const { getByText } = render(component(isoFormatGivenTransactionDate));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const transactionDate = getByText(formatDate(isoFormatGivenTransactionDate));
  expect(transactionDate).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(isoFormatGivenTransactionDate));
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});

test('should render description after change', async () => {
  
  jest.spyOn(editCompany, 'editCompany').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ transactionDate: isoFormatGivenTransactionDate }),
  }));

  const { getByRole, getByText } = render(component(defaultTransactionDate));
  const input = getByRole('textbox');
  fireEvent.change(input, { target: { value: isoFormatGivenTransactionDate }});
  const transactionDate = await waitFor(() => getByText(formatDate(isoFormatGivenTransactionDate)));
  expect(transactionDate).toBeInTheDocument();
});