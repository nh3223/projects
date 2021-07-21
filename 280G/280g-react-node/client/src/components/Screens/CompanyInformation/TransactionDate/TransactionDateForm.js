import React from 'react';
import { formatISO } from 'date-fns';

import DateForm from '../../../Elements/DateForm/DateForm';

const TransactionDateForm = ({ transactionDate, handleChange }) => {

  const processChange = (date) => handleChange('transactionDate', formatISO(date));

  return <DateForm date={ transactionDate } handleChange={ processChange } />;

};

export default TransactionDateForm;