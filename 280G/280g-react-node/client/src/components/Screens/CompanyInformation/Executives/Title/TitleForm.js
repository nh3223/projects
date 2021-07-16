import React from 'react';

const TitleForm = ({ title, handleChange, handleSubmit }) => (
  <form onSubmit={ handleSubmit }>
    <input value={ title } placeholder="Title" onChange={ handleChange }></input>
  </form>
);

export default TitleForm;