import React, { useState, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from "recoil";
import { parseISO } from 'date-fns';

import { companyNameState, transactionDateState, transactionPriceState } from '../../recoil/company';
import { fetchCompany } from '../../api/company';

const LoadCompany = ({ companyId }) => {
  
  const [ companyName, setCompanyName ] = useRecoilState(companyNameState);
  const [ transactionDate, setTransactionDate ] = useRecoilState(transactionDateState);
  const setTransactionPrice = useSetRecoilState(transactionPriceState);
  const [ loading, setLoading ] = useState(true);

  console.log('transaction Date', transactionDate)

  useEffect(() => {
    
    const setCompanyInformation = async () => {
      console.log('in set Company');
      const company = await fetchCompany(companyId);
      console.log(company);
      setCompanyName(company.name);
      setTransactionDate(parseISO(company.transactionDate));
      setTransactionPrice(company.transactionPrice);
      setLoading(false);
    };
    console.log('in useEffect');
    if (companyId && !companyName) setCompanyInformation();

  }, [companyId, loading, companyName, setCompanyName, setTransactionDate, setTransactionPrice ]);
  
  return (
    loading && <p>Loading Company Information . . .</p>
  );

};

export default LoadCompany;