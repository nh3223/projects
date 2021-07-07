import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilCallback } from "recoil";
import { parseISO } from 'date-fns';

import { executiveState, executiveIdsState, startDateState, firstYearPaymentsState, basePeriodCompensationState } from '../../recoil/executive';
import { fetchExecutives } from '../../api/executive';
import { convertCompensation } from '../../utilities/getCompensation';

import Loading from './Loading';
import LoadNonEquityPayments from './LoadNonEquityPayments';

// import LoadOptions from './LoadOptions';
// import LoadRestrictedStock from './LoadRestrictedStock';

const LoadExecutives = ({ companyId }) => {
  
  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState);
  const [ loading, setLoading ] = useState(true);

  const setExecutive = useRecoilCallback(({ set }) => ({ _id, name, title, startDate, firstYearPayments, compensation }) => {
    set(executiveState(_id), { _id, name, title });
    set(startDateState(_id), parseISO(startDate));
    set(firstYearPaymentsState(_id), firstYearPayments);
    set(basePeriodCompensationState(_id), convertCompensation(compensation));
  }, []);

  useEffect(() => {
    
    const setExecutives = async () => {
      const executives = await fetchExecutives(companyId);
      const executiveIds = [];
      for (const executive of executives) {
        setExecutive(executive);
        executiveIds.push(executive._id);
      };
      setExecutiveIds(executiveIds);
      setLoading(false);
    };

    if (companyId && executiveIds.length === 0) setExecutives();

  }, [companyId, executiveIds.length, setExecutive, setExecutiveIds, setLoading ]);

  console.log('load executives');

  return (
    <>
      { loading && <Loading componentMessage="Executives" /> }
      { executiveIds.map((id) => (
          <div key={ id }>
            <LoadNonEquityPayments executiveId={ id } />
          </div>
        ))
      }
      </>
  );

};

export default LoadExecutives;



