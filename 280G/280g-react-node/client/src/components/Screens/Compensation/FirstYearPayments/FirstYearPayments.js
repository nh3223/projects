import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import FirstYearPaymentsIdentifier from './FirstYearPaymentsIdentifier';
import FirstYearPaymentsForm from './FirstYearPaymentsForm';
import { firstYearPaymentsState } from '../../../../recoil/atoms/Compensation';

const FirstYearPayments = ({ id }) => {

  const [ firstYearPayments, setFirstYearPayments ] = useRecoilState(firstYearPaymentsState);
  const [ payments, setPayments ] = useState(firstYearPayments[id] || '');
  const [ completed, setCompleted ] = useState((payments) ? true : false);
  const [ error, setError ] = useState(false);

  const handleEdit = () => {
    setCompleted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const startYearPayments = Number(payments);
    if (startYearPayments) {
      setFirstYearPayments({...firstYearPayments, [id]: startYearPayments });
      setError(false);
      setCompleted(true); 
    } else {
      setError(true);
    }
  };

  const handleChange = (e) => setPayments(e.target.value);

  console.log(payments);

  return (
    <>
      { completed
      ? <FirstYearPaymentsIdentifier payments={ payments } handleEdit={ handleEdit }/>
      : <FirstYearPaymentsForm payments={ payments } handleSubmit={ handleSubmit } handleChange={ handleChange } error={ error } />
      } 
    </>
  );

};

export default FirstYearPayments;