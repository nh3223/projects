import React from 'react';

const NameForm = ({ name, handleChange, handleSubmit }) => (
  <form onSubmit={ handleSubmit }>
    <input value={ name } placeholder="Name" onChange={ handleChange }></input>
  </form>
);

export default NameForm;