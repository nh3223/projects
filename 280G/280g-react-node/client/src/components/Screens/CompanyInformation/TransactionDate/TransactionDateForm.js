import React from 'react';
import { formatISO } from 'date-fns';

import DateForm from '../../../Elements/DateForm/DateForm';

const TransactionDateForm = ({ transactionDate, handleChange }) => {

  const validate = (date) => handleChange('transactionDate', formatISO(date));

  return <DateForm selected={ transactionDate } handleChange={ validate } />;

};

export default TransactionDateForm;