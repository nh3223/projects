import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import CompanyNameIdentifier from './CompanyNameIdentifier';
import CompanyNameForm from './CompanyNameForm';
import { companyState, companyCompletedState } from '../../../../recoil/atoms/company';
import { saveCompany } from '../../../../api/company';
import isCompleted from '../../../../utilities/isCompleted';

const CompanyName = ({ companyId }) => {

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const [ name, setName ] = useState('');

  console.log('comapny name completed', completed)

  const handleEdit = () => {
    setCompleted({ ...completed, name: false});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCompany({ ...company, name });
    setCompleted({ ...completed, name: true });
    if (isCompleted(completed)) {
      const newCompany = await saveCompany(company);
      console.log(newCompany);
    }
  };

  const handleChange = (e) => setName(e.target.value);

  useEffect(() => {
    if (company.id) {
      setName(company.name);
    }
  }, [company.id, company.name]);

  return (
    <>
      { (completed.name)
      ? <CompanyNameIdentifier name={ company.name } handleEdit={ handleEdit }/>
      : <CompanyNameForm name={ name } handleSubmit={ handleSubmit } handleChange={ handleChange } />
      } 
    </>
  );

};

export default CompanyName;


