import React from 'react';
import { format } from 'date-fns';

const VestingStartDateIdentifier = ({ vestingStartDate, handleEdit }) => {
  
  const date = format(vestingStartDate, 'd MMM yyyy');
  
  return (
    <>
      <h2>Vesting Start Date: { date }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default VestingStartDateIdentifier;