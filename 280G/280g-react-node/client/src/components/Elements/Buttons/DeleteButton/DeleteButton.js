import React from 'react';

const DeleteButton = ({ name, text, handleDelete }) => {
  
  const processDelete = ({ target: { name }}) => handleDelete(name);
  
  return (
    <button name={ name } onClick={ processDelete }>{ text }</button>
  );

};

export default DeleteButton;