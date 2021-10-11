import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { fetchCompanies } from '../api/company/fetchCompanies';
import { companiesState } from '../recoil/company';

export const useLoadCompanies = () => {
  
  const [ companies, setCompanies ] = useRecoilState(companiesState);
  
  const [ loaded, setLoaded ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading]);

  useEffect(() => {
    
    const getCompanies = async () => {

      setLoading(true);
      setLoaded(false);

      try {            
        const companyData = await fetchCompanies();
        setCompanies(companyData)
        setLoaded(true);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (companies.length === 0) getCompanies();
  
  }, [companies, setCompanies]);

  return { loading, error };

};

