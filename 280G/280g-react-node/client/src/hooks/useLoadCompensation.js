import { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";

import { firstYearPaymentsState, startDateState, basePeriodCompensationState } from '../recoil/compensation';
import { fetchExecutive } from '../api/executive/fetchExecutive';

export const useLoadCompensation = (executiveId) => {
  
  const [ startDate, setStartDate ] = useRecoilState(startDateState(executiveId));
  const setFirstYearPayments = useSetRecoilState(firstYearPaymentsState(executiveId));
  const [ basePeriodCompensation, setBasePeriodCompensation ] = useRecoilState(basePeriodCompensationState(executiveId));
  
  const [ loaded, setLoaded ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading]);

  useEffect(() => {
    
    const setCompensation = async () => {

      setLoading(true);
      setLoaded(false);

      try {
        const executive = await fetchExecutive(executiveId);
        setStartDate(executive.startDate);
        setFirstYearPayments(executive.firstYearPayments);
        setBasePeriodCompensation(executive.compensation);
        setLoaded(true);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (!startDate || !basePeriodCompensation) setCompensation();
  
  }, [startDate, basePeriodCompensation, executiveId, setStartDate, setFirstYearPayments, setBasePeriodCompensation, setLoaded]);

  return { loading, error };

};

