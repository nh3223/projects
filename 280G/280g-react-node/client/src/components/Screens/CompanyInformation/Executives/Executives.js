import React, { useState } from 'react';
import { useRecoilState, useRecoilCallback } from 'recoil';

import Executive from './Executive';
import { executiveState, executiveIdsState } from '../../../../recoil/executive';
import { createExecutive } from '../../../../api/executive';

const Executives = ({ companyId }) => {

  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState)
  const [ add, setAdd ] = useState(false);

  const setExecutive = useRecoilCallback(({ set }) => (executive) => set(executiveState(executive._id), executive), []);
  
  const handleAdd = () => setAdd(true);

  const handleCreate = async ({ name, title }) => {
    const executive = { company: companyId, name, title };
    const savedExecutive = await createExecutive(executive);
    setExecutive(savedExecutive);
    setExecutiveIds([...executiveIds, savedExecutive._id])
    handleAdd(false);
  };

  const removeExecutiveId = (executiveId) => setExecutiveIds(executiveIds.filter((id) => id !== executiveId));

  return (
    <>
      <h2>Executives</h2>
      { (!add) && <button onClick={ handleAdd }>Add an Executive</button> }
      { (add) && <Executive executiveId={ null } handleCreate={ handleCreate } /> } 
      { (executiveIds) && executiveIds.map((id) => <Executive key={ id } executiveId={ id } add={ add} handleCreate={ handleCreate } removeExecutiveId={ removeExecutiveId } />)}
    </>
  );

};

export default Executives;