import React from 'react';

const FirstYearPaymentsIdentifier = ({ firstYearPayments, handleEdit }) => (
  <>
    <h2>Non-Recurring Payments in Start Year of Employment: { `$${firstYearPayments}` }</h2>
    <button onClick={ handleEdit }>Edit</button>
  </>
);

export default FirstYearPaymentsIdentifier;