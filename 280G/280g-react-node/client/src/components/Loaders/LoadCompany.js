import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from "recoil";

import Loading from './Loading';
import { companyNameState, transactionDateState, transactionPriceState } from '../../recoil/company';
import { fetchCompany } from '../../api/company/fetchCompany';

const LoadCompany = ({ companyId }) => {
  
  const setCompanyName = useSetRecoilState(companyNameState);
  const setTransactionDate = useSetRecoilState(transactionDateState);
  const setTransactionPrice = useSetRecoilState(transactionPriceState);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    
    const setCompany = async () => {
      const { companyName, transactionDate, transactionPrice } = await fetchCompany(companyId);
      setCompanyName(companyName);
      setTransactionDate(transactionDate);
      setTransactionPrice(transactionPrice);
      setLoading(false);
    };
  
    const resetCompany = () => {
      console.log('reset company');
      setCompanyName('');
      setTransactionDate('');
      setTransactionPrice('');
    };

    (companyId) ? setCompany() : resetCompany();

  }, [companyId, setCompanyName, setTransactionDate, setTransactionPrice, setLoading]);
  
  return loading ? <Loading componentMessage="Company Information" /> : null

};

export default LoadCompany;