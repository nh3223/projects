import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { executiveTitleState } from '../../../../../recoil/executive';
import { editExecutive } from '../../../../../api/executive/editExecutive';

import Description from '../../../../Elements/TextElements/Description/Description';
import Identifier from '../../../../Elements/Identifier/Identifier';
import InputForm from '../../../../Elements/Forms/InputForm/InputForm';

const ExecutiveTitle = ({ executiveId }) => {
  
  const [ executiveTitle, setExecutiveTitle ] = useRecoilState(executiveTitleState(executiveId));
  const [ completed, setCompleted ] = useState(true);
  const [ edit, setEdit ] = useState(false);

  const handleChange = ({ target: { value }}) => {
    setExecutiveTitle(value);
    setEdit(true);
  };

  const handleEdit = () => {
    setCompleted(false);
    setEdit(true);
  };

  const handleSubmit = async () => {
    await editExecutive(executiveId, { executiveTitle });
    setCompleted(true);
    setEdit(false);
  };

  useEffect(() => (executiveTitle && !edit) ? setCompleted(true) : setCompleted(false), [executiveTitle, edit, setCompleted]);

  return (
    <>
      <Description text="Title: " />
      { completed
        ? <Identifier text={ executiveTitle } handleEdit={ handleEdit } />
        : <InputForm value={ executiveTitle } handleChange={ handleChange } handleSubmit={ handleSubmit } />
      }
    </>
  );

};

export default ExecutiveTitle;