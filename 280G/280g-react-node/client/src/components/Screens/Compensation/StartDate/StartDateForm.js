import React from 'react';
import { formatISO } from 'date-fns';

import DateForm from '../../../Elements/DateForm/DateForm';

const StartDateForm = ({ startDate, handleChange, handleSubmit }) => {
  
  const processChange = (date) => handleChange('transactionDate', formatISO(date));

  return <DateForm name="startDate" date={ startDate } handleChange={ processChange } handleSubmit={ handleSubmit } />;

};

export default StartDateForm;