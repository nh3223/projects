import React, { useState } from 'react';

import TransactionPriceIdentifier from './TransactionPriceIdentifier';
import TransactionPriceForm from './TransactionPriceForm';

const TransactionPrice = ({ transactionPrice, completed, handlers: { change, edit, submit }}) => {

  const [ error, setError ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(transactionPrice)) {
      submit();
      setError(false);
    } else {
      setError(true)
    }  
  };

  return (
    <>
      { (completed)
      ? <TransactionPriceIdentifier transactionPrice={ transactionPrice } handleEdit={ edit }/>
      : <TransactionPriceForm transactionPrice={ transactionPrice } handleSubmit={ handleSubmit } handleChange={ change } error={ error } />
      } 
    </>
  );

};

export default TransactionPrice;