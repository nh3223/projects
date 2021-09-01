import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import {  nonEquityPaymentDescriptionState, nonEquityPaymentAmountState } from '../recoil/nonEquityPayment';
import { fetchPayment } from '../api/nonEquityPayment/fetchPayment';

const useLoadNonEquityPayment = (paymentId) => {
  
  const [ description, setDescription ] = useRecoilState(nonEquityPaymentDescriptionState(paymentId));
  const [ amount, setAmount ] = useRecoilState(nonEquityPaymentAmountState(paymentId));
  
  const [ loaded, setLoaded ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading]);

  useEffect(() => {
    
    const setPayment = async () => {

      setLoading(true);
      setLoaded(false);

      try {
        const payment = await fetchPayment(paymentId);
        setDescription(payment.description);
        setAmount(payment.amount)
        setLoaded(true);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (!description || !amount) setPayment();
  
  }, [paymentId, description, amount, setDescription, setAmount, setLoaded, setError]);

  return { loading, error };

};

export default useLoadNonEquityPayment;