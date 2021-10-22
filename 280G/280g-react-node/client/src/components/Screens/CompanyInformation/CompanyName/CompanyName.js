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
    const [ name, setName ] = useState(companyName);  
    const [ completed, setCompleted ] = useState((companyName) ? true : false);

    const handleChange = ({ target: { value }}) => setName(value);

    const handleEdit = () => setCompleted(false);

    const handleSubmit = async () => {
      await editCompany(companyId, { companyName });
      setCompanyName(name);
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
        : <InputForm value={ name } handleChange={ handleChange } handleSubmit={ handleSubmit } />
        } 
      </SingleLineLayout>
    );

};

export default CompanyName;