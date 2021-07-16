import React from 'react';

const NameIdentifier = ({ name, handleEdit }) => (
  <>
    <p>{ name }</p>
    <button onClick={ handleEdit }>Edit</button>
  </>
);

export default NameIdentifier;