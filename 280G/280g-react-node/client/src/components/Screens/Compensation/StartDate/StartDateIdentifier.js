import React from 'react';
import { format } from 'date-fns';

const StartDateIdentifier = ({ date, handleEdit }) => {
  
  const formattedDate = format(date, 'd MMM yyyy');
  
  return (
    <>
      <h2>Employment Start Date: { formattedDate }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default StartDateIdentifier;