import React from 'react';

import Description from '../../../../Elements/Description/Description';
import Identifier from '../../../../Elements/Identifier/Identifier';
import InputForm from '../../../../Elements/InputForm/InputForm';

const Name = ({ name, executiveName, completed, handlers: { edit, change, submit }}) => (
  <>
    <Description text="Name: " />
    { completed
      ? <Identifier name={ name } text={ executiveName } handleEdit={ edit } />
      : <InputForm name={ name } value={ executiveName } handleChange={ change } handleSubmit={ submit } />
    }
  </>
);

export default Name;