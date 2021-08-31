import React from 'react';

import useLoadExecutive from '../../../../hooks/useLoadExecutive';
import { deleteExecutive } from '../../../../api/executive/deleteExecutive';
import { deleteCompensation } from '../../../../api/compensation/deleteCompensation';

import Loading from '../../../Loaders/Loading';
import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Name from '../ExecutiveName/ExecutiveName';
import Title from '../ExecutiveTitle/ExecutiveTitle';
import DeleteButton from '../../../Elements/Buttons/DeleteButton/DeleteButton';

const Executive = ({ executiveId, removeExecutiveId }) => {

  const { loading, error } = useLoadExecutive(executiveId);

  const handleDelete = async () => {
    await deleteExecutive(executiveId);
    await deleteCompensation(executiveId);
    removeExecutiveId(executiveId);
  }

  return (
    loading
    ? <Loading componentMessage= { `Executive ${executiveId}` } errorMessage={ error } />
    : <SingleLineLayout>
        <Name executiveId={ executiveId } />
        <Title executiveId={ executiveId } />
        <DeleteButton name={ executiveId } text="Delete Executive" handleDelete={ handleDelete } />
      </SingleLineLayout>
  );

};

export default Executive;