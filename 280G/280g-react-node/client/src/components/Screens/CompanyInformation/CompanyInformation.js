import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil'

import { companyState, defaultCompanyState, companyCompletedState, defaultCompletedState } from '../../../recoil/atoms/company';
import { executivesState } from '../../../recoil/atoms/executive';

import { fetchCompany, createCompany, editCompany } from '../../../api/company';
import { fetchExecutives } from '../../../api/executive';

import isCompleted from '../../../utilities/isCompleted';

import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import TransactionPrice from './TransactionPrice/TransactionPrice';
import Executives from './Executives/Executives';

const CompanyInformation = () => {

  const { id } = useParams();

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const setExecutives = useSetRecoilState(executivesState);
  
  const history = useHistory();

  // Load data

  useEffect(() => {
    
    const setCompanyInformation = async () => {
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
    
    const setDefaults = () => {
      setCompany(defaultCompanyState);
      setCompleted(defaultCompletedState);
      setExecutives([]);
    };

    (id) ? setCompanyInformation() : setDefaults();

  }, [id, setCompany, setExecutives, setCompleted]);
  
// Create company
  useEffect(() => {
    const save = async (companyDate) => {
      const savedCompany = await createCompany(companyData);
      setCompany(savedCompany);
      history.push(`/company/${savedCompany._id}/info`);
      // history.push(`/company/${savedCompany._id}/info`)
    };
    const companyData = JSON.stringify({
      name: company.name,
      transactionDate: company.transactionDate,
      transactionPrice: company.transactionPrice
    });
    if (!id && isCompleted(completed)) { save(companyData); }
  }, [id, completed, company.name, company.transactionDate, company.transactionPrice, setCompany, history]);

  return (
    <>
      <h2>Company Information</h2>
      <CompanyName />
      <TransactionDate />
      <TransactionPrice />
      { id && <Executives companyId={ id }/> }
    </>
  );
};

export default CompanyInformation;