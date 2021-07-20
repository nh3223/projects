import React from 'react';

const SharesIdentifier = ({ numberShares, handleEdit }) => (
  <>
    <h2>{ numberShares }</h2>
    <button onClick={ handleEdit }>Edit</button>
  </>
);

export default SharesIdentifier;