import React from 'react';
import { format } from 'date-fns';

const TransactionDateIdentifier = ({ date, handleEdit }) => {
  
  console.log(date);
  
  const transactionDate = format(date, 'd MMM yyyy');
  
  return (
    <>
      <h2>Transaction Date: { transactionDate }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default TransactionDateIdentifier;