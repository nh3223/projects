import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from "recoil";

import { executiveNameState, executiveTitleState } from '../../recoil/executive';
import { basePeriodCompensationState, firstYearPaymentsState, startDateState } from '../../recoil/compensation';
import { fetchExecutive } from '../../api/executive';
import { convertCompensation } from '../../utilities/compensation/compensation';

import Loading from './Loading';
import LoadNonEquityPayments from './LoadNonEquityPayments';
import LoadOptions from './LoadOptions';
import LoadRestrictedStock from './LoadRestrictedStock';

const LoadExecutive = ({ executiveId }) => {
  
  const setExecutiveName = useSetRecoilState(executiveNameState(executiveId));
  const setExecutiveTitle = useSetRecoilState(executiveTitleState(executiveId));
  const setStartDate = useSetRecoilState(startDateState(executiveId));
  const setFirstYearPayments = useSetRecoilState(firstYearPaymentsState(executiveId));
  const setBasePeriodCompensation = useSetRecoilState(basePeriodCompensationState(executiveId));
  
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setExecutiveState = async () => {
      
      setLoading(true);
      
      try {      
        const { executiveName, executiveTitle, startDate, firstYearPayments, compensation} = await fetchExecutive(executiveId);
        setExecutiveName(executiveName);
        setExecutiveTitle(executiveTitle);
        setStartDate((startDate) ? startDate : '');
        setFirstYearPayments((firstYearPayments) ? firstYearPayments : '');
        setBasePeriodCompensation(convertCompensation(compensation))
        setLoading(false);
      }

      catch (e) {
        setError(e.message);
      }

    };

    setExecutiveState();

  }, [executiveId, setExecutiveName, setExecutiveTitle, setStartDate, setFirstYearPayments, setBasePeriodCompensation, setLoading ]);

  return (
    <>
      { loading ? <Loading componentMessage={ `Executive ${executiveId}` } errorMessage={ error } /> : null }
       <LoadNonEquityPayments executiveId={ executiveId } />
       <LoadOptions executiveId={ executiveId } />
       <LoadRestrictedStock executiveId={ executiveId } />
    </>
  );

};

export default LoadExecutive;