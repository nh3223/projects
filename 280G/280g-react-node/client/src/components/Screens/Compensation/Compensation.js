import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { executiveNameState } from '../../../recoil/executive';
import { useLoadCompensation } from '../../../hooks/useLoadCompensation';

import Loading from '../../Loaders/Loading';
import Headers from '../../Elements/Layouts/Headers';
import Header from '../../Navigation/Header';
import MultiLineLayout from '../../Elements/Layouts/MultiLineLayout';
import StartDate from './StartDate/StartDate';
import BasePeriodCompensation from './BasePeriodCompensation/BasePeriodCompensation';
import FirstYearPayments from './FirstYearPayments/FirstYearPayments';
import CompanyHeader from '../../Navigation/CompanyHeader';
import ExecutiveHeader from '../../Navigation/ExecutiveHeader';

const Compensation = () => {

  const { companyId, executiveId } = useParams();
  const executiveName = useRecoilValue(executiveNameState(executiveId));
  const { loading, error } = useLoadCompensation(executiveId);

  if (loading) return <Loading component="Compensation" error={ error } />
  
  return (
    <>

      <Headers>
        <Header companyId={ companyId } />
        <CompanyHeader companyId={ companyId } />
        <ExecutiveHeader executiveId={ executiveId } />
      </Headers>

      <MultiLineLayout>
        <h1>Executive: { executiveName }</h1>
        <StartDate executiveId={ executiveId } />
        <BasePeriodCompensation executiveId={ executiveId } />
        <FirstYearPayments executiveId={ executiveId } />  
      </MultiLineLayout>
      
    </>  

  );

};

export default Compensation;