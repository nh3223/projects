import React from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const CompanyName = ({ name, companyName, completed, handlers: { change, edit, submit }}) => (
  <>
    <Description text="Company Name: " />
    { (completed)
    ? <Identifier name={ name } text={ companyName } handleEdit={ edit }/>
    : <InputForm name={ name } value={ companyName } handleChange={ change } handleSubmit={ submit } />
    } 
  </>
);

export default CompanyName;


