import React from 'react';
import { useRecoilState } from 'recoil';

import Executive from '../Executive/Executive';
import SubTitle from '../../../../Elements/TextElements/SubTitle/SubTitle';
import AddButton from '../../../../Elements/Buttons/AddButton/AddButton';

import { executiveIdsState } from '../../../../../recoil/executive';
import { createExecutive } from '../../../../../api/executive/createExecutive';

const Executives = ({ companyId }) => {

  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState)

  const handleAdd = async () => {
    const newExecutive = await createExecutive(companyId);
    setExecutiveIds([ newExecutive._id, ...executiveIds ]);
  };

  const removeExecutiveId = (executiveId) => setExecutiveIds(executiveIds.filter((id) => id !== executiveId));

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