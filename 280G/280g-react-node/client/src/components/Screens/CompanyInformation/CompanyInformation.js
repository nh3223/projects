import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState, useRecoilCallback } from 'recoil'

import { companyState, companyCompletedState } from '../../../recoil/company';
import { executiveState, executiveIdsState } from '../../../recoil/executive';

import { createCompany } from '../../../api/company';
import { fetchExecutives } from '../../../api/executive';

import { getCompany, getCompanyCompleted } from '../../../utilities/getCompany';
import isCompleted from '../../../utilities/isCompleted';

import CompanyHeader from '../../Navigation/CompanyHeader';
import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import TransactionPrice from './TransactionPrice/TransactionPrice';
import Executives from './Executives/Executives';

const CompanyInformation = () => {

  const { id } = useParams();

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const setExecutiveIds = useSetRecoilState(executiveIdsState);
  
  const setExecutive = useRecoilCallback(({ set }) => (executive) => {
    set(executiveState(executive._id), executive);
  }, []);
  
  const history = useHistory();

  // Load data

  useEffect(() => {
    
    const setCompanyInformation = async () => {
      console.log('loading data');
      setCompany(await getCompany(id));
      setCompleted(getCompanyCompleted(id));
      const executives = await fetchExecutives(id);
      const executiveIds = [];
      for (const executive of executives) {
        setExecutive(executive);
        executiveIds.push(executive._id);
      };
      setExecutiveIds(executiveIds);
    };

    setCompanyInformation();

  }, [id, setCompany, setCompleted, setExecutiveIds, setExecutive ]);
  
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
      <CompanyHeader companyId={ id } />
      <h2>Company Information</h2>
      <CompanyName />
      <TransactionDate />
      <TransactionPrice />
      { id && <Executives companyId={ id }/> }
    </>
  );
};

export default CompanyInformation;