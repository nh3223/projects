import React from 'react';

const NonEquityPaymentsForm = ({ payment, handleDescriptionChange, handleAmountChange, handleSubmit }) => (
  <form >
    <label>Payment: </label>
    <input name={ payment._id } value={ payment.description } placeholder="Description" onChange={ handleDescriptionChange }></input>
    <input name={ payment._id } value={ payment.amount } placeholder="Amount" onChange={ handleAmountChange }></input>
    { (payment.error) && <p>Please enter a valid amount</p> }
    <button name={ payment._id } onClick={ handleSubmit }>Submit</button>
  </form>
);

export default NonEquityPaymentsForm;