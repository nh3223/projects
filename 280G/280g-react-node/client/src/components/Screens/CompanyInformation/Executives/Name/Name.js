import React from 'react';

import Description from '../../../../Elements/Description/Description';
import NameForm from './NameForm';
import NameIdentifier from './NameIdentifier';

const Name = ({ name, completed, handlers: { edit, change, submit }}) => (
  <>
    <Description text="Name: " />
    { completed
      ? <NameIdentifier name={ name } handleEdit={ edit } />
      : <NameForm name={ name } handleChange={ change } handleSubmit={ submit } />
    }
  </>
);

export default Name;