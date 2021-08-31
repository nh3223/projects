import React, { useState } from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const Shares = ({ name, numberShares, completed, handlers: { change, edit, submit }}) => {

  const [ errorMessage, setErrorMessage ] = useState(null);

  const validate = async (e) => {
     if (Number(numberShares) && Number(numberShares) > 0) {
      submit(e);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid number of shares')
    }  
  };

  return (
    <>
      <Description text="Number of Shares: " />
      { (completed)
      ? <Identifier name={ name } text={ numberShares } handleEdit={ edit }/>
      : <InputForm name={ name } value={ numberShares } handleSubmit={ validate } handleChange={ change } errorMessage={ errorMessage } />
      } 
    </>
  );

};

export default Shares;