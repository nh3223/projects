import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from "recoil";

import { nonEquityPaymentAmountState, nonEquityPaymentDescriptionState } from '../../recoil/nonEquityPayments';
import { fetchPayment } from '../../api/nonEquityPayments';

import Loading from './Loading';

const LoadNonEquityPayment = ({ paymentId }) => {
  
  const setPaymentDescription = useSetRecoilState(nonEquityPaymentDescriptionState(paymentId));
  const setPaymentAmount = useSetRecoilState(nonEquityPaymentAmountState(paymentId));
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    
    const setPaymentState = async () => {
      const { description, amount } = await fetchPayment(paymentId);
      setPaymentDescription(description);
      setPaymentAmount(amount);
      setLoading(false);
    };

    setPaymentState();

  }, [paymentId, setPaymentDescription, setPaymentAmount, setLoading ]);

  return  loading
          ? <Loading componentMessage="Payment" />
          : null

};

export default LoadNonEquityPayment;

