import React from 'react';

const NonEquityPaymentsIdentifier = ({ payment, handleEdit, handleDelete }) => (
  <>
    <h3>{ payment.description }</h3>
    <h4>{ payment.amount }</h4>
    <button name={ payment._id } onClick={ handleEdit }>Edit</button>
    <button name={ payment._id } onClick={ handleDelete }>Delete</button>
  </>
);

export default NonEquityPaymentsIdentifier;