import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue, useRecoilState, useRecoilCallback } from 'recoil';

import ExecutivesForm from './ExecutivesForm';
import { executiveIdsState, executiveState } from '../../../../recoil/executive';
import { editExecutive, deleteExecutive } from '../../../../api/executive';

const ExecutivesIdentifier = ({ executiveId }) => {

  const executive = useRecoilValue(executiveState(executiveId));
  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState)
  const [ name, setName ] = useState(executive.name);
  const [ title, setTitle ] = useState(executive.name);
  const [ edit, setEdit ] = useState(false);

  const setExecutive = useRecoilCallback(({ set }) => (executive) => set(executiveState(executive._id), executive), []);
  const clearExecutive = useRecoilCallback( ({ reset }) => (executive) => reset(executiveState(executive._id)));
  
  const resetLocalState = () => {
    setEdit(false);
    setName('');
    setTitle('');
  };

  const handleEdit = () => setEdit(true);
  
  const nameChange = (e) => setName(e.target.value);
  const titleChange = (e) => setTitle(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedExecutive = { ...executive, name, title }
    await editExecutive(editedExecutive); 
    setExecutive(editedExecutive)
    resetLocalState();
  };

  const handleDelete = async () => {
    await deleteExecutive(executive._id);
    clearExecutive(executive);
    setExecutiveIds(executiveIds.filter((id) => (id !== executive._id)));
 };

  return (
    <>
      { edit
      ? <ExecutivesForm name={ name } title={ title } nameChange={ nameChange } titleChange={ titleChange } handleSubmit={ handleSubmit }/>
      : <>
          <Link to={`/executive/${executive._id}`}>
            <h3>{ executive.name }</h3>
            <h4>{ executive.title }</h4>
          </Link>
          <button onClick={ handleEdit }>Edit</button>
          <button onClick={ handleDelete }>Delete</button>
        </>
      }
    </>
  );
};

export default ExecutivesIdentifier;