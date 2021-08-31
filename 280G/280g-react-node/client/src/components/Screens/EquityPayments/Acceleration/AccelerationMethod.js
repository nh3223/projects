import React from 'react';

import RadioForm from '../../../Elements/RadioForm/RadioForm';

const MethodForm = ({ name, accelerationMethod, handleChange }) => {
  
  const values = [
    'Next to Vest',
    'Last to Vest',
    'Proportional',
    'Other'
  ];
  
  return <RadioForm name={ name } values={ values } criteria={ accelerationMethod } handleChange={ handleChange } /> ;
    
};

export default MethodForm;