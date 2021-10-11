import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { equityGrantIdsState } from '../recoil/equityGrant';
import { fetchGrants } from '../api/equityGrant/fetchGrants';

export const useLoadGrants = (executiveId) => {
  
  const [ equityGrantIds, setEquityGrantIds ] = useRecoilState(equityGrantIdsState(executiveId));
  
  const [ loaded, setLoaded ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading]);

  useEffect(() => {
    
    const setEquityGrants = async () => {

      setLoading(true);
      setLoaded(false);

      try {
        const equityGrants = await fetchGrants(executiveId);
        setEquityGrantIds(equityGrants.map((equityGrant) => equityGrant._id));
        setLoaded(true);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (equityGrantIds.length === 0) setEquityGrants();
  
  }, [equityGrantIds, executiveId, setEquityGrantIds, setLoaded]);

  return { loading, error };

};