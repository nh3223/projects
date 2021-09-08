import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { projectNameState, companyNameState, transactionDateState, transactionPriceState } from '../../recoil/company';
import { fetchCompany } from '../../api/company/fetchCompany';

const useLoadCompany = (companyId) => {
  
  const [ projectName, setProjectName ] = useRecoilState(projectNameState(companyId));
  const [ companyName, setCompanyName ] = useRecoilState(companyNameState(companyId));
  const [ transactionDate, setTransactionDate ] = useRecoilState(transactionDateState(companyId));
  const [ transactionPrice, setTransactionPrice ] = useRecoilState(transactionPriceState(companyId));
  
  const [ loaded, setLoaded ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading]);

  useEffect(() => {
    
    const setCompany = async () => {

      setLoading(true);
      setLoaded(false);

      try {
        const { nameProject, nameCompany, date, price } = await fetchCompany(companyId);
        setProjectName(nameProject);
        setCompanyName(nameCompany);
        setTransactionDate(date);
        setTransactionPrice(price);
        setLoaded(true);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (!projectName || !companyName || !transactionDate || !transactionPrice) setCompany();
  
  }, [companyId, projectName, companyName, transactionDate, transactionPrice, setProjectName, setCompanyName, setTransactionDate, setTransactionPrice]);

  return { loading, error };

};

export default useLoadCompany;
