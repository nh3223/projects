import React, { useEffect, useState } from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import NonEquityPaymentSummary from './NonEquityPaymentSummary';
import { nonEquityPaymentIdsState, nonEquityPaymentDescriptionState, nonEquityPaymentAmountState } from '../../../../recoil/nonEquityPayment';
import { useLoadNonEquityPayment } from '../../../../hooks/useLoadNonEquityPayment';
import { useLoadNonEquityPayments } from '../../../../hooks/useLoadNonEquityPayments';

const InitializeState = ({ executiveId, paymentIds, paymentDescriptions, paymentAmounts }) => {
  
  const setPaymentIds = useSetRecoilState(nonEquityPaymentIdsState(executiveId));
  const setDescription1 = useSetRecoilState(nonEquityPaymentDescriptionState(paymentIds[0]));
  const setDescription2 = useSetRecoilState(nonEquityPaymentDescriptionState(paymentIds[1]));
  const setAmount1 = useSetRecoilState(nonEquityPaymentAmountState(paymentIds[0]));
  const setAmount2 = useSetRecoilState(nonEquityPaymentAmountState(paymentIds[1]));

  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setPaymentIds(paymentIds);
    setDescription1(paymentDescriptions[0]);
    setDescription2(paymentDescriptions[1]);
    setAmount1(paymentAmounts[0]);
    setAmount2(paymentAmounts[1]);
    setLoaded(true);
  }, [ paymentIds, paymentDescriptions, paymentAmounts, setPaymentIds, setDescription1, setDescription2, setAmount1, setAmount2, setLoaded]);
  
  return loading? null : <NonEquityPaymentSummary executiveId={ executiveId } />;

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

jest.mock('../../../../hooks/useLoadNonEquityPayment', () => ({ useLoadNonEquityPayment: jest.fn() }));
jest.mock('../../../../hooks/useLoadNonEquityPayments', () => ({ useLoadNonEquityPayments: jest.fn() }));

test('should display non equity payments', () => {

  useLoadNonEquityPayment.mockImplementation(() => ({ loading: false, error: null }));
  useLoadNonEquityPayments.mockImplementation(() => ({ loading: false, error: null }));

  const { getByText } = render(component(executiveId, paymentIds, paymentDescriptions, paymentAmounts));

  const title = getByText('Non Equity Payments');
  const bonus1 = getByText(`${paymentDescriptions[0]}: $${paymentAmounts[0]}`);
  const bonus2 = getByText(`${paymentDescriptions[1]}: $${paymentAmounts[1]}`);
  
  expect(title).toBeInTheDocument();
  expect(bonus1).toBeInTheDocument();
  expect( bonus2).toBeInTheDocument();

});
