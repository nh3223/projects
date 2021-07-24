import React from 'react';

const BasePeriodCompensationIdentifier = ({ year, compensation, handleEdit }) => (
  <>
    <h3>{ year }{ `$${compensation}` }</h3>
    <button name={ year } onClick={ handleEdit }>Edit</button>
  </>
);

export default BasePeriodCompensationIdentifier;

