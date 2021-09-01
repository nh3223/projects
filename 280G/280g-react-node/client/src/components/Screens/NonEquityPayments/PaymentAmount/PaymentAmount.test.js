import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import PaymentAmount from './PaymentAmount';
import { nonEquityPaymentAmountState } from '../../../../recoil/nonEquityPayment';
import * as editPayment from '../../../../api/nonEquityPayment/editPayment';

const InitializeState = ({ paymentId, amount }) => {

  const setPaymentAmount = useSetRecoilState(nonEquityPaymentAmountState(paymentId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
    
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setPaymentAmount(amount);
    setLoaded(true);
  }, [amount, setPaymentAmount, setLoaded])

  return loading ? null : <PaymentAmount paymentId={ paymentId } />

}

const component = (companyId, amount) => (
  <RecoilRoot>
    <InitializeState companyId={ companyId } amount={ amount } />
  </RecoilRoot>
);

const grantId = 12;
const defaultPaymentAmount = '';
const validPaymentAmount = 1;
const nonNumericPaymentAmount = 'a';
const nonPositivePaymentAmount = 0;
const descriptionText = 'Payment Amount:';
const error = 'Please enter a valid payment amount';


test('should render description and form if no payment amount is provided', () => {
  const { getByRole, getByText, queryByText } = render(component(grantId, defaultPaymentAmount)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});


test('should render description if payment amount is provided', () => {
  const { getByText } = render(component(grantId, validPaymentAmount));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const paymentAmount = getByText(validPaymentAmount);
  expect(paymentAmount).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(grantId, validPaymentAmount));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(grantId, defaultPaymentAmount));
  const input = getByRole('textbox');
  userEvent.type(input, validPaymentAmount.toString());
  expect(input).toHaveValue(validPaymentAmount.toString());
});


test('should show error message if non-numeric payment amount is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultPaymentAmount));
  const input = getByRole('textbox');
  userEvent.type(input, nonNumericPaymentAmount);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should show error message if non-positive payment amount is submitted', async () => {
  const { getByRole, getByText } = render(component(grantId, defaultPaymentAmount));
  const input = getByRole('textbox');
  userEvent.type(input, nonPositivePaymentAmount);
  userEvent.type(input, '{enter}');
  const errorMessage = getByText(error);
  expect(errorMessage).toBeInTheDocument();
});


test('should render description after valid submit', async () => {
  
  jest.spyOn(editPayment, 'editPayment').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ paymentAmount: validPaymentAmount }),
  }));

  const { getByRole, getByText, queryByText } = render(component(grantId, defaultPaymentAmount));
  const input = getByRole('textbox');
  userEvent.type(input, validPaymentAmount.toString());
  await act(() => userEvent.type(input, '{enter}'));
  const paymentAmount = await waitFor(() => getByText(validPaymentAmount.toString()));
  expect(paymentAmount).toBeInTheDocument();
  const errorMessage = queryByText(error);
  expect(errorMessage).not.toBeInTheDocument();
});