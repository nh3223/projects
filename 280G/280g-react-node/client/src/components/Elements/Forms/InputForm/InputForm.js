import React from 'react';

import StyledInput from './StyledInput';
import ErrorMessage from '../../TextELements/ErrorMessage/ErrorMessage';

const InputForm = ({ name, value, handleChange, handleSubmit, errorMessage }) => {

  // const processChange = ({ target: { name, value }}) => handleChange(name, value);

  const processSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  return (
    <form name={ name } onSubmit={ processSubmit }>
      <StyledInput name={ name } type="text" value={ value } onChange={ handleChange } />
      <ErrorMessage text={ errorMessage } />
    </form>
  );

};

export default InputForm;