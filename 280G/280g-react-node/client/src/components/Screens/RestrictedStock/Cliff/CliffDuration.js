import React, { useState } from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const CliffDuration = ({ name, completed, cliffDuration, handlers: { edit, change, submit }}) => {
  
  const [ errorMessage, setErrorMessage ] = useState(null);

  const validate = (e) => {
    if (Number(cliffDuration) && Number(cliffDuration) >= 0) {
      submit(e);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid number of months');
    }
  } 
  
  return (
    <>
      <Description text="Number of months until cliff vesting occurs: " />
      { (completed)
        ? <Identifier name={ name } text={ cliffDuration } handleEdit={ edit } />
        : <InputForm name={ name } value={ cliffDuration } handleChange={ change } handleSubmit={ validate } errorMessage={ errorMessage } />
      } 
    </>
  );

};

export default CliffDuration;