import React from 'react';

const DeleteButton = ({ name, text, handleDelete }) => (
  <button name={ name } onClick={ handleDelete }>{ text }</button>
);

export default DeleteButton;