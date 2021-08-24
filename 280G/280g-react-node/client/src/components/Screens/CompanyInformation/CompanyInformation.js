import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { createCompany } from '../../../api/company/createCompany';
import useLoadCompany from '../../../hooks/useLoadCompany';

import Loading from '../../Loaders/Loading';
import CompanyHeader from '../../Navigation/CompanyHeader';
import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import TransactionPrice from './TransactionPrice/TransactionPrice';
import Executives from './Executives/Executives';
import SubTitle from '../../Elements/SubTitle/SubTitle';

const CompanyInformation = () => {

  const { companyId } = useParams();
  const { loading, error } = useLoadCompany(companyId);
  const history = useHistory();

  useEffect(() => {
    
    const create = async () => {
      const newCompany = await createCompany();
      history.push(`/company/${newCompany._id}/info`);
    };
    
    if (!companyId) create();

  }, [companyId, history]);

  return (
    loading
    ? <Loading componentMessage="Loading Company ..." errorMessage={ error } />
    : <>
        <CompanyHeader companyId={ companyId } />
        <SubTitle text="Company Information" />
        <CompanyName companyId={ companyId }/>
        <TransactionDate companyId={ companyId }/>
        <TransactionPrice companyId={ companyId }/>
        <Executives companyId={ companyId }/>
      </>
  );
};

export default CompanyInformation;