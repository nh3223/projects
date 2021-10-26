import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { nonEquityPaymentDescriptionState } from '../../../../recoil/nonEquityPayment';
import { editPayment } from '../../../../api/nonEquityPayment/editPayment';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const PaymentDescription = ({ paymentId }) => {

  const [ paymentDescription, setPaymentDescription ] = useRecoilState(nonEquityPaymentDescriptionState(paymentId));
  const [ description, setDescription ] = useState(paymentDescription);
  const [ completed, setCompleted ] = useState((description) ? true : false)

  const handleChange = ({ target: { value }}) => setDescription(value);

  const handleEdit = () => setCompleted(false);

  const handleSubmit = async () => {
    await editPayment(paymentId, { description });
    setPaymentDescription(description);
    setCompleted(true);
  };

  useEffect(() => {
    setCompleted((paymentDescription) ? true : false)
  }, [paymentDescription, setCompleted]);

  return (
    <SingleLineLayout>
      <Description text="Payment Description: " />
      { completed
        ? <Identifier text={ paymentDescription } handleEdit={ handleEdit } />
        : <InputForm value={ description } handleChange={ handleChange } handleSubmit={ handleSubmit } />
      }
    </SingleLineLayout>

  );

};

export default PaymentDescription;