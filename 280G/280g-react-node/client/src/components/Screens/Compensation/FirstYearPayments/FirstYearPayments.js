import React, { useState } from 'react';

import FirstYearPaymentsIdentifier from './FirstYearPaymentsIdentifier';
import FirstYearPaymentsForm from './FirstYearPaymentsForm';

const FirstYearPayments = ({ firstYearPayments, completed, handlers: { change, edit, submit }}) => {

  const [ error, setError ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payments = Number(firstYearPayments);
    if (payments) {
      await submit();
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <>
      { completed
      ? <FirstYearPaymentsIdentifier firstYearPayments={ firstYearPayments } handleEdit={ edit }/>
      : <FirstYearPaymentsForm firstYearPayments={ firstYearPayments } handleSubmit={ handleSubmit } handleChange={ change } error={ error } />
      } 
    </>
  );

};

export default FirstYearPayments;