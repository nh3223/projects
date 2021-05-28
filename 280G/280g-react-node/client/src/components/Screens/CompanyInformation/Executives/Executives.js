import React, { useContext, useState } from 'react';

import ExecutivesIdentifier from './ExecutivesIdentifier';
import ExecutivesForm from './ExecutivesForm';
import GlobalContext from '../../../../context/GlobalContext';

const Executives = () => {

  const [ executive, setExecutive ] = useState('');
  const { executives, setExecutives } = useContext(GlobalContext);
  const [ add, setAdd ] = useState(false);

  const handleAdd = () => {
    setAdd(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExecutives([...executives, executive ])
    setAdd(false);
    setExecutive('');
  };

  const handleChange = (e) => setExecutive(e.target.value);

  console.log('Executives', executives)

  return (
    <>
      <h2>Executives</h2>
      <button onClick={ handleAdd }>Add an Executive</button>
      { (add) && <ExecutivesForm executive={ executive } handleSubmit={ handleSubmit } handleChange={ handleChange } /> } 
      { (executives) && executives.map((exec) => <ExecutivesIdentifier key={ exec } currentExecutive={ exec } />) }
    </>
  );

};

export default Executives;