import React from 'react';

import Description from '../../../Elements/Description/Description';
import PaymentDescriptionForm from './PaymentDescriptionForm';
import PaymentDescriptionIdentifier from './PaymentDescriptionIdentifier';

const PaymentDescription = ({ description, completed, handlers: { edit, change, submit } }) => (
  <>
    <Description text="Payment Description: " />
    { completed
      ? <PaymentDescriptionIdentifier description={ description } handleEdit={ edit } />
      : <PaymentDescriptionForm description={ description } handleChange={ change } handleSubmit={ submit } />
    }
  </>
);

export default PaymentDescription;