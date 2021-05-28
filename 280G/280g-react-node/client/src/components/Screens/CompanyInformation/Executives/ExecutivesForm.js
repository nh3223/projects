import React from 'react';

const ExecutivesForm = ({ executive, handleSubmit, handleChange}) => (
  <form onSubmit={ handleSubmit }>
    <label>Executives: </label>
    <input value={ executive } onChange={ handleChange }></input>
  </form>
);

export default ExecutivesForm;