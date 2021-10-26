import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { nonEquityPaymentAmountState } from '../../../../recoil/nonEquityPayment';
import { editPayment } from '../../../../api/nonEquityPayment/editPayment';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DeleteButton from '../../../Elements/Buttons/DeleteButton/DeleteButton';
import InputForm from '../../../Elements/Forms/InputForm/InputForm';

const PaymentAmount = ({ paymentId, handleDelete }) => {
  
  const [ paymentAmount, setPaymentAmount ] = useRecoilState(nonEquityPaymentAmountState(paymentId));
  const [ payment, setPayment ] = useState(paymentAmount);
  const [ completed, setCompleted ] = useState((paymentAmount) ? true : false)
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChange = ({ target: { value }}) => setPayment(value);

  const handleEdit = () => setCompleted(false)

  const validate = async (e) => {
    const amount = Number(payment);
    if (amount && amount >= 0) {
      await editPayment(paymentId, { amount });
      setPaymentAmount(amount);
      setCompleted(true);
      setErrorMessage(null);
    } else {
      setErrorMessage('Please enter a valid payment amount');
    }
  };
  useEffect(() => {
    setCompleted((paymentAmount) ? true : false)
    setPayment(paymentAmount)
  }, [paymentAmount, setCompleted, setPayment]);
  
  return (
    <SingleLineLayout>
      <Description text="Payment Amount: " />
      { completed
        ? <>
            <Identifier text={ `$${paymentAmount}` } handleEdit={ handleEdit } />
            <DeleteButton name={ `Delete Payment ${paymentId}` } text="Delete Payment" handleDelete={ handleDelete } />
          </>
        : <InputForm value={ payment } handleChange={ handleChange } handleSubmit={ validate } errorMessage={ errorMessage }/>
      }
    </SingleLineLayout>
  );

};

export default PaymentAmount;