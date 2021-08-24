import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import TransactionPrice from './TransactionPrice';
import { transactionPriceState } from '../../../../recoil/company';
import * as editCompany from '../../../../api/company/editCompany';

const InitializeState = ({ companyId, price }) => {

  const setTransactionPrice = useSetRecoilState(transactionPriceState(companyId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
    
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setTransactionPrice(price);
    setLoaded(true);
  }, [price, setTransactionPrice, setLoaded])

  return loading ? null : <TransactionPrice companyId={ companyId } />

}

const component = (companyId, price) => (
  <RecoilRoot>
    <InitializeState companyId={ companyId } price={ price } />
  </RecoilRoot>
);

const companyId = 12;
const defaultTransactionPrice = '';
const validTransactionPrice = 1;
const nonNumericTransactionPrice = 'a';
const nonPositiveTransactionPrice = 0;
const descriptionText = 'Transaction Price per Share:';
const error = 'Please enter a valid per share price';


test('should render description and form if no transaction price is provided', () => {
  const { getByRole, getByText, queryByText } = render(component(defaultTransactionPrice)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


test('should render description if transaction price is provided', () => {
  const { getByText } = render(component(companyId, validTransactionPrice));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const transactionPrice = getByText(validTransactionPrice);
  expect(transactionPrice).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(companyId, validTransactionPrice));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(companyId, defaultTransactionPrice));
  const input = getByRole('textbox');
  userEvent.type(input, validTransactionPrice.toString());
  expect(input).toHaveValue(validTransactionPrice.toString());
});


test('should show error message if non-numeric transaction price is submitted', async () => {
  const { getByRole, getByText } = render(component(companyId, defaultTransactionPrice));
  const input = getByRole('textbox');
  userEvent.type(input, nonNumericTransactionPrice);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if non-positive transaction price is submitted', async () => {
  const { getByRole, getByText } = render(component(companyId, defaultTransactionPrice));
  const input = getByRole('textbox');
  userEvent.type(input, nonPositiveTransactionPrice);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should render description after valid submit', async () => {
  
  jest.spyOn(editCompany, 'editCompany').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ transactionPrice: validTransactionPrice }),
  }));

  const { getByRole, getByText, queryByText } = render(component(companyId, defaultTransactionPrice));
  const input = getByRole('textbox');
  userEvent.type(input, validTransactionPrice.toString());
  await act(() => userEvent.type(input, '{enter}'));
  const transactionPrice = await waitFor(() => getByText(validTransactionPrice.toString()));
  expect(transactionPrice).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


