import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { deletePayment, editPayment } from '../../../api/nonEquityPayments';
import { nonEquityPaymentsState } from '../../../recoil/nonEquityPayments';
import { allTrue } from '../../../utilities/checkObject';

import PaymentDescription from './PaymentDescription/PaymentDescription';
import PaymentAmount from './PaymentAmount/PaymentAmount';

const NonEquityPayment = ({ paymentId, removePaymentId }) => {

  const [ payment, setPayment ] = useRecoilState(nonEquityPaymentsState(paymentId));
  const [ completed, setCompleted ] = useState((payment.new) ? {description: false, amount: false} : {description: true, amount: true});

  const handlers = {
    change: ({ target: { name, value }}) => setPayment({ ...payment, [name]: value }),
    edit: ({ target: { name }}) => setCompleted({ ...completed, [name]: false }),
    submit: async ({ target: { name }}) => {
      await editPayment(payment);
      setCompleted({ ...completed, [name]: true });
    },
    deletePayment: async () => {
      await deletePayment(paymentId);
      setPayment({ });
      removePaymentId(paymentId);
    }    
  };

  useEffect(() => {

    if (payment.new && allTrue(completed)) setPayment({ ...payment, new: false }); 
  
  }, [payment, completed, setPayment])

  return (
    <>
      <PaymentDescription description={ payment.description } completed={ completed.description } handlers={ handlers }/>
      <PaymentAmount amount={ payment.amount } completed={ completed.amount } handlers={ handlers }/>
    </>
  )


};

export default NonEquityPayment;