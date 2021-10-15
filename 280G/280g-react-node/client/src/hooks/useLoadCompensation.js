import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { firstYearPaymentsState, startDateState, basePeriodCompensationState } from '../recoil/compensation';
import { fetchCompensation } from '../api/compensation/fetchCompensation';

export const useLoadCompensation = (executiveId) => {
  
  const [ startDate, setStartDate ] = useRecoilState(startDateState(executiveId));
  const [ firstYearPayments, setFirstYearPayments ] = useRecoilState(firstYearPaymentsState(executiveId));
  const [ basePeriodCompensation, setBasePeriodCompensation ] = useRecoilState(basePeriodCompensationState(executiveId));

  const loaded = startDate || firstYearPayments || basePeriodCompensation.length !== 0; 
  
  const [ status, setStatus ] = useState((loaded) ? 'loaded' : 'loading');
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setCompensation = async () => {

      try {
        const compensation = await fetchCompensation(executiveId);
        setStartDate(compensation.startDate);
        setFirstYearPayments(compensation.firstYearPayments);
        setBasePeriodCompensation(compensation.basePeriodCompensation);
        setStatus('loaded');
      } 
      
      catch (e) {
        setError(e.message)
      }

    };

    if (!loaded && status === 'loading') setCompensation();
  
  }, [loaded, status, executiveId, setStartDate, setFirstYearPayments, setBasePeriodCompensation, setStatus]);

  return { status, error };

};

