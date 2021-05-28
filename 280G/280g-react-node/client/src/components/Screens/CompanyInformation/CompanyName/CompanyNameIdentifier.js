import React from 'react';

const CompanyNameIdentifier = ({ name, handleEdit }) => (
  <>
    <h2>Company Name: { name }</h2>
    <button onClick={ handleEdit }>Edit</button>
  </>
);

export default CompanyNameIdentifier;