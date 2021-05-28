import React, { useState } from 'react';

import CompanyNameIdentifier from './CompanyNameIdentifier';
import CompanyNameForm from './CompanyNameForm';

const CompanyName = () => {

  const [ name, setName ] = useState('');
  const [ completed, setCompleted ] = useState(false);

  const handleEdit = () => {
    setCompleted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompleted(true);
  };

  const handleChange = (e) => setName(e.target.value);

  return (
    <>
      { completed
      ? <CompanyNameIdentifier name={ name } handleEdit={ handleEdit }/>
      : <CompanyNameForm name={ name } handleSubmit={ handleSubmit } handleChange={ handleChange } />
      } 
    </>
  );

};

export default CompanyName;


