import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { companyNameState } from '../../../../recoil/company';
import { editCompany } from '../../../../api/company/editCompany';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const CompanyName = ({ companyId }) => {
  
    const [ companyName, setCompanyName ] = useRecoilState(companyNameState(companyId))  
    const [ completed, setCompleted ] = useState((companyName) ? true : false);

    const handleChange = ({ target: { value }}) => setCompanyName(value);

    const handleEdit = () => setCompleted(false);

    const handleSubmit = async () => {
      await editCompany(companyId, { companyName });
      setCompleted(true);
    }
  
    useEffect(() => {
      setCompleted((companyName) ? true : false)
    }, [companyName, setCompleted]);

    return (
      <SingleLineLayout>
        <Description text="Company Name: " />
        { (completed)
        ? <Identifier text={ companyName } handleEdit={ handleEdit }/>
        : <InputForm value={ companyName } handleChange={ handleChange } handleSubmit={ handleSubmit } />
        } 
      </SingleLineLayout>
    );

};

export default CompanyName;