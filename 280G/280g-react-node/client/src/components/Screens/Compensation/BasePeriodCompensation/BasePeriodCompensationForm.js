import React from 'react';

const BasePeriodCompensationForm = ({ year, compensation, handleChange, handleSubmit }) => (
  <form name={ year } onSubmit={ handleSubmit }>
    <label>{ year }</label>
    <input name={ year } value={ compensation } onChange={ handleChange }></input>
  </form>
);

export default BasePeriodCompensationForm;

<InputForm name={ year } value