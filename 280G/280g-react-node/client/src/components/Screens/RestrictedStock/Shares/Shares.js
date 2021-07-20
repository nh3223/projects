import React, { useState } from 'react';

import SharesIdentifier from './SharesIdentifier';
import SharesForm from './SharesForm';

const Shares = ({ numberShares, completed, handlers: { change, edit, submit }}) => {

  const [ error, setError ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Number(numberShares)) {
      submit();
      setError(false);
    } else {
      setError(true)
    }  
  };

  return (
    <>
      <h2>Number of Shares:</h2>
      { (completed)
      ? <SharesIdentifier numberShares={ numberShares } handleEdit={ edit }/>
      : <SharesForm numberShares={ numberShares } handleSubmit={ handleSubmit } handleChange={ change } error={ error } />
      } 
    </>
  );

};

export default Shares;