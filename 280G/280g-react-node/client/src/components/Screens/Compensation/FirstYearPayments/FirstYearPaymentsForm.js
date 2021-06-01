import React from 'react';

const FirstYearPaymentsForm = ({ payments, handleSubmit, handleChange}) => (
  <form onSubmit={ handleSubmit }>
    <label>Non-Recurring Payments in Start Year of Employment: </label>
    <input value={ payments } onChange={ handleChange }></input>
  </form>
);

export default FirstYearPaymentsForm;