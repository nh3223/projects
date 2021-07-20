import React from 'react';

import Descriptoion from '../../../Elements/Description/Description';
import CompanyNameIdentifier from './CompanyNameIdentifier';
import CompanyNameForm from './CompanyNameForm';

const CompanyName = ({ companyName, completed, handlers: { change, edit, submit }}) => (
  <>
    <Descriptoion text={ 'Company Name: ' } />
    { (completed)
    ? <CompanyNameIdentifier companyName={ companyName } handleEdit={ edit }/>
    : <CompanyNameForm companyName={ companyName } handleChange={ change } handleSubmit={ submit } />
    } 
  </>
);

export default CompanyName;


