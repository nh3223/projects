import { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import { companyNameState, transactionDateState, transactionPriceState } from '../../recoil/company';
import { fetchCompany } from '../../api/company';

const useLoadCompany = (companyId) => {
  
  const [ companyName, setCompanyName ] = useRecoilState(companyNameState(companyId));
  const [ transactionDate, setTransactionDate ] = useRecoilState(transactionDateState(companyId));
  const [ transactionPrice, setTransactionPrice ] = useRecoilState(transactionPriceState(companyId));
  
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setCompany = async () => {

      setLoading(true);

      try {
        const { name, date, price } = await fetchCompany(companyId);
        setCompanyName(name);
        setTransactionDate(date);
        setTransactionPrice(price);
        setLoading(false);
      } 
      
      catch (e) {
        setError(e.message)
      }

    };
  
    if (!companyName || !transactionDate || !transactionPrice) setCompany();
  
  }, [companyId, companyName, transactionDate, transactionPrice, setCompanyName, setTransactionDate, setTransactionPrice]);

  return { loading, error };

};

export default useLoadCompany;
