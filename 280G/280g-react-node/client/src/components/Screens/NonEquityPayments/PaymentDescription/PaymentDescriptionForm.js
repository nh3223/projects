import React from 'react';

import InputForm from '../../../Elements/InputForm/InputForm';

const PaymentDescriptionForm = ({ description, handleChange, handleSubmit }) => (
  <InputForm name="description" value={ description } handleChange={ handleChange } handleSubmit={ handleSubmit } />
);

export default PaymentDescriptionForm;
