import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { nonEquityPaymentAmountState } from '../../../../recoil/nonEquityPayment';
import { editPayment } from '../../../../api/nonEquityPayment/editPayment';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DeleteButton from '../../../Elements/Buttons/DeleteButton/DeleteButton';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const PaymentAmount = ({ paymentId, deletePayment }) => {
  
  const [ paymentAmount, setPaymentAmount ] = useRecoilState(nonEquityPaymentAmountState(paymentId));
  const [ completed, setCompleted ] = useState((paymentAmount) ? true : false)
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setPaymentAmount(value);

  const handleEdit = () => setCompleted(false)

  const validate = async (e) => {
    const amount = Number(paymentAmount);
    if (amount && amount >= 0) {
      await editPayment(paymentId, { amount });
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid payment amount');
    }
  };
  
  return (
    <SingleLineLayout>
      <Description text="Payment Amount: " />
      { completed
        ? <>
            <Identifier text={ paymentAmount } handleEdit={ handleEdit } />
            <DeleteButton name="deletePayment" text="Delete Payment" handleDelete={ deletePayment } />
          </>
        : <InputForm value={ paymentAmount } handleChange={ handleChange } handleSubmit={ validate } errorMessage={ errorMessage }/>
      }
    </SingleLineLayout>
  );

};

export default PaymentAmount;