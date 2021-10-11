import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil';

import NonEquityPaymentSummary from './NonEquityPaymentSummary';
import { useSetNonEquityPaymentIds } from '../../../../tests/hooks/useSetNonEquityPaymentIds';
import { useSetNonEquityPaymentTestData } from '../../../../tests/hooks/useSetNonEquityPaymentTestData';

const InitializeState = ({ executiveId, paymentIds, paymentDescriptions, paymentAmounts }) => {

  const loadingIds = useSetNonEquityPaymentIds({ executiveId, paymentIds });

  const loading0 = useSetNonEquityPaymentTestData({
    paymentId: paymentIds[0],
    paymentDescription: paymentDescriptions[0],
    paymentAmount: paymentAmounts[0]
  });

  const loading1 = useSetNonEquityPaymentTestData({
    paymentId: paymentIds[1],
    paymentDescription: paymentDescriptions[1],
    paymentAmount: paymentAmounts[1]
  });

  return (loadingIds || loading0 || loading1 ) ? null : <NonEquityPaymentSummary executiveId={ executiveId } />;

};

const component = (executiveId, paymentIds, paymentDescriptions, paymentAmounts) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } paymentIds={ paymentIds } paymentDescriptions={ paymentDescriptions } paymentAmounts={ paymentAmounts } />
  </RecoilRoot>
);

const executiveId = 3;
const paymentIds = [ 10, 20 ];
const paymentDescriptions = [ 'Bonus1', 'Bonus2' ];
const paymentAmounts = [ 100, 200 ];

jest.mock('../../../../hooks/useLoadNonEquityPayment', () => ({
  useLoadNonEquityPayment: () => ({ loading: false, error: null }) 
}));

jest.mock('../../../../hooks/useLoadNonEquityPayments', () => ({
  useLoadNonEquityPayments: () => ({ loading: false, error: null })
 }));

test('should display non equity payments', () => {

  const { getByText } = render(component(executiveId, paymentIds, paymentDescriptions, paymentAmounts));

  const title = getByText('Non Equity Payments');
  const bonus1 = getByText(`${paymentDescriptions[0]}: $${paymentAmounts[0]}`);
  const bonus2 = getByText(`${paymentDescriptions[1]}: $${paymentAmounts[1]}`);
  
  expect(title).toBeInTheDocument();
  expect(bonus1).toBeInTheDocument();
  expect( bonus2).toBeInTheDocument();

});
