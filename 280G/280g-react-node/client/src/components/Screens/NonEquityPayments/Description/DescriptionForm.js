import React from 'react';

const DescriptionForm = ({ description, handleChange, handleSubmit, error }) => (
  <form onSubmit={ handleSubmit }>
    <input value={ description } placeholder="Payment Description" onChange={ handleChange }></input>
    { (error) && <p>Please enter a description of the payment</p> }
  </form>
);

export default DescriptionForm;
