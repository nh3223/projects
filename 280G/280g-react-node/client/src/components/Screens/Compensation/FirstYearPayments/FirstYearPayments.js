import React, { useState } from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const FirstYearPayments = ({ firstYearPayments, completed, handlers: { change, edit, submit }}) => {

  const [ errorMessage, setErrorMessage ] = useState(null);

  const validate = async (e) => {
    if (Number(firstYearPayments) && Number(firstYearPayments) > 0) {
      await submit(e);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid payment amount');
    }
  };

  return (
    <>
      <Description text="Non-recurring payments in first year of employment: " />
      { completed
      ? <Identifier name="firstYearPayments" text={ `$${firstYearPayments}` } handleEdit={ edit }/>
      : <InputForm name="firstYearPayments" value={ firstYearPayments } handleSubmit={ validate } handleChange={ change } errorMessage={ errorMessage } />
      } 
    </>
  );

};

export default FirstYearPayments;