import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import ExecutivesIdentifier from './ExecutivesIdentifier';
import ExecutivesForm from './ExecutivesForm';
import { executivesState } from '../../../../recoil/atoms/CompanyInformation';

const Executives = () => {

  const [ executives, setExecutives ] = useRecoilState(executivesState);
  const [ executive, setExecutive ] = useState('');
  const [ add, setAdd ] = useState(false);

  const handleAdd = () => {
    setAdd(true);
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    setExecutives([...executives, executive ])
    setAdd(false);
    setExecutive('');
  };

  const handleChange = (e) => setExecutive(e.target.value);

  return (
    <>
      <h2>Executives</h2>
      <button onClick={ handleAdd }>Add an Executive</button>
      { (add) && <ExecutivesForm executive={ executive } handleSubmit={ handleSubmitAdd } handleChange={ handleChange } /> } 
      { (executives) && executives.map((exec) => <ExecutivesIdentifier key={ exec } currentExecutive={ exec } />)}
    </>
  );

};

export default Executives;