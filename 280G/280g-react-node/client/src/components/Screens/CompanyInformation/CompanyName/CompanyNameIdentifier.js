import React from 'react';

const CompanyNameIdentifier = ({ companyName, handleEdit }) => (
  <>
    <h2>Company Name: { companyName }</h2>
    <button onClick={ handleEdit }>Edit</button>
  </>
);

export default CompanyNameIdentifier;