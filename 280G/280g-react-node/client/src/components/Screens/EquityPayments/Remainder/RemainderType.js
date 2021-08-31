import React from 'react';

import RadioForm from '../../../Elements/RadioForm/RadioForm';

const RemainderType = ({ remainderType, handleChange }) => {
  
  const values = [
    'Monthly',
    'Quarterly',
    'Annually',
    'Other'
  ]

  return <RadioForm name="remainderType" values={ values } criteria={ remainderType } handleChange={ handleChange } /> 
  
};

export default RemainderType;