import React from 'react';
import { formatISO } from 'date-fns';

import DateForm from '../../../Elements/DateForm/DateForm';

const TransactionDateForm = ({ transactionDate, handleChange, handleSubmit }) => {

  const processChange = (date) => handleChange('transactionDate', formatISO(date));

  return <DateForm name="transactionDate" date={ transactionDate } handleChange={ processChange } handleSubmit={ handleSubmit } />;

};

export default TransactionDateForm;