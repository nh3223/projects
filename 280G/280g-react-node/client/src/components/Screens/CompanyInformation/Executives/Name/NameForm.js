import React from 'react';

import InputForm from '../../../../Elements/InputForm/InputForm';

const NameForm = ({ name, handleChange, handleSubmit }) => (
  <InputForm name="executiveName" value={ name } handleChange={ handleChange } handleSubmit={ handleSubmit } />
);

export default NameForm;