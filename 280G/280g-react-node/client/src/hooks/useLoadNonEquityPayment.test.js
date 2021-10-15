import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import { RecoilRoot, useRecoilValue } from 'recoil';

import { useSetNonEquityPaymentTestData } from '../tests/hooks/useSetNonEquityPaymentTestData';
import * as fetchPayment from '../api/nonEquityPayment/fetchPayment';

import { useLoadNonEquityPayment } from './useLoadNonEquityPayment';
import { nonEquityPaymentAmountState, nonEquityPaymentDescriptionState } from '../recoil/nonEquityPayment';

const UseLoadNonEquityPaymentTest = ({ paymentId }) => {

  const { status } = useLoadNonEquityPayment(paymentId);

  const paymentDescription = useRecoilValue(nonEquityPaymentDescriptionState(paymentId));
  const paymentAmount = useRecoilValue(nonEquityPaymentAmountState(paymentId));
 
  if (status === 'loading') return <p>Loading</p>;

  return (
    <>
      <p>{ paymentDescription }</p>
      <p>{ paymentAmount }</p>
    </>
  );

};

const InitializeState = ({ paymentData }) => {
  const { paymentId, paymentDescription, paymentAmount } = paymentData;
  const loading = useSetNonEquityPaymentTestData({ paymentId, paymentDescription, paymentAmount });
  return (loading) ? null : <UseLoadNonEquityPaymentTest paymentId={ paymentId } />
};

const Component = ({ paymentData }) => (
  <RecoilRoot>
    <InitializeState paymentData={ paymentData } />
  </RecoilRoot>
);

test('should show payment information if already loaded', async () => {

  const paymentId = 1;
  const paymentDescription = 'Test Payment';
  const paymentAmount = 100;
  
  const paymentData = { paymentId, paymentDescription, paymentAmount };
   
  const { getByText } = render(<Component paymentData = { paymentData } />);
  
  await waitFor(() => {
    const description = getByText('Test Payment');
    const amount = getByText('100');
    expect(description).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
  });

});

test('should load company information if not yet loaded', async () => {
  
  const paymentId = 1;
  const paymentDescription = '';
  const paymentAmount = '';
  
  const paymentData = { paymentId, paymentDescription, paymentAmount }

  jest.spyOn(fetchPayment, 'fetchPayment').mockImplementation(() => Promise.resolve({
      description: 'Test Payment',
      amount: 100
  }));
  
  const { getByText } = render(<Component paymentData = { paymentData } />);
  await waitFor(() => {
    const description = getByText('Test Payment');
    const amount = getByText('100');
    expect(description).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
  });

});
