import React, { useState } from 'react';

import TransactionDateIdentifier from './TransactionDateIdentifier';
import TransactionDateForm from './TransactionDateForm';

const TransactionDate = () => {

  const [ date, setDate ] = useState(new Date());
  const [ completed, setCompleted ] = useState(false);

  const handleEdit = () => {
    setCompleted(false);
  };

  const handleChange = (date) => {
    setDate(date);
    setCompleted(true);
  };

  return (
    <>
      { completed
      ? <TransactionDateIdentifier date={ date } handleEdit={ handleEdit }/>
      : <TransactionDateForm date={ date } handleChange={ handleChange } />
      } 
    </>
  );

};

export default TransactionDate;