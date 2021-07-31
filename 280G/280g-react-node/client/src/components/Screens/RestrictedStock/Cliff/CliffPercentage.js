import React, { useState } from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const CliffPercentage = ({ name, completed, cliffPercentage, handlers: { edit, change, submit }}) => {
  
  const [ errorMessage, setErrorMessage ] = useState(null);

  const validate = (e) => {
    const percentage = Number(cliffPercentage);
    if (percentage && percentage >= 0 && percentage <= 100) {
      submit(e);
      setErrorMessage(null);
    } else {
      setErrorMessage('Percentage must be a number between 0 and 100, inclusive');
    }
  } 
  
  return (
    <>
      <Description text="Percentage of shares subject to cliff vesting: " />
      { (completed)
        ? <Identifier name={ name } text={ cliffPercentage } handleEdit={ edit } />
        : <InputForm name={ name } value={ cliffPercentage } handleChange={ change } handleSubmit={ validate } errorMessage={ errorMessage } />
      } 
    </>
  );

};

export default CliffPercentage;