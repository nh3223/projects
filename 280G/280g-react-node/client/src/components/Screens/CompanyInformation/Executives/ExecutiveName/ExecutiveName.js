import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { executiveNameState } from '../../../../../recoil/executive';
import { editExecutive } from '../../../../../api/executive/editExecutive';

import Description from '../../../../Elements/TextElements/Description/Description';
import Identifier from '../../../../Elements/Identifier/Identifier';
import InputForm from '../../../../Elements/Forms/InputForm/InputForm';

const ExecutiveName = ({ executiveId }) => {
  
  const [ executiveName, setExecutiveName ] = useRecoilState(executiveNameState(executiveId));
  const [ completed, setCompleted ] = useState(true);
  const [ edit, setEdit ] = useState(false);

  const handleChange = ({ target: { value }}) => {
    setExecutiveName(value);
    setEdit(true);
  };

  const handleEdit = () => {
    setCompleted(false);
    setEdit(true);
  };

  const handleSubmit = async () => {
    await editExecutive(executiveId, { executiveName });
    setCompleted(true);
    setEdit(false);
  };

  useEffect(() => (executiveName && !edit) ? setCompleted(true) : setCompleted(false), [executiveName, edit, setCompleted]);

  return (
    <>
      <Description text="Name: " />
      { completed
        ? <Identifier text={ executiveName } handleEdit={ handleEdit } />
        : <InputForm value={ executiveName } handleChange={ handleChange } handleSubmit={ handleSubmit } />
      }
    </>
  );

};

export default ExecutiveName;