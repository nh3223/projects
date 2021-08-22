import React, { useState, useEffect } from 'react';
import { useRecoilState } from "recoil";

import Loading from './Loading';
import { companyNameState, transactionDateState, transactionPriceState } from '../../recoil/company';
import { fetchCompany } from '../../api/company/fetchCompany';

const LoadCompany = ({ companyId }) => {
  
  const [ companyName, setCompanyName ] = useRecoilState(companyNameState(companyId));
  const [ transactionDate, setTransactionDate ] = useRecoilState(transactionDateState(companyId));
  const [ transactionPrice, setTransactionPrice ] = useRecoilState(transactionPriceState(companyId));
  
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    
    const setCompany = async () => {

      setLoading(true);

      try {
        const company = await fetchCompany(companyId);
        setCompanyName(company.companyName);
        setTransactionDate(company.transactionDate);
        setTransactionPrice(company.transactionPrice);
        setLoading(false);
      }

      catch (e) {
        setError(e.message);
      }

    };
  
    if (!companyName || !transactionDate || !transactionPrice) setCompany();

  }, [companyId, error, companyName, transactionDate, transactionPrice, setCompanyName, setTransactionDate, setTransactionPrice, setLoading, setError]);
  
  return loading ? <Loading componentMessage="Company Information" errorMessage={ error } /> : null

};

export default LoadCompany;