import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { executiveNameState } from '../../../recoil/executive';

import Headers from '../../Navigation/Headers/Headers';

import ExecutiveSummaryLayout from '../../Elements/Layouts/ExecutiveSummaryLayout';
import Title from '../../Elements/TextElements/Title/Title';
import AnalysisSummary from './AnalysisSummary/AnalysisSummary';
import BaseAmount from './BaseAmount/BaseAmount';
import NonEquityPaymentSummary from './NonEquityPaymentSummary/NonEquityPaymentSummary';
import EquityGrantSummary from './EquityGrantSummary/EquityGrantSummary';

const ExecutiveSummary = () => {
  
  const { companyId, executiveId } = useParams();

  const executiveName = useRecoilValue(executiveNameState(executiveId));

  const title = `${executiveName} - Executive Summary`

  return (
    <>

      <Headers companyId={ companyId } executiveId={ executiveId } />
        
      <ExecutiveSummaryLayout>
        <Title text={ title } />
        <AnalysisSummary companyId={ companyId } executiveId={ executiveId } />
        <BaseAmount executiveId={ executiveId } />
        <NonEquityPaymentSummary executiveId={ executiveId } />
        <EquityGrantSummary companyId={ companyId } executiveId={ executiveId } /> 
      </ExecutiveSummaryLayout>

    </>
  );
};

export default ExecutiveSummary;