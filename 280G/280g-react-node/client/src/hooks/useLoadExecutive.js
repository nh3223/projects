import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { executiveNameState, executiveTitleState } from '../recoil/executive';
import { fetchExecutive } from '../api/executive/fetchExecutive';

const useLoadExecutive = (executiveId) => {
  
  const [ executiveName, setExecutiveName ] = useRecoilState(executiveNameState(executiveId));
  const [ executiveTitle, setExecutiveTitle ] = useRecoilState(executiveTitleState(executiveId));
  
  const [ loaded, setLoaded ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading]);

  useEffect(() => {
    
    const setExecutive = async () => {

      setLoading(true);
      setLoaded(false);

      try {
        const executive = await fetchExecutive(executiveId);
        setExecutiveName(executive.executiveName);
        setExecutiveTitle(executive.executiveTitle)
        setLoaded(true);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (!executiveName || !executiveTitle) setExecutive();
  
  }, [executiveName, executiveTitle, executiveId, setExecutiveName, setExecutiveTitle, setLoaded]);

  return { loading, error };

};

export default useLoadExecutive;