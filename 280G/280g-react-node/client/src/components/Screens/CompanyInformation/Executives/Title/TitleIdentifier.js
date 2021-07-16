import React from 'react';

const TitleIdentifier = ({ title, handleEdit, handleDelete }) => (
  <>
    <p>{ title }</p>
    <button onClick={ handleEdit }>Edit</button>
    <button onClick={ handleDelete }>Delete Executive</button>
  </>
);

export default TitleIdentifier;