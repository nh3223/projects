import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { firstYearPaymentsState } from '../../../../recoil/executive';
import { editExecutive } from '../../../../api/executive/editExecutive';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const FirstYearPayments = ({ executiveId }) => {

  const [ firstYearPayments, setFirstYearPayments ] = useRecoilState(firstYearPaymentsState(executiveId));
  const [ completed, setCompleted ] = useState((firstYearPayments) ? true : false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setFirstYearPayments(value);

  const handleEdit = () => setCompleted(false);

  const validate = async (e) => {
    const payments = Number(firstYearPayments);
    if (payments && payments >= 0) {
      await editExecutive(executiveId, { firstYearPayments: payments });
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid payment amount');
    }
  };

  return (
    <SingleLineLayout>
      <Description text="Non-recurring payments in first year of employment: " />
      { completed
      ? <Identifier text={ `$${firstYearPayments}` } handleEdit={ handleEdit }/>
      : <InputForm value={ firstYearPayments } handleSubmit={ validate } handleChange={ handleChange } errorMessage={ errorMessage } />
      } 
    </SingleLineLayout>
  );

};

export default FirstYearPayments;