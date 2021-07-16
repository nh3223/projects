import React from 'react';

import NameForm from './NameForm';
import NameIdentifier from './NameIdentifier';

const Name = ({ name, completed, handlers: { edit, change, submit }}) => (
  completed
    ? <NameIdentifier name={ name } handleEdit={ edit } />
    : <NameForm name={ name } handleChange={ change } handleSubmit={ submit } />
);

export default Name;