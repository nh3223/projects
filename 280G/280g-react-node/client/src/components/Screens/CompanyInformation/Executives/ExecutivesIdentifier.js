import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import ExecutivesForm from './ExecutivesForm';
import { executiveState } from '../../../../recoil/executive';

const ExecutivesIdentifier = ({ executiveId, handlers: { nameChange, titleChange, deleteExecutive, updateExecutive } }) => {

  const executive = useRecoilValue(executiveState(executiveId));
  const [ edit, setEdit ] = useState(false);

  const handleEdit = () => setEdit(true);

  const handleDelete = async () => await deleteExecutive(executive);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateExecutive(executive);
    setEdit(false);
  };

  return (
    <>
      { edit
      ? <ExecutivesForm name={ executive.name } title={ executive.title } nameChange={ nameChange } titleChange={ titleChange } handleSubmit={ handleSubmit }/>
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