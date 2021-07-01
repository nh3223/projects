import React, { useState } from 'react';
import { useRecoilState, useRecoilCallback } from 'recoil';

import ExecutivesIdentifier from './ExecutivesIdentifier';
import ExecutivesForm from './ExecutivesForm';
import { executiveState, executiveIdsState } from '../../../../recoil/executive';
import { createExecutive, editExecutive, deleteExecutive } from '../../../../api/executive';

const Executives = ({ companyId }) => {

  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState)
  const [ name, setName ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ add, setAdd ] = useState(false);

  const setExecutive = useRecoilCallback(({ set }) => (executive) => set(executiveState(executive._id), executive), []);
  const clearExecutive = useRecoilCallback( ({ reset }) => (executive) => reset(executiveState(executive._id)));

  const resetLocalState = () => {
    setAdd(false);
    setName('');
    setTitle('');
  };

  const handleAdd = () => setAdd(true);

  const handleCreate = async (e) => {
    e.preventDefault();
    const executiveData = { company: companyId, name, title };
    const savedExecutive = await createExecutive(executiveData)
    setExecutive(savedExecutive);
    setExecutiveIds([...executiveIds, savedExecutive._id])
    resetLocalState();
  };

  const handleUpdate = async (executive) => {
    const editedExecutive = { ...executive, name, title }
    await editExecutive(editedExecutive); 
    setExecutive(editedExecutive)
    resetLocalState();
  };

  const handleDelete = async (executive) => {
    await deleteExecutive(executive._id);
    clearExecutive(executive);
    setExecutiveIds(executiveIds.filter((id) => (id !== executive._id)));
 };

  const handlers = {
    nameChange: (e) => setName(e.target.value),
    titleChange: (e) => setTitle(e.target.value),
    createExecutive: handleCreate,
    updateExecutive: handleUpdate,
    deleteExecutive: handleDelete
  };

  return (
    <>
      <h2>Executives</h2>
      { (!add) && <button onClick={ handleAdd }>Add an Executive</button> }
      { (add) && <ExecutivesForm name={ name } title={ title } nameChange={ handlers.nameChange } titleChange={ handlers.titleChange } handleSubmit={ handlers.create } /> } 
      { (executiveIds) && executiveIds.map((id) => <ExecutivesIdentifier key={ id } executiveId={ id } handlers={ handlers } />)}
    </>
  );

};

export default Executives;