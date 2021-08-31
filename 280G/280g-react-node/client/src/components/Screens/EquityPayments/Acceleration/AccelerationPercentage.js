import React, { useState } from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const AccelerationPercentage = ({ name, completed, accelerationPercentage, handlers: { edit, change, submit }}) => {
  
  const [ errorMessage, setErrorMessage ] = useState(null);

  const validate = (e) => {
    const percentage = Number(accelerationPercentage);
    if (percentage && percentage >= 0 && percentage <= 100) {
      submit(e);
      setErrorMessage(null);
    } else {
      setErrorMessage('Percentage must be a number between 0 and 100, inclusive');
    }
  } 
  
  console.log('accelerationpercentage', accelerationPercentage);

  return (
    <>
      <Description text="Percentage of unvested shares accelerating: " />
      { (completed)
        ? <Identifier name={ name } text={ accelerationPercentage } handleEdit={ edit } />
        : <InputForm name={ name } value={ accelerationPercentage } handleChange={ change } handleSubmit={ validate } errorMessage={ errorMessage } />
      } 
    </>
  );

};

export default AccelerationPercentage;