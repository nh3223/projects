import React, { useState, useEffect } from 'react';
import { useRecoilState, useRecoilCallback } from "recoil";

import { executiveState, executiveIdsState } from '../../recoil/executive';
import { fetchExecutives } from '../../api/executive';

// import LoadCompensation from './LoadCompensation';
import LoadNonEquityPayments from './LoadNonEquityPayments';
// import LoadOptions from './LoadOptions';
// import LoadRestrictedStock from './LoadRestrictedStock';

const LoadExecutives = ({ companyId }) => {
  
  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState);
  const [ loading, setLoading ] = useState(true);

  const setExecutive = useRecoilCallback(({ set }) => (executive) => {
    set(executiveState(executive._id), executive);
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
  
  return (
    <>
      { loading && <p>Loading Executives . . .</p> }
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



