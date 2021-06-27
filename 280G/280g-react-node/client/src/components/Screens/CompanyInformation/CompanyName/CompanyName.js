import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import CompanyNameIdentifier from './CompanyNameIdentifier';
import CompanyNameForm from './CompanyNameForm';
import { companyState, companyCompletedState } from '../../../../recoil/company';
import isCompleted from '../../../../utilities/isCompleted';
import { editCompany } from '../../../../api/company';

const CompanyName = () => {

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const [ name, setName ] = useState('');
  const [ edit, setEdit ] = useState(false);

  const handleEdit = () => {
    setCompleted({ ...completed, name: false});
    setEdit(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyData = { ...company, name }
    const completedData = { ...completed, name: true };
    setCompany(companyData);
    setCompleted(completedData);
    if (edit && isCompleted(completedData)) {
      await editCompany(companyData);
    }
    setEdit(false);
  };

  const handleChange = (e) => setName(e.target.value);

  useEffect(() => {
    if (company.id) { setName(company.name); }
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


