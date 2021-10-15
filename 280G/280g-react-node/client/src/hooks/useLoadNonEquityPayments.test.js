import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import { RecoilRoot, useRecoilValue } from 'recoil';

import { nonEquityPaymentIdsState } from '../recoil/nonEquityPayment';
import { useSetNonEquityPaymentIds} from '../tests/hooks/useSetNonEquityPaymentIds';
import * as fetchPayments from '../api/nonEquityPayment/fetchPayments';

import { useLoadNonEquityPayments } from './useLoadNonEquityPayments';

const UseLoadNonEquityPaymentsTest = ({ executiveId }) => {

  const { status } = useLoadNonEquityPayments(executiveId);

  const paymentIds = useRecoilValue(nonEquityPaymentIdsState(executiveId));

  if (status === 'loading') return <p>Loading</p>;

    return (
      <>
        { paymentIds.map((paymentId) => <p key={ paymentId }>{ paymentId }</p>) }
      </>
    );

};

const InitializeState = ({ executiveId, paymentIds }) => {
  const loading = useSetNonEquityPaymentIds({ executiveId, paymentIds });
  return (loading) ? null : <UseLoadNonEquityPaymentsTest executiveId={ executiveId } />
};

const Component = ({ executiveId, paymentIds }) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } paymentIds={ paymentIds } />
  </RecoilRoot>
);

test('should show payment Ids if already loaded', async () => {

  const executiveId = 1;
  const paymentIds = [ '101' , '102' ]

  const { getByText } = render(<Component executiveId={ executiveId } paymentIds = { paymentIds } />);
  
  await waitFor(() => {
    const payment1 = getByText('101');
    const payment2 = getByText('102');
    expect(payment1).toBeInTheDocument();
    expect(payment2).toBeInTheDocument();
  });

});

test('should load paymentIds if not yet loaded', async () => {
  
  jest.spyOn(fetchPayments, 'fetchPayments').mockImplementation(() => Promise.resolve([
    { _id: '101' },
    { _id: '102' }
  ]));
  
  const executiveId = 1;
  const paymentIds = [ ]

  const { getByText } = render(<Component executiveId={ executiveId } paymentIds = { paymentIds } />);
  
  await waitFor(() => {
    const payment1 = getByText('101');
    const payment2 = getByText('102');
    expect(payment1).toBeInTheDocument();
    expect(payment2).toBeInTheDocument();
  });

});