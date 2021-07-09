import React from 'react';
import { format } from 'date-fns';

const GrantDateIdentifier = ({ grantDate, toggleEdit }) => {
  
  const formattedDate = format(grantDate, 'd MMM yyyy');
  
  return (
    <>
      <h2>Employment Start Date: { formattedDate }</h2>
      <button onClick={ toggleEdit }>Edit</button>
    </>
  );
};

export default GrantDateIdentifier;