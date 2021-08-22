import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from "recoil";

import { nonEquityPaymentAmountState, nonEquityPaymentDescriptionState } from '../../recoil/nonEquityPayments';
import { fetchPayment } from '../../api/nonEquityPayments';

import Loading from './Loading';

const LoadNonEquityPayment = ({ paymentId }) => {
  
  const setPaymentDescription = useSetRecoilState(nonEquityPaymentDescriptionState(paymentId));
  const setPaymentAmount = useSetRecoilState(nonEquityPaymentAmountState(paymentId));
  
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setPaymentState = async () => {

      setLoading(true);

      try {
        const { description, amount } = await fetchPayment(paymentId);
        setPaymentDescription(description);
        setPaymentAmount(amount);
        setLoading(false);
      }

      catch (e) {
        setError(e.message);
      }

    };

    setPaymentState();

  }, [paymentId, setPaymentDescription, setPaymentAmount, setLoading, setError ]);

  return  loading
          ? <Loading componentMessage="Payment" errorMessage={ error } />
          : null

};

export default LoadNonEquityPayment;

