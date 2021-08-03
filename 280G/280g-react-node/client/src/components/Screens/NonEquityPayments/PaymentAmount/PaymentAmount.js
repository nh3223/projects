import React, { useState } from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DeleteButton from '../../../Elements/DeleteButton/DeleteButton';
import InputForm from '../../../Elements/InputForm/InputForm';

const PaymentAmount = ({ amount, completed, handlers: { edit, change, submit, deletePayment }}) => {
  
  const [ errorMessage, setErrorMessage ] = useState(null);

  const validate = (e) => {
    if (Number(amount) && Number(amount) >= 0) {
      submit(e);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid payment amount');
    }
  };
  
  return (
    <>
      <Description text="Payment Amount: " />
      { completed
        ? <>
            <Identifier name="paymentAmount" text={ amount } handleEdit={ edit } />
            <DeleteButton name="deletePayment" text="DeletePayment" handleDelete={ deletePayment } />
          </>
        : <InputForm name="paymentAmount" value={ amount } handleChange={ change } handleSubmit={ validate } errorMessage={ errorMessage }/>
      }
    </>
  );

};

export default PaymentAmount;