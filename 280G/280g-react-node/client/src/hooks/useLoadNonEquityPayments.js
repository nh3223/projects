import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { nonEquityPaymentIdsState } from '../recoil/nonEquityPayment';
import { fetchPayments } from '../api/nonEquityPayment/fetchPayments';

export const useLoadNonEquityPayments = (executiveId) => {
  
  const [ nonEquityPaymentIds, setNonEquityPaymentIds ] = useRecoilState(nonEquityPaymentIdsState(executiveId));
  
  const [ status, setStatus ] = useState((nonEquityPaymentIds.length === 0) ? 'loading' : 'loaded');
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setNonEquityPayments = async () => {

      try {
        const nonEquityPayments = await fetchPayments(executiveId);
        setNonEquityPaymentIds(nonEquityPayments.map((nonEquityPayment) => nonEquityPayment._id));
        setStatus('loaded');
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (nonEquityPaymentIds.length === 0 && status === 'loading') setNonEquityPayments();
  
  }, [nonEquityPaymentIds, status, executiveId, setNonEquityPaymentIds, setStatus]);

  return { status, error };

};