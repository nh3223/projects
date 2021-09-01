import React from 'react';
import { useRecoilState } from 'recoil';

import { executiveIdsState } from '../../../../recoil/executive';
import useLoadExecutives from '../../../../hooks/useLoadExecutives';
import { createExecutive } from '../../../../api/executive/createExecutive';
import { createCompensation } from '../../../../api/compensation/createCompensation';

import Loading from '../../../Loaders/Loading';
import Executive from '../Executive/Executive';
import SubTitle from '../../../Elements/TextElements/SubTitle/SubTitle';
import AddButton from '../../../Elements/Buttons/AddButton/AddButton';

const Executives = ({ companyId }) => {

  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState(companyId));
  const { loading, error } = useLoadExecutives(companyId);

  const handleAdd = async () => {
    const newExecutive = await createExecutive(companyId);
    await createCompensation(newExecutive._id);
    setExecutiveIds([ newExecutive._id, ...executiveIds ]);
  };

  const removeExecutiveId = (executiveId) => setExecutiveIds(executiveIds.filter((id) => id !== executiveId));

  if (loading) return <Loading component="Executives" error={ error } />

  return (
    <>
      <SubTitle text="Executives" />
      <AddButton text="Add an Executive" handleAdd={ handleAdd } />
      { (executiveIds) 
        ? executiveIds.map((id) => <Executive key={ id } executiveId={ id } removeExecutiveId={ removeExecutiveId } />)
        : null }
    </>

  );

};

export default Executives;