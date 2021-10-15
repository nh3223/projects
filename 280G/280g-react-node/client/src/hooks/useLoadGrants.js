import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { equityGrantIdsState } from '../recoil/equityGrant';
import { fetchGrants } from '../api/equityGrant/fetchGrants';

export const useLoadGrants = (executiveId) => {
  
  const [ equityGrantIds, setEquityGrantIds ] = useRecoilState(equityGrantIdsState(executiveId));
  
  const [ status, setStatus ] = useState((equityGrantIds.length === 0) ? 'loading' : 'loaded');
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setEquityGrants = async () => {

      try {
        const equityGrants = await fetchGrants(executiveId);
        setEquityGrantIds(equityGrants.map((equityGrant) => equityGrant._id));
        setStatus('loaded');
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (equityGrantIds.length === 0 && status === 'loading') setEquityGrants();
  
  }, [equityGrantIds, status, executiveId, setEquityGrantIds, setStatus]);

  return { status, error };

};