import React, { useState } from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const BasePeriodCompensationYear = ({ completed, year, compensation, handlers: { change, edit, submit }}) => {

  const [ errorMessage, setErrorMessage ] = useState({});

  const validate = async (e) => {
    if (Number(compensation) && Number(compensation) >= 0) {
      await submit(e);
      setErrorMessage({ ...errorMessage, [year]: null });
    } else {
      setErrorMessage({ ...errorMessage, [year]: 'Please enter a valid compensation amount' });
    }
  };


  return (
    <>
      <Description text={ `${ year }: ` } />
      { completed
        ? <Identifier name={ year } text={ `$${ compensation}` } handleEdit={ edit } />
        : <InputForm name={ year } value={ compensation } handleChange={ change } handleSubmit={ validate } errorMessage={ errorMessage[year] } />
      }
    </>
  );

};

export default BasePeriodCompensationYear;