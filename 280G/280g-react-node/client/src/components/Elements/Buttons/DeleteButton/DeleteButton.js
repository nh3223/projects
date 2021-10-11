import React from 'react';

import Button from '../Button/Button';

const DeleteButton = ({ name, id, text, handleDelete }) => <Button name={ name } id={ id } text={ text } handleClick={ handleDelete } />;

export default DeleteButton;