import React, { useState } from 'react';

import FirstYearPaymentsIdentifier from './FirstYearPaymentsIdentifier';
import FirstYearPaymentsForm from './FirstYearPaymentsForm';

const FirstYearPayments = ({ startDate, handleDateChange }) => {

  const [ payments, setPayments ] = useState(0);
  const [ completed, setCompleted ] = useState(false);

  const handleEdit = () => {
    setCompleted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstYearPayments = Number(payments);
    if (firstYearPayments) {
      //setTransactionPrice(dealPrice);
      // setError(false);
      setCompleted(true); 
    } else {
      // setError(true);
    }
  };

  const handleChange = (e) => setPayments(e.target.value);

  return (
    <>
      { completed
      ? <FirstYearPaymentsIdentifier payments={ payments } handleEdit={ handleEdit }/>
      : <FirstYearPaymentsForm payments={ payments } handleSubmit={ handleSubmit } handleChange={ handleChange } />
      } 
    </>
  );

};

export default FirstYearPayments;