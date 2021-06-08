import React from 'react';

const FirstYearPaymentsIdentifier = ({ payments, handleEdit }) => {

  return (
    <>
      <h2>Non-Recurring Payments in Start Year of Employment: { `$${payments}` }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default FirstYearPaymentsIdentifier;