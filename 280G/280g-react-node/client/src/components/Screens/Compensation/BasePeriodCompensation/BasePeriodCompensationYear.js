import React, { useState } from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const BasePeriodCompensationYear = ({ basePeriodYear, handlers: { change, edit, submit }}) => {

  const [ errorMessage, setErrorMessage ] = useState({});

  const validate = async (e) => {
    if (Number(basePeriodYear.compensation) && Number(basePeriodYear.compensation) >= 0) {
      await submit(e);
      setErrorMessage({ ...errorMessage, [basePeriodYear.year]: null });
    } else {
      setErrorMessage({ ...errorMessage, [basePeriodYear.year]: 'Please enter a valid compensation amount' });
    }
  };


  return (
    <>
      <Description text={ `${basePeriodYear.year}: ` } />
      { basePeriodYear.completed
        ? <Identifier name={ basePeriodYear.index } text={ `$${basePeriodYear.compensation}` } handleEdit={ edit } />
        : <InputForm name={ basePeriodYear.index } value={ basePeriodYear.compensation } handleChange={ change } handleSubmit={ validate } errorMessage={ errorMessage[basePeriodYear.year] } />
      }
    </>
  );

};

export default BasePeriodCompensationYear;