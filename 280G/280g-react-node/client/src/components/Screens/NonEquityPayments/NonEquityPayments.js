import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilCallback, useRecoilState } from 'recoil';

import { createPayment } from '../../../api/nonEquityPayments';
import { nonEquityPaymentIdsState, nonEquityPaymentsState } from '../../../recoil/nonEquityPayments';

import ExecutiveHeader from '../../Navigation/ExecutiveHeader';
import LoadNonEquityPayments from '../../Loaders/LoadNonEquityPayments';
import SubTitle from '../../Elements/SubTitle/SubTitle';
import AddButton from '../../Elements/AddButton/AddButton';
import NonEquityPayment from './NonEquityPayment';

const NonEquityPayments = () => {

  const { executiveId } = useParams();

  const [ paymentIds, setPaymentIds ] = useRecoilState(nonEquityPaymentIdsState(executiveId));

  const setPayment = useRecoilCallback(({ set }) => (payment) => set(nonEquityPaymentsState(payment._id), payment), []);

  const handleAdd = async () => { 
    const payment = {
      executive: executiveId,
      description: '',
      amount: ''
    }
    const newPayment = await createPayment(payment);
    setPayment({ ...newPayment, new: true });
    setPaymentIds([ newPayment._id, ...paymentIds ]);
  };  
 
  const removePaymentId = (paymentId) => setPaymentIds(paymentIds.filter((id) => id !== paymentId));
  
  return (
    <>
      <ExecutiveHeader executiveId={ executiveId }/>
      <LoadNonEquityPayments executiveId={ executiveId } />
      <SubTitle text="Non-Equity Payments" />
      <AddButton name="addPayment" text="Add a Payment" handleAdd={ handleAdd } />
      { paymentIds.map((paymentId) => <NonEquityPayment key={ paymentId } paymentId= { paymentId } removePaymentId={ removePaymentId } />) }
    </>
  );
  
};

export default NonEquityPayments;