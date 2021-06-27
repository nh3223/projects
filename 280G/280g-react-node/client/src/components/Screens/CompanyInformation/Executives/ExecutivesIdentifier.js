import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import ExecutivesForm from './ExecutivesForm';
import { executiveState, executiveIdsState } from '../../../../recoil/executive';
import { editExecutive, deleteExecutive } from '../../../../api/executive';

const ExecutivesIdentifier = ({ executiveId }) => {

  const [ executive, setExecutive ] = useRecoilState(executiveState(executiveId));
  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState);
  const [ name, setName ] = useState(executive.name);
  const [ title, setTitle ] = useState(executive.title);
  const [ edit, setEdit ] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = async () => {
     await deleteExecutive(executive._id);
    setExecutive({ });
    setExecutiveIds(executiveIds.filter((id) => (id !== executive._id)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedExecutive = { ...executive, name, title }
    await editExecutive(editedExecutive); 
    setExecutive(editedExecutive)
    setEdit(false);
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);

  return (
    <>
      { edit
      ? <ExecutivesForm name={ name } title={ title } handleSubmit={ handleSubmit } handleNameChange={ handleNameChange } handleTitleChange={ handleTitleChange } />
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