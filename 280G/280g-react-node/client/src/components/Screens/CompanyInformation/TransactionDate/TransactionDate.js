import React from 'react';

import { parse, formatDate } from '../../../../utilities/formatDate';


import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/DateForm/DateForm';

const TransactionDate = ({ transactionDate, completed, handlers: { edit, change, submit }}) => {
  
  const date = parse(transactionDate);

  return (
    <>
      <Description text={ 'Transaction Date: ' } />
      { (completed)
      ? <Identifier name="transactionDate" text={ formatDate(date) } handleEdit={ edit }/>
      : <DateForm name="transactionDate" date={ transactionDate } handleChange={ change } handleSubmit={ submit } />
      } 
    </>
  );

};

export default TransactionDate;