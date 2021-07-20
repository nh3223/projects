import React from 'react';
import { parseISO } from 'date-fns';

import Description from '../../../Elements/Description/Description';
import TransactionDateIdentifier from './TransactionDateIdentifier';
import TransactionDateForm from './TransactionDateForm';

const TransactionDate = ({ transactionDate, completed, handlers: { edit, change }}) => {
  
  const date = parseISO(transactionDate);

  return (
    <>
      <Description text={ 'Transaction Date: ' } />
      { (completed)
      ? <TransactionDateIdentifier transactionDate={ date } handleEdit={ edit }/>
      : <TransactionDateForm transactionDate={ date } handleChange={ change } />
      } 
    </>
  );

};

export default TransactionDate;