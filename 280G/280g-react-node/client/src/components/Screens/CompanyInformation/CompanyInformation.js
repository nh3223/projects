import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil'
import { parseISO } from 'date-fns';

import { companyNameState, transactionPriceState, transactionDateState, executivesState } from '../../../recoil/atoms/CompanyInformation';

import { fetchCompanyInformation, fetchExecutives } from '../../../api/companyInformation';

import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import DealPrice from './DealPrice/DealPrice';
import Executives from './Executives/Executives';

const CompanyInformation = () => {

  const { id } = useParams();
  
  const setCompanyName = useSetRecoilState(companyNameState);
  const setTransactionPrice = useSetRecoilState(transactionPriceState);
  const setTransactionDate = useSetRecoilState(transactionDateState);
  const setExecutives = useSetRecoilState(executivesState);

  useEffect(() => {
    const getCompanyInformation = async () => {
      const companyData = await fetchCompanyInformation(id);
      const executives = await fetchExecutives(id);
      setCompanyName(companyData.name);
      setTransactionPrice(companyData.transactionPrice);
      setTransactionDate(parseISO(companyData.transactionDate));
      setExecutives(executives);
    };
    getCompanyInformation();
  }, []);

  return (
    <>
      <h2>Company Information</h2>
      <CompanyName />
      <TransactionDate />
      <DealPrice />
      <Executives />
    </>
  );
};

export default CompanyInformation;