import React from 'react';

import AnnualCompensationForm from './AnnualCompensationForm';

const AnnualCompensationIdentifier = ({ year, handleEdit, handleChange, handleSubmit }) => {

  const handleCompensationEdit = () => handleEdit(year.year);

  return (
    <>
      { year.edit
      ? <AnnualCompensationForm year={ year.year } compensation={ year.compensation } error={ year.error } handleChange={ handleChange } handleSubmit={ handleSubmit } />
      : <>
          <h3>{ year.year }{ `$${year.compensation}` }</h3>
          <button onClick={ handleCompensationEdit }>Edit</button>
        </>
      }
    </>
  );
};

export default AnnualCompensationIdentifier;