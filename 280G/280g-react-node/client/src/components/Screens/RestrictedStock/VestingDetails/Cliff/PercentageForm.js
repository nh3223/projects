import React from 'react';

const PercentageForm = ({ cliffPercentage, handleSubmit, handleChange }) => (
  <form onSubmit={ handleSubmit }>
    <label>Percentage of Shares subject to cliff:</label>
    <input value={ cliffPercentage } onChange={ handleChange } />
  </form>
);

export default PercentageForm;