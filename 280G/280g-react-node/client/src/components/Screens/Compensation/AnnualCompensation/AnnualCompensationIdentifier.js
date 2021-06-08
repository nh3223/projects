import React from 'react';

import AnnualCompensationForm from './AnnualCompensationForm';

const AnnualCompensationIdentifier = ({ year, compensation, edit, handleEdit, handleChange, handleSubmit }) => {

  const handleCompensationEdit = () => handleEdit(year);

  return (
    <>
      { edit
      ? <AnnualCompensationForm year={ year } compensation={ compensation } handleChange={ handleChange } handleSubmit={ handleSubmit } />
      : <>
          <h3>{ year }{ `$${compensation}` }</h3>
          <button onClick={ handleCompensationEdit }>Edit</button>
        </>
      }
    </>
  );
};

export default AnnualCompensationIdentifier;