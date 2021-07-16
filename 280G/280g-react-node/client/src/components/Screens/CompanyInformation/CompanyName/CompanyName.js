import React from 'react';

import CompanyNameIdentifier from './CompanyNameIdentifier';
import CompanyNameForm from './CompanyNameForm';

const CompanyName = ({ companyName, completed, handlers: { change, edit, submit }}) => (
  <>
    { (completed)
    ? <CompanyNameIdentifier companyName={ companyName } handleEdit={ edit }/>
    : <CompanyNameForm companyName={ companyName } handleChange={ change } handleSubmit={ submit } />
    } 
  </>
);

export default CompanyName;


