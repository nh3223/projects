import React, { useState } from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const RemainderPeriods = ({ name, cliff, completed, remainderPeriods, handlers: { edit, change, submit }}) => {
  
  const [ errorMessage, setErrorMessage ] = useState(null);

  const validate = (e) => {
    if (Number(remainderPeriods) && Number(remainderPeriods) >= 0) {
      submit(e);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid number of periods');
    }
  } 
  
  const description = (cliff) ? 'Number of periods over which the remaining shares vest: ' : 'Number of periods over which the shares vest: ';

  return (
    <>
      <Description text={ description } />
      { (completed)
        ? <Identifier name={ name } text={ remainderPeriods } handleEdit={ edit } />
        : <InputForm name={ name } value={ remainderPeriods } handleChange={ change } handleSubmit={ validate } errorMessage={ errorMessage } />
      } 
    </>
  );

};

export default RemainderPeriods;