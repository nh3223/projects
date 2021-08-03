import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { executiveState } from '../../recoil/executive';
import { fetchExecutive } from '../../api/executive';

import Loading from './Loading';
import LoadNonEquityPayments from './LoadNonEquityPayments';
import { convertCompensation } from '../../utilities/getCompensation';

// import LoadOptions from './LoadOptions';
import LoadRestrictedStock from './LoadRestrictedStock';

const LoadExecutive = ({ executiveId }) => {
  
  const [ executive, setExecutive ] = useRecoilState(executiveState(executiveId));
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    
    const setExecutiveState = async () => {
      const executiveData = await fetchExecutive(executiveId);
      setExecutive({
        _id: executiveData._id,
        executiveName: executiveData.executiveName,
        title: executiveData.title,
        startDate: executiveData.startDate || '',
        firstYearPayments: executiveData.firstYearPayments || '',
        basePeriodCompensation: convertCompensation(executiveData.compensation)
      });
      setLoading(false);
    };

    if (executive._id !== executiveId) setExecutiveState();

  }, [executive._id, executiveId, setExecutive, setLoading ]);

  return (
    <>
      { loading && <Loading componentMessage="Executive" /> }
       <LoadNonEquityPayments executiveId={ executiveId } />
       <LoadRestrictedStock executiveId={ executiveId } />
    </>
  );

};

export default LoadExecutive;


