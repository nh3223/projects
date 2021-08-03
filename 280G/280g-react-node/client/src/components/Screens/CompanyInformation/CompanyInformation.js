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
import SubTitle from '../../Elements/SubTitle/SubTitle';

const CompanyInformation = () => {

  const { companyId } = useParams();
  const history = useHistory();

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useState((companyId)
    ? { companyName: true, transactionDate: true, transactionPrice: true }
    : { companyName: false, transactionDate: false, transactionPrice: false });

  const handlers = {
    change: async (name, value) => setCompany({ ...company, [name]: value }),
    edit: ({ target: { name } }) => setCompleted({ ...completed, [name]: false }),
    submit: async ({ target: { name } }) => {
      if (companyId) await editCompany(companyId, company);
      setCompleted({ ...completed, [name]: true })
    }
  };

  useEffect(() => {
    
    const create = async (company) => {
      const savedCompany = await createCompany(company);
      history.push(`/company/${savedCompany._id}/info`);
    };
    
    if (allTrue(completed) && !companyId) create(company);

  }, [companyId, completed, company, history ]);

  return (
    <>
      <LoadCompany companyId={ companyId } />
      <LoadExecutives companyId={ companyId } />
      <CompanyHeader companyId={ companyId } />
      <SubTitle text="Company Information" />
      <CompanyName name="companyName" companyName={ company.companyName } completed={ completed.companyName } handlers={ handlers } />
      <TransactionDate name="transactionDate" transactionDate={ company.transactionDate } completed={ completed.transactionDate } handlers={ handlers } />
      <TransactionPrice name="transactionPrice" transactionPrice={ company.transactionPrice } completed={ completed.transactionPrice } handlers={ handlers } />
      { companyId && <Executives companyId={ companyId }/> }
    </>
  );
};

export default CompanyInformation;