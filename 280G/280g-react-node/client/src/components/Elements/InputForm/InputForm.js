import React from 'react';

import StyledInput from './StyledInput';

const InputForm = ({ name, value, handleChange, handleSubmit }) => (
  <form name={ name } onSubmit={ handleSubmit }>
    <StyledInput name={ name } value={ value } onChange={ handleChange } />
  </form>
);

export default InputForm;