import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { nonEquityPaymentDescriptionState } from '../../../../recoil/nonEquityPayment';
import { editPayment } from '../../../../api/nonEquityPayment/editPayment';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const PaymentDescription = ({ paymentId }) => {

  const [ description, setdescription ] = useRecoilState(nonEquityPaymentDescriptionState(paymentId));
  const [ completed, setCompleted ] = useState((description) ? true : false)

  const handleChange = ({ target: { value }}) => setdescription(value);

  const handleEdit = () => setCompleted(false);

  const handleSubmit = async () => {
    await editPayment(paymentId, { description });
    setCompleted(true);
  }

  return (
    <SingleLineLayout>
      <Description text="Payment Description: " />
      { completed
        ? <Identifier text={ description } handleEdit={ handleEdit } />
        : <InputForm value={ description } handleChange={ handleChange } handleSubmit={ handleSubmit } />
      }
    </SingleLineLayout>

  );

};

export default PaymentDescription;