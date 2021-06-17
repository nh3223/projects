import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import ExecutivesForm from './ExecutivesForm';
import { executivesState } from '../../../../recoil/atoms/executive';
import { editExecutive, deleteExecutive } from '../../../../api/executive';

const ExecutivesIdentifier = ({ currentExecutive }) => {

  const [ executives, setExecutives ] = useRecoilState(executivesState);
  const [ executive, setExecutive ] = useState(currentExecutive);
  const [ name, setName ] = useState(executive.name);
  const [ title, setTitle ] = useState(executive.title);
  const [ edit, setEdit ] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleDelete = async () => {
    console.log(executive);
    const id = executive._id;
    await deleteExecutive(id);
    setExecutives(executives.filter((exec) => (exec._id !== id)));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedExecutive = { ...executive, name, title }
    await editExecutive(editedExecutive); 
    const updatedExecutives = executives.map((exec) => (exec.id === editedExecutive.id) ? editedExecutive : exec);
    setExecutive(editedExecutive)
    setExecutives(updatedExecutives);
    setEdit(false);
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);

  return (
    <>
      { edit
      ? <ExecutivesForm name={ name } title={ title } handleSubmit={ handleSubmit } handleNameChange={ handleNameChange } handleTitleChange={ handleTitleChange } />
      : <>
          <h3>{ executive.name }</h3>
          <h4>{ executive.title }</h4>
          <button onClick={ handleEdit }>Edit</button>
          <button onClick={ handleDelete }>Delete</button>
        </>
      }
    </>
  );
};

export default ExecutivesIdentifier;