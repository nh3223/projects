import React from 'react';

const DurationForm = ({ cliffMonths, handleSubmit, handleChange }) => (
  <form onSubmit={ handleSubmit }>
    <label>Duration of cliff in months:</label>
    <input value={ cliffMonths } onChange={ handleChange } />
  </form>
);

export default DurationForm;