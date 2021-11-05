import React from 'react';

import { useLoadNonEquityPayment } from '../../../../hooks/useLoadNonEquityPayment'; 
import { deletePayment } from '../../../../api/nonEquityPayment/deletePayment';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import PaymentDescription from '../PaymentDescription/PaymentDescription';
import PaymentAmount from '../PaymentAmount/PaymentAmount';
import Loading from '../../Loading/Loading';

const NonEquityPayment = ({ paymentId, removePaymentId }) => {

  const { loading, error } = useLoadNonEquityPayment(paymentId);

  const handleDelete = async () => {
    await deletePayment(paymentId);
    removePaymentId(paymentId);
  };

  if (loading) return <Loading component="Non Equity Payment" error={ error } />

  return (
    <SingleLineLayout>
      <PaymentDescription paymentId={ paymentId } size={ 3 }/>
      <PaymentAmount paymentId={ paymentId } size={ 4 } handleDelete={ handleDelete } />
    </SingleLineLayout>
  );

};

export default NonEquityPayment;