import React from 'react';

import Description from '../../../../Elements/Description/Description';
import TitleForm from './TitleForm';
import TitleIdentifier from './TitleIdentifier';

const Title = ({ title, completed, handlers: { edit, change, submit, handleDelete }}) => (
  <>
    <Description text="Title: " />
    { completed
      ? <TitleIdentifier title={ title } handleEdit={ edit } handleDelete={ handleDelete } />
      : <TitleForm title={ title } handleChange={ change } handleSubmit={ submit } />
    }
  </>

);

export default Title;