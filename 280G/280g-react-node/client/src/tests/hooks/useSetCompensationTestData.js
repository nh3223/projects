import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { basePeriodCompensationState, firstYearPaymentsState, startDateState } from '../../recoil/compensation';

export const useSetCompensationTestData = ({ executiveId=1, startDate='', firstYearPayments='', basePeriodCompensation=[] }) => {

  const setStartDate = useSetRecoilState(startDateState(executiveId));
  const setFirstYearPayments = useSetRecoilState(firstYearPaymentsState(executiveId));
  const setBasePeriodCompensation = useSetRecoilState(basePeriodCompensationState(executiveId));

  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setStartDate(startDate);
    setFirstYearPayments(firstYearPayments);
    setBasePeriodCompensation(basePeriodCompensation);
    setLoaded(true);
  }, [startDate, firstYearPayments, basePeriodCompensation, setStartDate, setFirstYearPayments, setBasePeriodCompensation, setLoaded]);

  return loading;

};