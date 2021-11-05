import React, { useState } from 'react';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';
import { formatDollar } from '../../../../utilities/formatNumber';

const BasePeriodCompensationYear = ({ year, compensation, handleSubmit}) => {

  const [ annualCompensation, setAnnualCompensation ] = useState(compensation)
  const [ completed, setCompleted ] = useState((compensation) ? true : false)
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setAnnualCompensation(value);

  const handleEdit = () => setCompleted(false);

  const validate = async (e) => {
    const annualComp = Number(annualCompensation);
    if (annualComp && annualComp >= 0) {
      await handleSubmit(year, annualComp);
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid compensation amount');
    }
  };

  return (
    <SingleLineLayout>
      <Description text={ `${ year }: ` } />
      { completed
        ? <Identifier text={ formatDollar(annualCompensation) } handleEdit={ handleEdit } />
        : <InputForm value={ annualCompensation } handleChange={ handleChange } handleSubmit={ validate } errorMessage={ errorMessage } />
      }
    </SingleLineLayout>
  );

};

export default BasePeriodCompensationYear;