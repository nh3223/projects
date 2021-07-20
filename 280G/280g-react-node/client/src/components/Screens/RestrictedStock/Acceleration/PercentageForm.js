import React from 'react';

const PercentageForm = ({ percentageAcceleration, handleChange, handleSubmit }) => (
  <form onSubmit={ handleSubmit } >
    <p>Percentage of Unvested Shares Accelerating on Transaction</p>
    <input value={ percentageAcceleration } onChange={ handleChange } />
  </form>
);

export default PercentageForm;