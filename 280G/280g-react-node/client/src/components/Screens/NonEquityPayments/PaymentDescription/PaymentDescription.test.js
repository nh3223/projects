import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {act, render, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil';

import PaymentDescription from './PaymentDescription';
import * as editPayment from '../../../../api/nonEquityPayment/editPayment';
import { useSetNonEquityPaymentTestData } from '../../../../tests/hooks/useSetNonEquityPaymentTestData';

const InitializeState = ({ paymentId, paymentDescription }) => {

  const loading = useSetNonEquityPaymentTestData({ paymentId, paymentDescription });

  return loading ? null : <PaymentDescription paymentId={ paymentId } />

}
const component = (paymentId, paymentDescription) => (
  <RecoilRoot>
    <InitializeState paymentId={ paymentId } paymentDescription={ paymentDescription } />
  </RecoilRoot>
);

const paymentId = 12;
const defaultPaymentDescription = '';
const givenPaymentDescription = 'bonus';
const descriptionText = 'Payment Description:';


test('should render description and form if no company name is provided', () => {
  const { getByRole, getByText } = render(component(paymentId, defaultPaymentDescription)); 
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument(); 
});


test('should render description if company name is provided', () => {
  const { getByText } = render(component(paymentId, givenPaymentDescription));  
  const description = getByText(descriptionText);
  expect(description).toBeInTheDocument();
  const companyName = getByText(givenPaymentDescription);
  expect(companyName).toBeInTheDocument();
});


test('should render form if Edit button is pressed', () => {
  const { getByText, getByRole } = render(component(paymentId, givenPaymentDescription));  
  const editButton = getByText('Edit');
  expect(editButton).toBeInTheDocument();  
  userEvent.click(editButton);  
  const input = getByRole('textbox');
  expect(input).toBeInTheDocument();
});


test('should show value in form if user types in form', () => {
  const { getByRole } = render(component(paymentId, defaultPaymentDescription));
  const input = getByRole('textbox');
  userEvent.type(input, givenPaymentDescription);
  expect(input).toHaveValue(givenPaymentDescription);
});


test('should render description after submit', async () => {
  
  jest.spyOn(editPayment, 'editPayment').mockImplementationOnce(() => Promise.resolve({
    json: () => Promise.resolve({ description: givenPaymentDescription }),
  }));

  const { getByRole, getByText } = render(component(paymentId, defaultPaymentDescription));
  const input = getByRole('textbox');
  userEvent.type(input, givenPaymentDescription);
  await act(() => userEvent.type(input, '{enter}'));
  const companyName = await waitFor(() => getByText(givenPaymentDescription));
  expect(companyName).toBeInTheDocument();
});