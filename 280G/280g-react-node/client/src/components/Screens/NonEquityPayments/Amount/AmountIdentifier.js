import React from 'react';

const AmountIdentifier = ({ amount, handleEdit, handleDelete }) => (
  <>
    <p>{ `$${amount}` }</p>
    <button onClick={ handleEdit }>Edit</button>
    <button onClick={ handleDelete }>Delete Payment</button>
  </>
);

export default AmountIdentifier;

