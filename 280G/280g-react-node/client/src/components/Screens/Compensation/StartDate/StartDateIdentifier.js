import React from 'react';
import { format } from 'date-fns';

const StartDateIdentifier = ({ startDate, handleEdit }) => {
  
  const date = format(startDate, 'd MMM yyyy');
  
  return (
    <>
      <h2>Transaction Date: { date }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default StartDateIdentifier;