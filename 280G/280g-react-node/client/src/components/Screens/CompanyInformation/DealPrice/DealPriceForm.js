import React from 'react';

const DealPriceForm = ({ price, handleSubmit, handleChange, error }) => (
  <form onSubmit={ handleSubmit }>
    <label>Transaction Price Per Share: </label>
    <input value={ price } onChange={ handleChange }></input>
    { (error) && <p>Please enter a valid per share price</p> }
  </form>
);

export default DealPriceForm;