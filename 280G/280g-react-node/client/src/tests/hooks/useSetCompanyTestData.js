import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { companyNameState, projectNameState, transactionDateState, transactionPriceState } from '../../recoil/company';

export const useSetCompanyTestData = ({ companyId=1, projectName='', companyName='', transactionDate='', transactionPrice='' }) => {

  const setProjectName = useSetRecoilState(projectNameState(companyId));
  const setCompanyName = useSetRecoilState(companyNameState(companyId));
  const setTransactionDate = useSetRecoilState(transactionDateState(companyId));
  const setTransactionPrice = useSetRecoilState(transactionPriceState(companyId));

  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setProjectName(projectName);
    setCompanyName(companyName);
    setTransactionDate(transactionDate);
    setTransactionPrice(transactionPrice);
    setLoaded(true);
  }, [projectName, companyName, transactionDate, transactionPrice,
      setProjectName, setCompanyName, setTransactionDate, setTransactionPrice, setLoaded]);

  return loading;

};