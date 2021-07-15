import React, { useState } from 'react';

import AmountForm from './AmountForm';
import AmountIdentifier from './AmountIdentifier';

const Amount = ({ amount, completed, handlers: { edit, change, submit, deletePayment }}) => {

  const [ error, setError ] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(amount)) {
      submit();
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    completed
    ? <AmountIdentifier amount={ amount } handleEdit={ edit } handleDelete={ deletePayment }/>
    : <AmountForm amount={ amount } handleChange={ change } handleSubmit={ handleSubmit } error={ error } />
  )

};

export default Amount;