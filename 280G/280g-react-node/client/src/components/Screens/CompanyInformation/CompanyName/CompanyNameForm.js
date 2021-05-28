import React from 'react';

const CompanyNameForm = ({ name, handleSubmit, handleChange}) => (
  <form onSubmit={ handleSubmit }>
    <label>Company Name: </label>
    <input value={ name } onChange={ handleChange }></input>
  </form>
);

export default CompanyNameForm;