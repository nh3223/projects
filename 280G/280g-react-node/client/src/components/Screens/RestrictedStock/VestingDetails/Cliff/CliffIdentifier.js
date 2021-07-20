import React from 'react';

const CliffIdentifier = ({ vestingDetails, handleEdit }) => (
  <>
    { vestingDetails.cliff && <p>{ `Cliff: ${vestingDetails.cliffPercentage} at ${vestingDetails.cliffMonths}` }</p> }
    <button onClick={ handleEdit }>Edit</button>
  </>
);

export default CliffIdentifier;

