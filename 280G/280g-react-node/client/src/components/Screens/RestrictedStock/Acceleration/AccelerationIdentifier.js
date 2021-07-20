import React from 'react';

const AccelerationIdentifier = ({ percentageAcceleration, accelerationMethod, handlers: { percentageEdit, methodEdit } }) => (
  <>
    <p>Percentage of Shares Accelerating: { percentageAcceleration }</p>
    <button onClick={ percentageEdit }>Edit</button>
    { accelerationMethod && 
      <>
        <p>{ `Acceleration Method: ${accelerationMethod}` }</p>
        <button onClick={ methodEdit }>Edit</button>
      </>
    }
  </>
);

export default AccelerationIdentifier;