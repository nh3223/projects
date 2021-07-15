import React from 'react';

const AmountForm = ({ amount, handleChange, handleSubmit, error }) => (
  <form onSubmit={ handleSubmit }>
    <input value={ amount } placeholder="Amount" onChange={ handleChange }></input>
    { (error) && <p>Please enter a valid payment amount</p> }
  </form>
);

export default AmountForm;