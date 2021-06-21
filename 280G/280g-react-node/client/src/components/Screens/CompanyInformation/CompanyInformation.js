import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState, useRecoilCallback } from 'recoil'

import { companyState, companyCompletedState } from '../../../recoil/atoms/company';
import { executiveState, executiveIdsState } from '../../../recoil/atoms/executive';
import { compensationState } from '../../../recoil/atoms/compensation';

import { createCompany } from '../../../api/company';
import { fetchExecutives } from '../../../api/executive';

import { getCompany, getCompanyCompleted } from '../../../utilities/getCompany';
import { getCompensation } from '../../../utilities/getCompensation';
import isCompleted from '../../../utilities/isCompleted';

import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import TransactionPrice from './TransactionPrice/TransactionPrice';
import Executives from './Executives/Executives';

const CompanyInformation = () => {

  const { id } = useParams();

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const [ executiveIds, setExecutiveIds ] = useRecoilState(executiveIdsState);
  // const [ executive, setExecutive ] = useRecoilState(executiveState);


  const setExecutive = useRecoilCallback(({ set }) => (executive) => {
    // set(executiveIdsState, prev => [ ...prev, executive._id]);
    set(executiveState(executive._id), executive);
  }, []);

  // const setCompensation = useSetRecoilState(compensationState);
  
  const history = useHistory();

  // Load data

  useEffect(() => {
    
    const setCompanyInformation = async () => {
      setCompany(await getCompany(id));
      setCompleted(getCompanyCompleted(id));
      const executives = await fetchExecutives(id);
      const ids = []
      for (const executive of executives) {
        setExecutive(executive);
        ids.push(executive._id);
      };
      setExecutiveIds(ids);
    };

      // setCompensation(await getCompensation(executives));

    //   const companyData = await fetchCompany(id);
    //   const executives = await fetchExecutives(id);
    //   const compensation = await fetchCompensation(id);
    //   setCompany({
    //     id,
    //     name: companyData.name,
    //     transactionPrice: companyData.transactionPrice,
    //     transactionDate: companyData.transactionDate,
    //     executives
    //   });
    //   setCompleted({
    //     name: true,
    //     transactionPrice: true,
    //     transactionDate: true
    //   });
    //   setExecutives(executives);
    //   setCompensation(compensation);
    // };
    
    // const setDefaults = () => {
    //   setCompany(defaultCompanyState);
    //   setCompleted(defaultCompletedState);
    //   setExecutives([]);
    // };
    setCompanyInformation()

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
      <h2>Company Information</h2>
      <CompanyName />
      <TransactionDate />
      <TransactionPrice />
      { id && <Executives companyId={ id }/> }
    </>
  );
};

export default CompanyInformation;