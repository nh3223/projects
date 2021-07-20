import React from 'react';

const PeriodsForm = ({ remainderPeriods, handleChange, handleSubmit }) => (
  <form onSubmit={ handleSubmit }>
    <label>Number of periods over which shares vest:</label>
    <input value= { remainderPeriods } onChange={ handleChange } />
  </form>
);

export default PeriodsForm;