import React from 'react';

const CompanyNameForm = ({ companyName, handleSubmit, handleChange}) => (
  <form onSubmit={ handleSubmit }>
    <label>Company Name: </label>
    <input value={ companyName } onChange={ handleChange }></input>
  </form>
);

export default CompanyNameForm;