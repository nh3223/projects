import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { deletePayment, editPayment } from '../../../api/nonEquityPayments';
import { nonEquityPaymentsState } from '../../../recoil/nonEquityPayments';
import { isCompleted } from '../../../utilities/isCompleted';

import Description from './Description/Description';
import Amount from './Amount/Amount';

const NonEquityPayment = ({ paymentId, add, handleCreate }) => {

  const [ payment, setPayment ] = useRecoilState(nonEquityPaymentsState(paymentId));
  const [ newPayment, setNewPayment ] = useState({ description: '', amount: '' });
  const [ completed, setCompleted ] = useState({ });

  const amountHandlers = {
    edit: () => setCompleted({ ...completed, amount: false }),
    change: (e) => (add) ? setNewPayment({ ...newPayment, amount: e.target.value }) : setPayment({ ...payment, amount: e.target.value }),
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
    change: (e) => (add) ? setNewPayment({ ...newPayment, description: e.target.value }) : setPayment({ ...payment, description: e.target.value }),
    submit: async () => {
      if (!add) await editPayment(payment);
      setCompleted({ ...completed, description: true });
    }
  };

  useEffect(() => {
    const createPayment = async () => await handleCreate(newPayment);
    if (add & isCompleted(completed)) createPayment();
  }, [add, completed, newPayment, handleCreate])

  useEffect(() => (add) ? setCompleted({ description: false, amount: false }) : setCompleted({ description: true, amount: true }), [add, setCompleted]);

  return (
    <>
      <Description description={ (add) ? newPayment.description : payment.description } completed={ completed.description } handlers={ descriptionHandlers }/>
      <Amount amount={ (add) ? newPayment.description : payment.amount } completed={ completed.amount } handlers={ amountHandlers }/>
    </>
  )


};

export default NonEquityPayment;