import React from 'react';
import { useParams } from 'react-router-dom';

import Headers from '../../Elements/Layouts/Headers';
import ExecutiveSummaryLayout from '../../Elements/Layouts/ExecutiveSummaryLayout';
import CompanyHeader from '../../Navigation/CompanyHeader';
import ExecutiveHeader from '../../Navigation/ExecutiveHeader';
import Title from '../../Elements/TextElements/Title/Title';
import BaseAmount from './BaseAmount/BaseAmount';
import NonEquityPaymentSummary from './NonEquityPaymentSummary';
import EquityGrantSummary from './EquityGrantSummary';

const ExecutiveSummary = () => {
  
  const { companyId, executiveId } = useParams();

  const title = 'Executive Summary'

  return (
    <>
      <Headers>
        <CompanyHeader companyId={ companyId } />
        <ExecutiveHeader executiveId={ executiveId }/>
      </Headers>
      <ExecutiveSummaryLayout>
        <Title text={ title } />
        <BaseAmount executiveId={ executiveId } />
        <NonEquityPaymentSummary executiveId={ executiveId } />
        <EquityGrantSummary executiveId={ executiveId } /> 
      </ExecutiveSummaryLayout>
      <h1>Executive Summary</h1>

    </>
  );
};

export default ExecutiveSummary;