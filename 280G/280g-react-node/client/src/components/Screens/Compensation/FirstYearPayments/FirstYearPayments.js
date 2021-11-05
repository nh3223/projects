import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { firstYearPaymentsState } from '../../../../recoil/executive';
import { editExecutive } from '../../../../api/executive/editExecutive';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const FirstYearPayments = ({ executiveId }) => {

  const [ firstYearPayments, setFirstYearPayments ] = useRecoilState(firstYearPaymentsState(executiveId));
  const [ payments, setPayments ] = useState(firstYearPayments);
  const [ completed, setCompleted ] = useState((firstYearPayments > 0) ? true : false);
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setPayments(value);

  const handleEdit = () => setCompleted(false);

  const validate = async () => {
    const firstPayments = Number(payments);
    if ((firstPayments && firstPayments > 0) || firstPayments === 0) {
      await editExecutive(executiveId, { firstYearPayments: payments });
      setFirstYearPayments(payments);
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid payment amount');
    }
  };

  useEffect(() => { 
    setCompleted((firstYearPayments) ? true : false);
  }, [firstYearPayments, setCompleted]);

  return (
    <SingleLineLayout>
      <Description text="Non-recurring payments in first year of employment: " />
      { completed
      ? <Identifier text={ `$${firstYearPayments}` } handleEdit={ handleEdit }/>
      : <InputForm value={ payments } handleSubmit={ validate } handleChange={ handleChange } errorMessage={ errorMessage } />
      } 
    </SingleLineLayout>
  );

};

export default FirstYearPayments;