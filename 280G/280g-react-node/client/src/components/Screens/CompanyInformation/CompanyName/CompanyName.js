import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import CompanyNameIdentifier from './CompanyNameIdentifier';
import CompanyNameForm from './CompanyNameForm';
import { companyNameState } from '../../../../recoil/atoms/CompanyInformation';

const CompanyName = () => {

  const [ companyName, setCompanyName ] = useRecoilState(companyNameState);
  const [ name, setName ] = useState(companyName);
  const [ completed, setCompleted ] = useState((name) ? true : false);

  const handleEdit = () => {
    setCompleted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanyName(name);
    setCompleted(true);
  };

  const handleChange = (e) => setName(e.target.value);

  return (
    <>
      { completed
      ? <CompanyNameIdentifier companyName={ companyName } handleEdit={ handleEdit }/>
      : <CompanyNameForm name={ name } handleSubmit={ handleSubmit } handleChange={ handleChange } />
      } 
    </>
  );

};

export default CompanyName;


