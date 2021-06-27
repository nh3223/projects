import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { nonEquityPaymentsState } from '../../../recoil/nonEquityPayments';
import { fetchPayments, editPayment, createPayment, deletePayment } from '../../../api/nonEquityPayments';

import NonEquityPaymentsForm from './NonEquityPaymentsForm';
import NonEquityPaymentsIdentifier from './NonEquityPaymentsIdentifier';

const NonEquityPayments = () => {

  const { id } = useParams();

  const [ payments, setPayments ] = useRecoilState(nonEquityPaymentsState(id));
  
  const handleAdd = async () => {
    const defaultPayment = {
      executive: id,
      description: '',
      amount: 0,
    };
    const newPayment = await createPayment(defaultPayment);
    newPayment.amount = '';
    newPayment.completed = false;
    newPayment.error = false;
    setPayments([ ...payments, newPayment ])
  };

  const handleEdit = ({ target: { name }}) => {
    const paymentToEdit = { ...payments.filter((payment) => (payment._id === name))[0] };
    paymentToEdit.completed = false;
    setPayments(payments.map((payment) => (payment._id === name) ? paymentToEdit : payment));
  };

  const handleDelete = async (e) => {
    const paymentToDelete = { ...payments.filter((payment) => (payment._id === e.target.name))[0] };
    await deletePayment(paymentToDelete._id);
    setPayments(payments.filter((payment) => payment._id !== e.target.name));
  };

  const handleDescriptionChange = ({ target: { name, value }}) => {
    const paymentToEdit = { ...payments.filter((payment) => (payment._id) === name)[0] };
    paymentToEdit.description = value;
    setPayments(payments.map((payment) => (payment._id === name) ? paymentToEdit : payment));
  };

  const handleAmountChange = ({ target: { name, value }}) => {
    const paymentToEdit = { ...payments.filter((payment) => (payment._id) === name)[0] };
    paymentToEdit.amount = value;
    setPayments(payments.map((payment) => (payment._id === name) ? paymentToEdit : payment));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const editedPayment = { ...payments.filter((payment) => payment._id === e.target.name)[0] };
    await editPayment(editedPayment);
    editedPayment.completed = true;
    setPayments(payments.map(payment => (payment._id === e.target.name) ? editedPayment : payment));
  };
  
  useEffect(() => {
    const getPayments = async () => {
      console.log('useEffect', id);
      const paymentData = await fetchPayments(id);
      paymentData.filter((payment) => (payment.description !== '' && payment.amount !== 0));
      paymentData.map((payment) => {
        payment.completed = true;
        payment.error = false;
        return payment;
      });
      setPayments(paymentData);
    };
    if (payments.length === 0) getPayments();
  }, [id, payments.length, setPayments]);  
  
  console.log(payments);

  return (
    <>
      <h2>Non-Equity Payments</h2>
      { <button onClick={ handleAdd }>Add a Payment</button> }
      { payments.map((payment) => (
          (payment.completed)
          ? <NonEquityPaymentsIdentifier
              key={ payment._id } 
              payment={ payment } 
              handleEdit={ handleEdit }
              handleDelete={ handleDelete }
            />
          : <NonEquityPaymentsForm
              key={ payment._id }
              payment={ payment }
              handleDescriptionChange={ handleDescriptionChange }
              handleAmountChange={ handleAmountChange }
              handleSubmit={ handleSubmit }
            />
      ))}
  </>
  );
};

export default NonEquityPayments;