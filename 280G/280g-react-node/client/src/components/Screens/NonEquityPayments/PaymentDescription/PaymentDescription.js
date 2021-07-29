import React from 'react';

import Description from '../../../Elements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import InputForm from '../../../Elements/InputForm/InputForm';

const PaymentDescription = ({ description, completed, handlers: { edit, change, submit } }) => (
  <>
    <Description text="Payment Description: " />
    { completed
      ? <Identifier name="paymentDescription" text={ description } handleEdit={ edit } />
      : <InputForm name="paymentDescription" value={ description } handleChange={ change } handleSubmit={ submit } />
    }
  </>
);

export default PaymentDescription;