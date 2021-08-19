import React from 'react';

import { deleteExecutive } from '../../../../../api/executive/deleteExecutive';

import Name from '../ExecutiveName/ExecutiveName';
import Title from '../ExecutiveTitle/ExecutiveTitle';
import DeleteButton from '../../../../Elements/Buttons/DeleteButton/DeleteButton';

const Executive = ({ executiveId, removeExecutiveId }) => {

  const handleDelete = async () => {
    await deleteExecutive(executiveId);
    removeExecutiveId(executiveId);
  }

  return (
    <>
      <Name executiveId={ executiveId } />
      <Title executiveId={ executiveId } />
      <DeleteButton name={ executiveId } text="Delete Executive" handleDelete={ handleDelete } />
    </>
  );

};

export default Executive;