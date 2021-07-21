import React from 'react';

const EditButton = ({ name, handleEdit }) => (
  <button name={ name } onClick={ handleEdit }>Edit</button>
);

export default EditButton;