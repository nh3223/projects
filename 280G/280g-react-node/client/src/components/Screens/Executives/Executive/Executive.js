import React from 'react';

import { useLoadExecutive } from '../../../../hooks/useLoadExecutive';
import { deleteExecutive } from '../../../../api/executive/deleteExecutive';
import { deleteCompensation } from '../../../../api/compensation/deleteCompensation';

import Loading from '../../Loading/Loading';
import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Name from '../ExecutiveName/ExecutiveName';
import Title from '../ExecutiveTitle/ExecutiveTitle';
import DeleteButton from '../../../Elements/Buttons/DeleteButton/DeleteButton';

const Executive = ({ executiveId, removeExecutiveId }) => {

  const { status, error } = useLoadExecutive(executiveId);

  const handleDelete = async () => {
    await deleteExecutive(executiveId);
    await deleteCompensation(executiveId);
    removeExecutiveId(executiveId);
  }

  const buttonText = "Delete Executive";
  const name = `${buttonText}-${executiveId}`;

  if (status === 'loading') return <Loading componentMessage= { `Executive ${executiveId}` } errorMessage={ error } />

  return (
    <SingleLineLayout>
      <Name executiveId={ executiveId } />
      <Title executiveId={ executiveId } />
      <DeleteButton name={ name } id={ executiveId } text={ buttonText } handleDelete={ handleDelete } />
    </SingleLineLayout>
  );

};

export default Executive;