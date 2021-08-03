import React, { useState } from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const TransactionPrice = ({ name, transactionPrice, completed, handlers: { change, edit, submit }}) => {

  const [ errorMessage, setErrorMessage ] = useState(null);

  const validate = (e) => {
    if (Number(transactionPrice) && Number(transactionPrice) > 0) {
      submit(e);
      setErrorMessage(null)
    } else {
      setErrorMessage('Please enter a valid per share price')
    }
  };
  
  return (
    <>
      <Description text="Transaction Price per Share: " />
      { (completed)
      ? <Identifier name={ name } text={ transactionPrice } handleEdit={ edit }/>
      : <InputForm name={ name } value={ transactionPrice } handleSubmit={ validate } handleChange={ change } errorMessage={ errorMessage }/>
      } 
    </>
  );

};

export default TransactionPrice;