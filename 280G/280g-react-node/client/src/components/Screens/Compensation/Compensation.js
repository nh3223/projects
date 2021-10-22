import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { executiveNameState } from '../../../recoil/executive';
import { useLoadExecutive } from '../../../hooks/useLoadExecutive';

import Loading from '../Loading/Loading';
import Headers from '../../Navigation/Headers/Headers';
import MultiLineLayout from '../../Elements/Layouts/MultiLineLayout';
import StartDate from './StartDate/StartDate';
import BasePeriodCompensation from './BasePeriodCompensation/BasePeriodCompensation';
import FirstYearPayments from './FirstYearPayments/FirstYearPayments';

const Compensation = () => {

  const { companyId, executiveId } = useParams();
  const executiveName = useRecoilValue(executiveNameState(executiveId));
  const { status, error } = useLoadExecutive(executiveId);

  if (status === 'loading') return <Loading component="Compensation" error={ error } />
  
  return (
    <>

      <Headers companyId={ companyId } executiveId={ executiveId } />

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