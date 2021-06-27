import React, { useState } from 'react';

import FirstYearPaymentsIdentifier from './FirstYearPaymentsIdentifier';
import FirstYearPaymentsForm from './FirstYearPaymentsForm';

const FirstYearPayments = ({ executive, handleSubmit }) => {

  const [ payments, setPayments ] = useState(executive.firstYearPayments || '');
  const [ completed, setCompleted ] = useState((payments) ? true : false);
  const [ error, setError ] = useState(false);

  const handleEdit = () => setCompleted(false);

  const handleSubmitPayments = async (e) => {
    e.preventDefault();
    const firstYearPayments = Number(payments);
    if (firstYearPayments) {
      const editedExecutive = { ...executive, firstYearPayments };
      await handleSubmit(editedExecutive);
      setError(false);
      setCompleted(true); 
    } else {
      setError(true);
    }
  };

  const handleChange = (e) => setPayments(e.target.value);

  return (
    <>
      { completed
      ? <FirstYearPaymentsIdentifier payments={ payments } handleEdit={ handleEdit }/>
      : <FirstYearPaymentsForm payments={ payments } handleSubmit={ handleSubmitPayments } handleChange={ handleChange } error={ error } />
      } 
    </>
  );

};

export default FirstYearPayments;