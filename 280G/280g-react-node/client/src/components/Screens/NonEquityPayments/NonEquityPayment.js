import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { deletePayment, editPayment } from '../../../api/nonEquityPayments';
import { nonEquityPaymentsState } from '../../../recoil/nonEquityPayments';
import { isCompleted } from '../../../utilities/isCompleted';

import Description from './Description/Description';
import Amount from './Amount/Amount';

const NonEquityPayment = ({ paymentId, add, handleCreate }) => {

  const [ payment, setPayment ] = useRecoilState(nonEquityPaymentsState(paymentId));
  const [ completed, setCompleted ] = useState({ });

  const amountHandlers = {
    edit: () => setCompleted({ ...completed, amount: false }),
    change: (e) => setPayment({ ...payment, amount: e.target.value }),
    submit: async () => {
      if (!add) await editPayment(payment);
      setCompleted({ ...completed, amount: true });
    },
    deletePayment: async () => {
      await deletePayment(paymentId);
      setPayment({ });
    }
  };

  const descriptionHandlers = {
    edit: () => setCompleted({ ...completed, description: false }),
    change: (e) => setPayment({ ...payment, description: e.target.value }),
    submit: async () => {
      if (!add) await editPayment(payment);
      setCompleted({ ...completed, description: true });
    }
  };

  useEffect(() => {
    const createPayment = async () => await handleCreate(payment);
    if (add & isCompleted(completed)) createPayment();
  }, [add, completed, payment, handleCreate])

  useEffect(() => (add) ? setCompleted({ description: false, amount: false }) : setCompleted({ description: true, amount: true }), [add, setCompleted]);

  return (
    <>
      <Description description={ payment.description } completed={ completed.description } handlers={ descriptionHandlers }/>
      <Amount amount={ payment.amount } completed={ completed.amount } handlers={ amountHandlers }/>
    </>
  )


};

export default NonEquityPayment;