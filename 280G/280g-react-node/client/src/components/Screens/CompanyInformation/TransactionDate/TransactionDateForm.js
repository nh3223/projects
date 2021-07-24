import React from 'react';

import DateForm from '../../../Elements/DateForm/DateForm';

const TransactionDateForm = ({ transactionDate, handleChange, handleSubmit }) => (
  <DateForm name="transactionDate" date={ transactionDate } handleChange={ handleChange } handleSubmit={ handleSubmit } />
);

export default TransactionDateForm;