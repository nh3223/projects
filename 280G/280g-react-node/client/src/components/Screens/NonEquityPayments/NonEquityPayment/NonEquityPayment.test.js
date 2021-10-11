import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import { RecoilRoot } from 'recoil';

import NonEquityPayment from './NonEquityPayment';
import { useSetNonEquityPaymentTestData } from '../../../../tests/hooks/useSetNonEquityPaymentTestData';

const paymentDescription = 'Bonus';
const paymentAmount = 100;
const paymentId = 1;
const deleteButtonText = 'Delete Payment';

const InitializeState = ({ paymentId, paymentDescription, paymentAmount }) => {

  const loading = useSetNonEquityPaymentTestData({ paymentId, paymentDescription, paymentAmount });

  return loading ? null : <NonEquityPayment paymentId={ paymentId } />

};

const component = (paymentId, paymentDescription, paymentAmount) => (
  <RecoilRoot>
    <InitializeState paymentId={ paymentId } paymentDescription={ paymentDescription } paymentAmount={ paymentAmount } />
  </RecoilRoot>
);

test('should render name, title and delete button', () => {
  const { getByText } = render(component(paymentId, paymentDescription, paymentAmount));
  const name = getByText(paymentDescription);
  const title = getByText(paymentAmount);
  const deleteButton = getByText(deleteButtonText);  
  expect(name).toBeInTheDocument();
  expect(title).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});
