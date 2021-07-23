import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { nonEquityPaymentsState } from '../../recoil/nonEquityPayments';
import { fetchPayment } from '../../api/nonEquityPayments';

import Loading from './Loading';

const LoadNonEquityPayment = ({ paymentId }) => {
  
  const [ payment, setPayment ] = useRecoilState(nonEquityPaymentsState(paymentId));
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    
    const setPaymentState = async () => {
      const { _id, description, amount } = await fetchPayment(paymentId);
      setPayment({ _id, description, amount });
      setLoading(false);
    };

    if (payment._id !== paymentId) setPaymentState();

  }, [payment._id, paymentId, setPayment, setLoading ]);

  return loading && <Loading componentMessage="Payment" />

};

export default LoadNonEquityPayment;

