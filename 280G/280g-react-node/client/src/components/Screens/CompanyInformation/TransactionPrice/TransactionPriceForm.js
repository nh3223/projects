import React, { useState } from 'react';

import InputForm from '../../../Elements/InputForm/InputForm';
import ErrorMessage from '../../../Elements/ErrorMessage/ErrorMessage';

const TransactionPriceForm = ({ transactionPrice, handleSubmit, handleChange }) => {
  
  const [ error, setError ] = useState(false);

  const processChange = ({ target: { name, value }}) => handleChange(name, value);

  const validate = (e) => {
    if (Number(e.target[0].value) && Number(e.target[0].value > 0)) {
      handleSubmit(e);
      setError(false)
    } else {
      setError(true)
    }
  };

  return (
    <>
      <InputForm name="transactionPrice" value={ transactionPrice } handleChange={ processChange } handleSubmit={ validate } />
      { (error) && <ErrorMessage message={ 'Please enter a valid per share price' } /> }
    </>
  );

};

export default TransactionPriceForm;