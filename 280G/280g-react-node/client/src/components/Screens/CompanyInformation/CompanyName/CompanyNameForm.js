import React from 'react';

import InputForm from '../../../Elements/InputForm';

const CompanyNameForm = ({ companyName, handleSubmit, handleChange}) => {
  
  const validate = ({ target: { name, value } }) => handleChange(name, value);

  return (
    <InputForm name="companyName" value={ companyName } handleChange={ validate } handleSubmit={ handleSubmit } />
  );

};

export default CompanyNameForm;