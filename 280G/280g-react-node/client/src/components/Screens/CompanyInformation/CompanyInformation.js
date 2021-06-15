import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil'

import { companyState, defaultCompanyState, companyCompletedState, defaultCompletedState } from '../../../recoil/atoms/company';
import { executivesState } from '../../../recoil/atoms/executive';

import { fetchCompany } from '../../../api/company';
import { fetchExecutives } from '../../../api/executive';

import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import TransactionPrice from './TransactionPrice/TransactionPrice';
import Executives from './Executives/Executives';

const CompanyInformation = () => {

  const { id } = useParams();

  const setCompany = useSetRecoilState(companyState);
  const setExecutives = useSetRecoilState(executivesState);
  const setCompleted = useSetRecoilState(companyCompletedState);

  useEffect(() => {
    const getCompanyInformation = async () => {
      const companyData = await fetchCompany(id);
      const executives = await fetchExecutives(id);
      setCompany({
        id,
        name: companyData.name,
        transactionPrice: companyData.transactionPrice,
        transactionDate: companyData.transactionDate,
        executives
      });
      setCompleted({
        name: true,
        transactionPrice: true,
        transactionDate: true
      });
      setExecutives(executives);
    };
    if (id) {
      getCompanyInformation();
    } else {
      setCompany(defaultCompanyState);
      setCompleted(defaultCompletedState);
      setExecutives([]);
    }
  }, [id, setCompany, setExecutives, setCompleted]);

  return (
    <>
      <h2>Company Information</h2>
      <CompanyName />
      <TransactionDate />
      <TransactionPrice />
      <Executives companyId={ id }/>
    </>
  );
};

export default CompanyInformation;