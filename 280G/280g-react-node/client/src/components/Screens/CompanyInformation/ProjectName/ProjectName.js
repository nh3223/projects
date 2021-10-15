import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { projectNameState } from '../../../../recoil/company';
import { editCompany } from '../../../../api/company/editCompany';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const ProjectName = ({ companyId }) => {
  
    const [ projectName, setProjectName ] = useRecoilState(projectNameState(companyId))  
    const [ project, setProject ] = useState(projectName);
    const [ completed, setCompleted ] = useState((projectName) ? true : false);

    const handleChange = ({ target: { value }}) => setProject(value);

    const handleEdit = () => setCompleted(false);

    const handleSubmit = async () => {
      await editCompany(companyId, { projectName: project });
      setProjectName(project);
      setCompleted(true);
    }
  
    return (
      <SingleLineLayout>
        <Description text="Project Name: " />
        { (completed)
        ? <Identifier text={ project } handleEdit={ handleEdit }/>
        : <InputForm value={ project } handleChange={ handleChange } handleSubmit={ handleSubmit } />
        } 
      </SingleLineLayout>
    );

};

export default ProjectName;