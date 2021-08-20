import React from 'react';

import Button from '../Button/Button';

const DeleteButton = ({ name, text, handleDelete }) => <Button name={ (name) ? name : '' } text={ text } handleClick={ handleDelete } />;

export default DeleteButton;