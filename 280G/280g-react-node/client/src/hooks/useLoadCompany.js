import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { projectNameState, companyNameState, transactionDateState, transactionPriceState } from '../recoil/company';
import { fetchCompany } from '../api/company/fetchCompany';

export const useLoadCompany = (companyId) => {

  const [ project, setProject ] = useRecoilState(projectNameState(companyId));
  const [ company, setCompany ] = useRecoilState(companyNameState(companyId));
  const [ date, setDate ] = useRecoilState(transactionDateState(companyId));
  const [ price, setPrice ] = useRecoilState(transactionPriceState(companyId));

  const loaded = project || company || date || price;

  const [ status, setStatus ] = useState(loaded ? 'loaded' : 'loading');
  const [ error, setError ] = useState('');

  useEffect(() => {

    const setCompanyData = async () => {

      try {
        const { projectName, companyName, transactionDate, transactionPrice } = await fetchCompany(companyId);
        setProject(projectName || project);
        setCompany(companyName || company);
        setDate(transactionDate || date);
        setPrice(transactionPrice || price);
        setStatus('loaded');
      } 
      
      catch (e) {
        setError(e.message)
      }

    };

    if (!loaded && status === 'loading') setCompanyData();
  
  }, [companyId, project, company, date, price, loaded, status, setProject, setCompany, setDate, setPrice, setStatus]);

  return { status, error };

};


