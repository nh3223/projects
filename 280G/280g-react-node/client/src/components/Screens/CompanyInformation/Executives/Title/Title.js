import React from 'react';

import TitleForm from './TitleForm';
import TitleIdentifier from './TitleIdentifier';

const Title = ({ title, completed, handlers: { edit, change, submit }, deleteExecutive }) => (
  completed
    ? <TitleIdentifier title={ title } handleEdit={ edit } handleDelete={ deleteExecutive } />
    : <TitleForm title={ title } handleChange={ change } handleSubmit={ submit } />
);

export default Title;