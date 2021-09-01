import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { createCompany } from '../../../api/company/createCompany';
import useLoadCompany from '../../../hooks/useLoadCompany';

import Loading from '../../Loaders/Loading';
import Headers from '../../Elements/Layouts/Headers';
import MultiLineLayout from '../../Elements/Layouts/MultiLineLayout';
import CompanyHeader from '../../Navigation/CompanyHeader';
import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import TransactionPrice from './TransactionPrice/TransactionPrice';
import Executives from '../Executives/Executives/Executives';
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

  if (loading) return <Loading component="Company Information" error={ error } />

  return (
    <>

      <Headers>
        <CompanyHeader companyId={ companyId } />
      </Headers>
      
      <MultiLineLayout>
        <SubTitle text="Company Information" />
        <CompanyName companyId={ companyId }/>
        <TransactionDate companyId={ companyId }/>
        <TransactionPrice companyId={ companyId }/>
        <Executives companyId={ companyId }/>
      </MultiLineLayout>
    
    </>
  );
};

export default CompanyInformation;