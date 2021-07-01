import React from 'react';

import TransactionDateIdentifier from './TransactionDateIdentifier';
import TransactionDateForm from './TransactionDateForm';

const TransactionDate = ({ transactionDate, completed, handlers: { edit, change }}) => (
  <>
    { (completed)
    ? <TransactionDateIdentifier transactionDate={ transactionDate } handleEdit={ edit }/>
    : <TransactionDateForm transactionDate={ transactionDate } handleChange={ change } />
    } 
  </>
);

export default TransactionDate;