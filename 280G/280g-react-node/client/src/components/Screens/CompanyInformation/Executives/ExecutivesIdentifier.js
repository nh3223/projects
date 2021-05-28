import React, { useContext, useState } from 'react';
import GlobalContext from '../../../../context/GlobalContext';

import ExecutivesForm from './ExecutivesForm';

const ExecutivesIdentifier = ({ currentExecutive }) => {
  
  const { executives, setExecutives } = useContext(GlobalContext);
  const [ executive, setExecutive ] = useState(currentExecutive);
  const [ edit, setEdit ] = useState(false);


  console.log('executive', executive);
  console.log('executives', executives);


  const handleEdit = () => {
    setEdit(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExecutives = executives.map((exec) => (exec === currentExecutive) ? executive : exec);
    setExecutives(updatedExecutives);
    setEdit(false);
  };

  const handleChange = (e) => setExecutive(e.target.value);

  return (
    <>
      { edit
      ? <ExecutivesForm executive={ executive } handleSubmit={ handleSubmit } handleChange={ handleChange } />
      : <>
          <h3>{ executive }</h3>
          <button onClick={ handleEdit }>Edit</button>
        </>
      }
    </>
  );
};

export default ExecutivesIdentifier;