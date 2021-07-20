import React, { useState } from 'react';

import InputForm from '../../../Elements/InputForm/InputForm';
import ErrorMessage from '../../../Elements/ErrorMessage/ErrorMessage';

const TransactionPriceForm = ({ transactionPrice, handleSubmit, handleChange }) => {
  
  const [ error, setError ] = useState(false);

  const validate = ({ target: { name, value }}) => {
    if (Number(value)) {
      handleChange(name, value);
      setError(false);
    } else {
      setError(true)
    }  
  };

  return (
    <>
      <InputForm name="transactionPrice" value={ transactionPrice } handleChange={ validate } handleSubmit={ handleSubmit } />
      { (error) && <ErrorMessage message={ 'Please enter a valid per share price' } /> }
    </>
  );

};

export default TransactionPriceForm;