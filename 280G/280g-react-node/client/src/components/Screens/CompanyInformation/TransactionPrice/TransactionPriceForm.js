import React from 'react';

const TransactionPriceForm = ({ transactionPrice, handleSubmit, handleChange, error }) => (
  <form onSubmit={ handleSubmit }>
    <label>Transaction Price Per Share: </label>
    <input value={ transactionPrice } onChange={ handleChange }></input>
    { (error) && <p>Please enter a valid per share price</p> }
  </form>
);

export default TransactionPriceForm;