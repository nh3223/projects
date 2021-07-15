import React from 'react';

const DescriptionIdentifier = ({ description, handleEdit }) => (
  <>
    <p>{ description }</p>
    <button onClick={ handleEdit }>Edit</button>
  </>
);

export default DescriptionIdentifier;

