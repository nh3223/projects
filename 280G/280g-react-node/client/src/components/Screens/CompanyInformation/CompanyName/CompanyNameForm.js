import React from 'react';

import InputForm from '../../../Elements/InputForm/InputForm';

const CompanyNameForm = ({ companyName, handleSubmit, handleChange}) => {
  
  const processChange = ({ target: { name, value } }) => handleChange(name, value);

  return (
    <InputForm name="companyName" value={ companyName } handleChange={ processChange } handleSubmit={ handleSubmit } />
  );

};

export default CompanyNameForm;