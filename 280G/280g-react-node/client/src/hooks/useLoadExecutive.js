import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { executiveNameState, executiveTitleState } from '../recoil/executive';
import { fetchExecutive } from '../api/executive/fetchExecutive';

export const useLoadExecutive = (executiveId) => {
  
  const [ executiveName, setExecutiveName ] = useRecoilState(executiveNameState(executiveId));
  const [ executiveTitle, setExecutiveTitle ] = useRecoilState(executiveTitleState(executiveId));
  
  const loaded = executiveName || executiveTitle;
  const [ status, setStatus ] = useState((loaded) ? 'loaded' : 'loading');
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setExecutive = async () => {

      try {
        const executive = await fetchExecutive(executiveId);
        setExecutiveName(executive.executiveName);
        setExecutiveTitle(executive.executiveTitle)
        setStatus('loaded');
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (!loaded && status === 'loading') setExecutive();
  
  }, [executiveId, loaded, status, setExecutiveName, setExecutiveTitle, setStatus]);

  return { status, error };

};

