import React from 'react';

const RemainderIdentifier = ({ vestingDetails: { cliff, remainderType, remainderMonths }, handleEdit }) => {
  
  const vestingText = `Vesting ${ remainderType } over ${remainderMonths} months`
  const remainderText = `Remainder vesting ${ remainderType} over ${ remainderMonths} months`
  
  return (
    <>
      <p>{ cliff ? remainderText : vestingText }</p>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );

};

export default RemainderIdentifier;

