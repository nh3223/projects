import React, { useState } from 'react';

import App from '../../App';
import { TransactionContext } from '../Context';

const TransactionProvider = () => {
  
  const [ transactionPrice, setTransactionPrice ] = useState('');
  const [ transactionDate, setTransactionDate ] = useState(new Date());
  
  const contextVariables = {
    transactionPrice, setTransactionPrice,
    transactionDate, setTransactionDate,
  }

  return (
    <TransactionContext.Provider value = {contextVariables}>
      <App />
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;