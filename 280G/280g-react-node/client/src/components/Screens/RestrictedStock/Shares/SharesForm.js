import React from 'react';

const SharesForm = ({ numberShares, handleSubmit, handleChange, error }) => (
  <form onSubmit={ handleSubmit }>
    <input value={ numberShares } onChange={ handleChange }></input>
    { (error) && <p>Please enter a valid number of shares</p> }
  </form>
);

export default SharesForm;