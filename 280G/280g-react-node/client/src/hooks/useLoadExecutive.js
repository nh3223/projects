import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";

import { executiveNameState, executiveTitleState, startDateState, firstYearPaymentsState, basePeriodCompensationState } from '../recoil/executive';
import { fetchExecutive } from '../api/executive/fetchExecutive';

export const useLoadExecutive = (executiveId) => {
  
  const [ executiveName, setExecutiveName ] = useRecoilState(executiveNameState(executiveId));
  const [ executiveTitle, setExecutiveTitle ] = useRecoilState(executiveTitleState(executiveId));
  const setStartDate = useSetRecoilState(startDateState(executiveId));
  const setFirstYearPayments = useSetRecoilState(firstYearPaymentsState(executiveId));
  const setBasePeriodCompensation = useSetRecoilState(basePeriodCompensationState(executiveId));

  const loaded = executiveName || executiveTitle;
  const [ status, setStatus ] = useState((loaded) ? 'loaded' : 'loading');
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setExecutive = async () => {

      try {
        const executive = await fetchExecutive(executiveId);
        setExecutiveName(executive.executiveName || '');
        setExecutiveTitle(executive.executiveTitle || '');
        setStartDate(executive.startDate || '');
        setFirstYearPayments(executive.firstYearPayments || 0);
        setBasePeriodCompensation(executive.basePeriodCompensation);
        setStatus('loaded');
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (!loaded && status === 'loading') setExecutive();
  
  }, [executiveId, loaded, status, setExecutiveName, setExecutiveTitle, setStartDate, setFirstYearPayments, setBasePeriodCompensation, setStatus]);

  return { status, error };

};

