import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import ExecutivesForm from './ExecutivesForm';
import { executivesState } from '../../../../recoil/atoms/CompanyInformation';

const ExecutivesIdentifier = ({ currentExecutive }) => {

  const [ executives, setExecutives ] = useRecoilState(executivesState);
  const [ executive, setExecutive ] = useState(currentExecutive);
  const [ edit, setEdit ] = useState(false);

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