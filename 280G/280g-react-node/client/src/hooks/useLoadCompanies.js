import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { fetchCompanies } from '../api/company/fetchCompanies';
import { companiesState } from '../recoil/company';

export const useLoadCompanies = () => {
  
  const [ companies, setCompanies ] = useRecoilState(companiesState);
  
  const [ status, setStatus ] = useState((companies.length === 0) ? 'loading' : 'loaded');
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const getCompanies = async () => {

      try {            
        const companyData = await fetchCompanies();
        setCompanies(companyData)
        setStatus('loaded');
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (companies.length === 0 && status === 'loading') getCompanies();
  
  }, [companies, status, setCompanies]);

  return { status, error };

};

