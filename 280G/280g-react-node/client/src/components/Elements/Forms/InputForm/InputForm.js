import React from 'react';

import Label from '../Label/Label';
import StyledInput from './StyledInput';
import ErrorMessage from '../../TextElements/ErrorMessage/ErrorMessage';

const InputForm = ({ name, value, handleChange, handleSubmit, errorMessage }) => {

  const processSubmit = async (e) => {
    e.preventDefault();
    await handleSubmit(e);
  };

  return (
    <form onSubmit={ processSubmit }>
      <Label htmlFor={ name } />
      <StyledInput id={ name } type="text" value={ value } onChange={ handleChange } />
      <ErrorMessage text={ errorMessage } />
    </form>
  );

};

export default InputForm;