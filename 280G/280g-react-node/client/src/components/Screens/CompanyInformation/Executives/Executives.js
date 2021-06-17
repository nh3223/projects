import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import ExecutivesIdentifier from './ExecutivesIdentifier';
import ExecutivesForm from './ExecutivesForm';
import { executivesState } from '../../../../recoil/atoms/executive';
import { createExecutive } from '../../../../api/executive';

const Executives = ({ companyId }) => {

  const [ executives, setExecutives ] = useRecoilState(executivesState);
  const [ name, setName ] = useState('');
  const [ title, setTitle ] = useState('');
  const [ add, setAdd ] = useState(false);

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
    const executive = await createExecutive(executiveData)
    setExecutives([...executives, executive ])
    setAdd(false);
    setName('');
    setTitle('');
  };

  const handleNameChange = (e) => setName(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);

  console.log(executives);

  return (
    <>
      <h2>Executives</h2>
      { (!add) && <button onClick={ handleAdd }>Add an Executive</button> }
      { (add) && <ExecutivesForm name={ name } title={ title } handleSubmit={ handleSubmitAdd } handleNameChange={ handleNameChange } handleTitleChange={ handleTitleChange } /> } 
      { (executives) && executives.map((exec) => <ExecutivesIdentifier key={ exec._id } currentExecutive={ exec } />)}
    </>
  );

};

export default Executives;