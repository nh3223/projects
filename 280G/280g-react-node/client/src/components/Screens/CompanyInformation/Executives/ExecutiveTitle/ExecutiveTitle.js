import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { executiveTitleState } from '../../../../../recoil/executive';
import { editExecutive } from '../../../../../api/executive/editExecutive';

import SingleLineLayout from '../../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../../Elements/TextElements/Description/Description';
import Identifier from '../../../../Elements/Identifier/Identifier';
import InputForm from '../../../../Elements/Forms/InputForm/InputForm';

const ExecutiveTitle = ({ executiveId }) => {
  
  const [ executiveTitle, setExecutiveTitle ] = useRecoilState(executiveTitleState(executiveId));
  const [ completed, setCompleted ] = useState((executiveTitle) ? true : false);
  
  const handleChange = ({ target: { value }}) => setExecutiveTitle(value);

  const handleEdit = () => setCompleted(false);

  const handleSubmit = async () => {
    await editExecutive(executiveId, { executiveTitle });
    setCompleted(true);
  };

  return (
    <SingleLineLayout>
      <Description text="Title: " />
      { completed
        ? <Identifier text={ executiveTitle } handleEdit={ handleEdit } />
        : <InputForm value={ executiveTitle } handleChange={ handleChange } handleSubmit={ handleSubmit } />
      }
    </SingleLineLayout>
  );

};

export default ExecutiveTitle;