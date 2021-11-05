import React from 'react';

import Button from '../Button/Button';

const EditButton = ({ name, handleEdit }) => <Button name={ (name) ? name : '' } text="Edit" size={ 1 } handleClick={ handleEdit } />;

export default EditButton;