import React from 'react';

const DeleteButton = ({ name, text, handleDelete }) => {
  
  const processDelete = ({ target: { name }}) => handleDelete(name);
  
  return (
    <button aria-label={ `${text} ${name}` } onClick={ handleDelete }>{ text }</button>
  );

};

export default DeleteButton;