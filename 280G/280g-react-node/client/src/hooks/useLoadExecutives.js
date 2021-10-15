import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { executiveIdsState } from '../recoil/executive';
import { fetchExecutives } from '../api/executive/fetchExecutives';

export const useLoadExecutives = (companyId) => {
  
  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState(companyId));
  
  const [ status, setStatus ] = useState((executiveIds.length === 0) ? 'loading' : 'loaded');
  const [ error, setError ] = useState('');

  useEffect(() => {
    
    const setExecutives = async () => {

      try {
        const executives = await fetchExecutives(companyId);
        setExecutiveIds(executives.map((executive) => executive._id));
        setStatus('loaded');
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (executiveIds.length === 0 && status === 'loading') setExecutives();
  
  }, [executiveIds, status, companyId, setExecutiveIds, setStatus]);

  return { status, error };

};

