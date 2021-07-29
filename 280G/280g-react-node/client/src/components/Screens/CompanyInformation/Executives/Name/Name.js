import React from 'react';

import Description from '../../../../Elements/Description/Description';
import Identifier from '../../../../Elements/Identifier/Identifier';
import InputForm from '../../../../Elements/InputForm/InputForm';

const Name = ({ name, completed, handlers: { edit, change, submit }}) => (
  <>
    <Description text="Name: " />
    { completed
      ? <Identifier name="executiveName" text={ name } handleEdit={ edit } />
      : <InputForm name="executiveName" value={ name } handleChange={ change } handleSubmit={ submit } />
    }
  </>
);

export default Name;