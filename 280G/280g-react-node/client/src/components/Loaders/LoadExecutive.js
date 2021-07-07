import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { parseISO } from 'date-fns';

import { executiveState, startDateState, firstYearPaymentsState, basePeriodCompensationState } from '../../recoil/executive';
import { fetchExecutive } from '../../api/executive';
import { convertCompensation } from '../../utilities/getCompensation';

import Loading from './Loading';
import LoadNonEquityPayments from './LoadNonEquityPayments';

// import LoadOptions from './LoadOptions';
// import LoadRestrictedStock from './LoadRestrictedStock';

const LoadExecutive = ({ executiveId }) => {
  
  const [executive, setExecutive] = useRecoilState(executiveState(executiveId));
  const [ startDate, setStartDate ] = useRecoilState(startDateState(executiveId));
  const setFirstYearPayments = useSetRecoilState(firstYearPaymentsState(executiveId));
  const setBasePeriodCompensation = useSetRecoilState(basePeriodCompensationState(executiveId));
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    
    const setExecutiveState = async () => {
      console.log('insetexecutivestate');
      const executiveData = await fetchExecutive(executiveId);
      console.log('name', executiveData);
      setExecutive({ _id: executiveData._id, name: executiveData.name, title: executiveData.title });
      setStartDate(parseISO(executiveData.startDate));
      setFirstYearPayments(executiveData.firstYearPayments);
      setBasePeriodCompensation(convertCompensation(executiveData.compensation));
      setLoading(false);
    };

    if (executive._id !== executiveId) setExecutiveState();

  }, [executive._id, executiveId, setExecutive, setStartDate, setFirstYearPayments, setBasePeriodCompensation, setLoading ]);

  console.log('start date', startDate);
  console.log('load executives', executive._id, executiveId);

  return (
    <>
      { loading && <Loading componentMessage="Executive" /> }
       <LoadNonEquityPayments executiveId={ executiveId } />
    </>
  );

};

export default LoadExecutive;


