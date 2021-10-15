import React from 'react';
import { useParams } from 'react-router-dom';

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