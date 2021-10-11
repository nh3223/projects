import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { createCompany } from '../../../api/company/createCompany';
import { useLoadCompany } from '../../../hooks/useLoadCompany';

import Loading from '../Loading/Loading';
import Headers from '../../Navigation/Headers/Headers';
import MultiLineLayout from '../../Elements/Layouts/MultiLineLayout';
import CompanyName from './CompanyName/CompanyName';
import TransactionDate from './TransactionDate/TransactionDate';
import TransactionPrice from './TransactionPrice/TransactionPrice';
import Executives from '../Executives/Executives/Executives';
import SubTitle from '../../Elements/TextElements/SubTitle/SubTitle';
import ProjectName from './ProjectName/ProjectName';

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

      <Headers companyId={ companyId } />
      
      <MultiLineLayout>
        <SubTitle text="Company Information" />
        <ProjectName companyId={ companyId } />
        <CompanyName companyId={ companyId }/>
        <TransactionDate companyId={ companyId }/>
        <TransactionPrice companyId={ companyId }/>
        <Executives companyId={ companyId }/>
      </MultiLineLayout>
    
    </>
  );
};

export default CompanyInformation;