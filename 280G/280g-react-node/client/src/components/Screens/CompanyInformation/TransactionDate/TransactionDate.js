import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import TransactionDateIdentifier from './TransactionDateIdentifier';
import TransactionDateForm from './TransactionDateForm';
import { transactionDateState } from '../../../../recoil/atoms/CompanyInformation';

const TransactionDate = () => {

  const [ transactionDate, setTransactionDate ] = useRecoilState(transactionDateState);
  const [ completed, setCompleted ] = useState(false);

  const handleEdit = () => {
    setCompleted(false);
  };

  const handleChange = (date) => {
    setTransactionDate(date);
    setCompleted(true);
  };

  return (
    <>
      { completed
      ? <TransactionDateIdentifier date={ transactionDate } handleEdit={ handleEdit }/>
      : <TransactionDateForm date={ transactionDate } handleChange={ handleChange } />
      } 
    </>
  );

};

export default TransactionDate;