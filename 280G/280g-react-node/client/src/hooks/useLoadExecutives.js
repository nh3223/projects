import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { executiveIdsState } from '../recoil/executive';
import { fetchExecutives } from '../api/executive/fetchExecutives';

export const useLoadExecutives = (companyId) => {
  
  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState(companyId));
  
  const [ loaded, setLoaded ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState('');

  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading]);

  useEffect(() => {
    
    const setExecutives = async () => {

      setLoading(true);
      setLoaded(false);

      try {
        const executives = await fetchExecutives(companyId);
        setExecutiveIds(executives.map((executive) => executive._id));
        setLoaded(true);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (executiveIds.length === 0) setExecutives();
  
  }, [executiveIds, companyId, setExecutiveIds, setLoaded]);

  return { loading, error };

};

