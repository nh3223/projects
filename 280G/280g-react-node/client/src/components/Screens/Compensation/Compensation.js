import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { executiveNameState } from '../../../recoil/executive';
import { useLoadCompensation } from '../../../hooks/useLoadCompensation';

import Loading from '../../Loaders/Loading';
import StartDate from './StartDate/StartDate';
import BasePeriodCompensation from './BasePeriodCompensation/BasePeriodCompensation';
import FirstYearPayments from './FirstYearPayments/FirstYearPayments';
import ExecutiveHeader from '../../Navigation/ExecutiveHeader';

const Compensation = () => {

  const { executiveId } = useParams();
  const executiveName = useRecoilValue(executiveNameState(executiveId));
  const { loading, error } = useLoadCompensation(executiveId);

  console.log('executiveId', executiveId);

  return (
    loading
    ? <Loading componentMessage="Compensation" errorMessage={ error } />
    : <>
        <ExecutiveHeader executiveId={ executiveId } />
        <h1>Executive: { executiveName }</h1>
        <StartDate executiveId={ executiveId } />
        <BasePeriodCompensation executiveId={ executiveId } />
        <FirstYearPayments executiveId={ executiveId } />        
      </>  
  );
};
export default Compensation;