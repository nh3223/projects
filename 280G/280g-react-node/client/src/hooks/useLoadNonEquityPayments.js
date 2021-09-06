import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { nonEquityPaymentIdsState } from '../recoil/nonEquityPayment';
import { fetchPayments } from '../api/nonEquityPayment/fetchPayments';

export const useLoadNonEquityPayments = (executiveId) => {
  
  const [ nonEquityPaymentIds, setNonEquityPaymentIds ] = useRecoilState(nonEquityPaymentIdsState(executiveId));
  
  const [ loaded, setLoaded ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading]);

  useEffect(() => {
    
    const setNonEquityPayments = async () => {

      setLoading(true);
      setLoaded(false);

      try {
        const nonEquityPayments = await fetchPayments(executiveId);
        setNonEquityPaymentIds(nonEquityPayments.map((nonEquityPayment) => nonEquityPayment._id));
        setLoaded(true);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (nonEquityPaymentIds.length === 0) setNonEquityPayments();
  
  }, [nonEquityPaymentIds, executiveId, setNonEquityPaymentIds, setLoaded]);

  return { loading, error };

};