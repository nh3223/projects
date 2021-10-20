import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render, waitFor } from '@testing-library/react'
import { RecoilRoot } from 'recoil';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import NonEquityPayments from './NonEquityPayments';
import { useSetNonEquityPaymentTestData } from '../../../../tests/hooks/useSetNonEquityPaymentTestData';
import { useSetNonEquityPaymentIds } from '../../../../tests/hooks/useSetNonEquityPaymentIds';

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

  return (loadingIds || loading0 || loading1) ? null : <NonEquityPayments />

};

const component = (executiveId, paymentIds, paymentDescriptions, paymentAmounts) => {
  
  const history = createMemoryHistory();

  return (
    <RecoilRoot>
      <Router history={ history }>
        <InitializeState executiveId={ executiveId } paymentIds={ paymentIds } paymentDescriptions={ paymentDescriptions } paymentAmounts={ paymentAmounts } />
      </Router>
    </RecoilRoot>
  );

};

const companyId = 12;
const executiveId = 10;
const paymentIds = [ 1, 2 ];
const paymentDescriptions = ['Signing Bonus', 'Transaction Bonus'];
const paymentAmounts = [ 100, 200];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ companyId, executiveId })
}));

jest.mock('../../../../hooks/useLoadCompany', () => ({
  useLoadCompany: () => ({ loading: false, error: null })
}));

jest.mock('../../../../hooks/useLoadExecutives', () => ({
  useLoadExecutives: () => ({ loading: false, error: null })
}));

jest.mock('../../../../hooks/useLoadNonEquityPayments', () => ({
  useLoadNonEquityPayments: () => ({ loading: false, error: null })
}));

jest.mock('../../../../hooks/useLoadNonEquityPayment', () => ({
  useLoadNonEquityPayment: () => ({ loading: false, error: null })
}));

jest.mock('../../../../api/nonEquityPayment/createPayment', () => ({
  createPayment: () => ({ _id: 3 })
}));

jest.mock('../../../../api/nonEquityPayment/deletePayment', () => ({
  deletePayment: () => ({ })
}));

test('should show two payments', () => {
  const { getByText } = render(component(executiveId, paymentIds, paymentDescriptions, paymentAmounts));
  const bonus0 = getByText(paymentAmounts[0], { exact: false });
  const bonus1 = getByText(paymentAmounts[1], { exact: false });
  expect(bonus0).toBeInTheDocument();
  expect(bonus1).toBeInTheDocument();
});

test('should show Add Button and add a third payment', async () => {
  
  const { getByText, getAllByRole } = render(component(executiveId, paymentIds, paymentDescriptions, paymentAmounts));
  const addButton = getByText('Add', { exact: false });
  expect(addButton).toBeInTheDocument();
  userEvent.click(addButton);
  const forms = await waitFor(() => getAllByRole('textbox'));
  expect(forms.length).toBe(2);
});

test('should remove the first payment', async () => {
  const { getByRole, queryByText, getByText } = render(component(executiveId, paymentIds, paymentDescriptions, paymentAmounts));
  const deleteButton = getByRole('button', { name: `Delete Payment ${paymentIds[0]}` });
  expect(deleteButton).toBeInTheDocument();
  userEvent.click(deleteButton);
  const deletedDescription = await waitFor(() => queryByText(paymentDescriptions[0]));
  const remainingDescription = await waitFor(() => getByText(paymentDescriptions[1]));
  expect(deletedDescription).not.toBeInTheDocument();
  expect(remainingDescription).toBeInTheDocument();
});
