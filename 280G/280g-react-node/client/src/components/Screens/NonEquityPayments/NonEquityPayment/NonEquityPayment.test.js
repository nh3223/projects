import React, { useState, useEffect } from 'react';
import '@testing-library/jest-dom/extend-expect'
import {render} from '@testing-library/react'
import { RecoilRoot, useSetRecoilState } from 'recoil';

import { nonEquityPaymentDescriptionState, nonEquityPaymentAmountState } from '../../../../recoil/nonEquityPayment';

import NonEquityPayment from './NonEquityPayment';

const paymentDescription = 'Bonus';
const paymentAmount = 100;
const paymentId = 1;
const deleteButtonText = 'Delete Payment';

const InitializeState = ({ paymentId, description, amount }) => {
  
  const setDescription = useSetRecoilState(nonEquityPaymentDescriptionState(paymentId));
  const setAmount = useSetRecoilState(nonEquityPaymentAmountState(paymentId));
  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false)
  }, [loaded, setLoading])

  useEffect(() => {
    setDescription(description)
    setAmount(amount);
    setLoaded(true);
  }, [description, amount, setDescription, setAmount, setLoaded]);

  return loading ? null : <NonEquityPayment paymentId={ paymentId } />

};

const component = (paymentId, description, amount) => (
  <RecoilRoot>
    <InitializeState payumentId={ paymentId } description={ description } amount={ amount } />
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
