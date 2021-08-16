import React from 'react';

const AddButton = ({ name, text, handleAdd }) => (
  <button name={ name } onClick={ handleAdd }>{ text }</button>
);

export default AddButton;