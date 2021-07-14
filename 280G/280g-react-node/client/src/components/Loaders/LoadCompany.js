import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { parseISO } from 'date-fns';

import Loading from './Loading';
import { companyNameState, transactionDateState, transactionPriceState } from '../../recoil/company';
import { fetchCompany } from '../../api/company';

const LoadCompany = ({ companyId }) => {
  
  const [ companyName, setCompanyName ] = useRecoilState(companyNameState);
  const setTransactionDate = useSetRecoilState(transactionDateState);
  const setTransactionPrice = useSetRecoilState(transactionPriceState);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    
    const setCompanyInformation = async () => {
      const company = await fetchCompany(companyId);
      setCompanyName(company.name);
      setTransactionDate(parseISO(company.transactionDate));
      setTransactionPrice(company.transactionPrice);
      setLoading(false);
    };

    if (companyId && !companyName) setCompanyInformation();

  }, [companyId, loading, companyName, setCompanyName, setTransactionDate, setTransactionPrice ]);
  
  return (
    loading && <Loading componentMessage="Company Information" />
  );

};

export default LoadCompany;