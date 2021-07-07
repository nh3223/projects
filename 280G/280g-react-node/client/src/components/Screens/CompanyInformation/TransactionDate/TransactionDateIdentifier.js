import React from 'react';
import { format } from 'date-fns';

const TransactionDateIdentifier = ({ transactionDate, handleEdit }) => {

  const date = format(transactionDate, 'd MMM yyyy');
  
  return (
    <>
      <h2>Transaction Date: { date }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default TransactionDateIdentifier;