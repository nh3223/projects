import React from 'react';

import Description from '../../../Elements/Description/Description';
import PaymentAmountForm from './PaymentAmountForm';
import PaymentAmountIdentifier from './PaymentAmountIdentifier';

const PaymentAmount = ({ amount, completed, handlers: { edit, change, submit, deletePayment }}) => (
  <>
    <Description text="Payment Amount: " />
    { completed
      ? <PaymentAmountIdentifier amount={ amount } handleEdit={ edit } handleDelete={ deletePayment }/>
      : <PaymentAmountForm amount={ amount } handleChange={ change } handleSubmit={ submit } />
    }
  </>
);

export default PaymentAmount;