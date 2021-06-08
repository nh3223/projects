import React from 'react';

const FirstYearPaymentsForm = ({ payments, handleSubmit, handleChange, error }) => (
  <form onSubmit={ handleSubmit }>
    <label>Non-Recurring Payments in Start Year of Employment: </label>
    <input value={ payments } onChange={ handleChange }></input>    
    { (error) && <p>Please enter a valid payment amount</p> }
  </form>
);

export default FirstYearPaymentsForm;