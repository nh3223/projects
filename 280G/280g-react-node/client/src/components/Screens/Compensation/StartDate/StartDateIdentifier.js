import React from 'react';
import { format } from 'date-fns';

const StartDateIdentifier = ({ startDate, handleEdit }) => {
  
  const formattedDate = format(startDate, 'd MMM yyyy');
  
  return (
    <>
      <h2>Employment Start Date: { formattedDate }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default StartDateIdentifier;