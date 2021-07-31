import React from 'react';

import Description from '../../../../Elements/Description/Description';
import Identifier from '../../../../Elements/Identifier/Identifier';
import DeleteButton from '../../../../Elements/DeleteButton/DeleteButton';
import InputForm from '../../../../Elements/InputForm/InputForm';


const Title = ({ name, title, completed, handlers: { edit, change, submit, handleDelete }}) => (
  <>
    <Description text="Title: " />
    { completed
      ? <>
          <Identifier name={ name } text={ title } handleEdit={ edit } />
          <DeleteButton name="deleteExecutive" text="Delete Executive" handleDelete={ handleDelete } />
        </>
      : <InputForm name={ name } value={ title } handleChange={ change } handleSubmit={ submit } />
    }
  </>

);

export default Title;