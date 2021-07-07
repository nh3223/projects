import React, { useState } from 'react';
import { useRecoilState, useRecoilCallback } from 'recoil';

import ExecutivesIdentifier from './ExecutivesIdentifier';
import ExecutivesForm from './ExecutivesForm';
import { executiveState, executiveIdsState } from '../../../../recoil/executive';
import { createExecutive } from '../../../../api/executive';

const Executives = ({ companyId }) => {

  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState)
  const [ name, setName ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ add, setAdd ] = useState(false);

  const setExecutive = useRecoilCallback(({ set }) => (executive) => set(executiveState(executive._id), executive), []);
  
  const resetLocalState = () => {
    setAdd(false);
    setName('');
    setTitle('');
  };

  const handleAdd = () => setAdd(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const executiveData = { company: companyId, name, title };
    const savedExecutive = await createExecutive(executiveData);
    setExecutive(savedExecutive);
    setExecutiveIds([...executiveIds, savedExecutive._id])
    resetLocalState();
  };

  const nameChange = (e) => setName(e.target.value);
  const titleChange = (e) => setTitle(e.target.value);
  
  return (
    <>
      <h2>Executives</h2>
      { (!add) && <button onClick={ handleAdd }>Add an Executive</button> }
      { (add) && <ExecutivesForm name={ name } title={ title } nameChange={ nameChange } titleChange={ titleChange } handleSubmit={ handleSubmit } /> } 
      { (executiveIds) && executiveIds.map((id) => <ExecutivesIdentifier key={ id } executiveId={ id }  />)}
    </>
  );

};

export default Executives;