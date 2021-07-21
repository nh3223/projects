import React from 'react';

import StyledInput from './StyledInput';

const InputForm = ({ name, value, handleChange, handleSubmit }) => {

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <form name={ name } onSubmit={ submit }>
      <StyledInput name={ name } type="text" value={ value } onChange={ handleChange } />
    </form>
  );

};

export default InputForm;