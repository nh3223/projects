import React, { useState } from 'react';

import DescriptionForm from './DescriptionForm';
import DescriptionIdentifier from './DescriptionIdentifier';

const Description = ({ description, completed, handlers: { edit, change, submit } }) => {

  const [ error, setError ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description !== '') {
      submit();
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    completed
    ? <DescriptionIdentifier description={ description } handleEdit={ edit } />
    : <DescriptionForm description={ description } handleChange={ change } handleSubmit={ handleSubmit } error={ error } />
  )

};

export default Description;