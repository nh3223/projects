import React from 'react';

const AnnualCompensationIdentifier = ({ compensationYear, handleEdit }) => {
  
  const compensation = `$${compensationYear.compensation}`;

  return (
    <>
      <h2>{ compensationYear }{ compensation }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default AnnualCompensationIdentifier;