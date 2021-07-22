import React from 'react';

import StyledInput from './StyledInput';

const InputForm = ({ name, value, handleChange, handleSubmit }) => {

  const submit = (e) => {
    e.preventDefault();
    console.log(e);
    handleSubmit(e);
  };

  console.log('name', name);

  return (
    <form name={ name } onSubmit={ submit }>
      <StyledInput name={ name } type="text" value={ value } onChange={ handleChange } />
    </form>
  );

};

export default InputForm;