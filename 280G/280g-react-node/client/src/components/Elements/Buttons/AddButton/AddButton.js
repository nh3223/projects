import React from 'react';

import Button from '../Button/Button';

const AddButton = ({ name, text, handleAdd }) => <Button name={ (name) ? name : '' } text={ text } handleClick={ handleAdd } />;

export default AddButton;