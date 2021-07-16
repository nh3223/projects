import React from 'react';
import { parseISO } from 'date-fns';

import TransactionDateIdentifier from './TransactionDateIdentifier';
import TransactionDateForm from './TransactionDateForm';

const TransactionDate = ({ transactionDate, completed, handlers: { edit, change }}) => {
  
  const date = parseISO(transactionDate);

  return (
    <>
      { (completed)
      ? <TransactionDateIdentifier transactionDate={ date } handleEdit={ edit }/>
      : <TransactionDateForm transactionDate={ date } handleChange={ change } />
      } 
    </>
  );

};

export default TransactionDate;