import React, { useState } from 'react';

import InputForm from '../../../Elements/InputForm/InputForm';
import ErrorMessage from '../../../Elements/ErrorMessage/ErrorMessage';

const PaymentAmountForm = ({ amount, handleChange, handleSubmit }) => {

  const [ error, setError ] = useState(false);

  const validate = (e) => {
    console.log('amount', amount); 
    if (Number(amount) && Number(amount) >= 0) {
      console.log('amount valid');
      handleSubmit(e);
      setError(false);
    } else {
      console.log('amount not valid');
      setError(true);
    }
  };

  console.log('error', error);

  return (
    <>
      <InputForm name="amount" value={ amount } handleChange={ handleChange} handleSubmit={ validate } />
      { (error) && <ErrorMessage text="Please enter a valid payment amount" /> }
    </>
  );

};

export default PaymentAmountForm;