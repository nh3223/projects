import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { executiveIdsState } from '../../recoil/executive';
import { fetchExecutives } from '../../api/executive';

import LoadExecutive from './LoadExecutive';
import Loading from './Loading';

const LoadExecutives = ({ companyId }) => {
  
  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState(companyId));
  
  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

   useEffect(() => {
    
    const getExecutiveIds = async () => {
      
      setLoading(true);

      try {      
        const executives = await fetchExecutives(companyId);
        setExecutiveIds(executives.map((executive) => executive._id));
        setLoading(false);
      }

      catch (e) {
        setError(e.message);
      }

    };

    if (executiveIds.length === 0) getExecutiveIds();

  }, [companyId, error, executiveIds.length, setExecutiveIds, setLoading, setError ]);

  return (loading)
    ? <Loading componentMessage="Executives . . ." errorMessage={ error } />
    : executiveIds.map((executiveId) => <LoadExecutive key={ executiveId } executiveId={ executiveId } />)

};

export default LoadExecutives;