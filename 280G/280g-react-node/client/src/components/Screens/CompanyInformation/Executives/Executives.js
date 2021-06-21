import React, { useState } from 'react';
import { useRecoilState, useRecoilCallback } from 'recoil';

import ExecutivesIdentifier from './ExecutivesIdentifier';
import ExecutivesForm from './ExecutivesForm';
import { executiveState, executiveIdsState } from '../../../../recoil/atoms/executive';
import { createExecutive } from '../../../../api/executive';

const Executives = ({ companyId }) => {

  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState)
  const [ name, setName ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ add, setAdd ] = useState(false);

  const setExecutive = useRecoilCallback(({ set }) => (executive) => {
    set(executiveState(executive._id), executive);
  }, []);

  const handleAdd = () => {
    setAdd(true);
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    const executiveData = {
      company: companyId,
      name,
      title
    }
    const savedExecutive = await createExecutive(executiveData)
    setExecutive(savedExecutive);
    setExecutiveIds([...executiveIds, savedExecutive._id])
    setAdd(false);
    setName('');
    setTitle('');
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);

  console.log('executive ids', executiveIds);

  return (
    <>
      <h2>Executives</h2>
      { (!add) && <button onClick={ handleAdd }>Add an Executive</button> }
      { (add) && <ExecutivesForm companyId={ companyId } executiveId={ null } name={ name } title={ title } handleSubmit={ handleSubmitAdd } handleNameChange={ handleNameChange } handleTitleChange={ handleTitleChange } /> } 
      { (executiveIds) && executiveIds.map((id) => <ExecutivesIdentifier key={ id } executiveId={ id } />)}
    </>
  );

};

export default Executives;