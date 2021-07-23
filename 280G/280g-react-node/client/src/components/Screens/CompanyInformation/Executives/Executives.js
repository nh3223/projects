import React from 'react';
import { useRecoilState, useRecoilCallback } from 'recoil';

import Executive from './Executive';
import SubTitle from '../../../Elements/SubTitle/SubTitle';
import AddButton from '../../../Elements/AddButton/AddButton';

import { executiveState, executiveIdsState } from '../../../../recoil/executive';
import { createExecutive } from '../../../../api/executive';

const Executives = ({ companyId }) => {

  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState)

  const setExecutive = useRecoilCallback(({ set }) => (executive) => set(executiveState(executive._id), executive), []);
  
  const handleAdd = async () => {
    const executive = {
      company: companyId,
      executiveName: '',
      title: ''
    };
    const newExecutive = await createExecutive(executive);
    setExecutive({ ...newExecutive, new: true });
    setExecutiveIds([ newExecutive._id, ...executiveIds ]);
  };

  const removeExecutiveId = (executiveId) => setExecutiveIds(executiveIds.filter((id) => id !== executiveId));

  return (
    <>
      <SubTitle text="Executives" />
      <AddButton name="addExecutive" text="Add an Executive" handleAdd={ handleAdd } />
      { (executiveIds) && executiveIds.map((id) => <Executive key={ id } executiveId={ id } removeExecutiveId={ removeExecutiveId } />) }
    </>
  );

};

export default Executives;