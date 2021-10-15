import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import {  nonEquityPaymentDescriptionState, nonEquityPaymentAmountState } from '../recoil/nonEquityPayment';
import { fetchPayment } from '../api/nonEquityPayment/fetchPayment';

export const useLoadNonEquityPayment = (paymentId) => {
  
  const [ description, setDescription ] = useRecoilState(nonEquityPaymentDescriptionState(paymentId));
  const [ amount, setAmount ] = useRecoilState(nonEquityPaymentAmountState(paymentId));
  
  const loaded = description || amount;
  const [ status, setStatus ] = useState((loaded) ? 'loaded' : 'loading');
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setPayment = async () => {

      try {
        const payment = await fetchPayment(paymentId);
        setDescription(payment.description);
        setAmount(payment.amount)
        setStatus('loaded');
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (!loaded && status === 'loading') setPayment();
  
  }, [paymentId, loaded, status, setDescription, setAmount, setStatus, setError]);

  return { status, error };

};