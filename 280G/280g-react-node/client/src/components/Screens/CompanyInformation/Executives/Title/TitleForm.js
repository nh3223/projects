import React from 'react';


import InputForm from '../../../../Elements/InputForm/InputForm';

const TitleForm = ({ title, handleChange, handleSubmit }) => (
  <InputForm name="title" value={ title } handleChange={ handleChange } handleSubmit={ handleSubmit } />
);

export default TitleForm;