import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { executiveNameState } from '../../../../recoil/executive';
import { editExecutive } from '../../../../api/executive/editExecutive';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const ExecutiveName = ({ executiveId }) => {
  
  const [ executiveName, setExecutiveName ] = useRecoilState(executiveNameState(executiveId));
  const [ completed, setCompleted ] = useState((executiveName) ? true : false);

  const handleChange = ({ target: { value }}) => setExecutiveName(value);

  const handleEdit = () => setCompleted(false);

  const handleSubmit = async () => {
    await editExecutive(executiveId, { executiveName });
    setCompleted(true);
  };

  return (
    <SingleLineLayout>
      <Description text="Name: " />
      { completed
        ? <Identifier text={ executiveName } handleEdit={ handleEdit } />
        : <InputForm value={ executiveName } handleChange={ handleChange } handleSubmit={ handleSubmit } />
      }
    </SingleLineLayout>
  );

};

export default ExecutiveName;