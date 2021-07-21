import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil'

import { companyState } from '../../../recoil/company';
import { createCompany, editCompany } from '../../../api/company';
import { allTrue } from '../../../utilities/checkObject';

import LoadCompany from '../../Loaders/LoadCompany';
import LoadExecutives from '../../Loaders/LoadExecutives';
import CompanyHeader from '../../Navigation/CompanyHeader';
import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import TransactionPrice from './TransactionPrice/TransactionPrice';
import Executives from './Executives/Executives';

const CompanyInformation = () => {

  const { companyId } = useParams();
  const history = useHistory();

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useState((companyId)
    ? { companyName: true, transactionDate: true, transactionPrice: true }
    : { companyName: false, transactionDate: false, transactionPrice: false });
  
  const submit = async (name, submittedCompany) => {
    if (companyId) {
      const companyData = JSON.stringify(submittedCompany);
      await editCompany(companyId, companyData);
    }
    setCompleted({ ...completed, [name]: true })
  }

  const handlers = {
    change: async (name, value) => {
      setCompany({ ...company, [name]: value });
      if (name === 'transactionDate') await submit(name, { ...company, [name]: value });
    },
    edit: ({ target: { name } }) => setCompleted({ ...completed, [name]: false }),
    submit: async (e) => await submit(e.target.name, company)
  }

  useEffect(() => {
    
    const create = async (company) => {
      const companyData = JSON.stringify(company);
      const savedCompany = await createCompany(companyData);
      history.push(`/company/${savedCompany._id}/info`);
    };
    
    if (allTrue(completed) && !companyId) create(company);

  }, [companyId, completed, company, history ]);

  return (
    <>
      <CompanyHeader companyId={ companyId } />
      <LoadCompany companyId={ companyId } />
      <LoadExecutives companyId={ companyId } />
      <h2>Company Information</h2>
      <CompanyName companyName={ company.companyName } completed={ completed.companyName } handlers={ handlers } />
      <TransactionDate transactionDate={ company.transactionDate } completed={ completed.transactionDate } handlers={ handlers } />
      <TransactionPrice transactionPrice={ company.transactionPrice } completed={ completed.transactionPrice } handlers={ handlers } />
      { companyId && <Executives companyId={ companyId }/> }
    </>
  );
};

export default CompanyInformation;