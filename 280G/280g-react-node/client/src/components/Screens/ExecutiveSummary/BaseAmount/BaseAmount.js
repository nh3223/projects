import React from 'react';
import { useRecoilValue } from 'recoil';

import { startDateState, firstYearPaymentsState, basePeriodCompensationState } from '../../../../recoil/executive';
import { baseAmountState } from '../../../../recoil/analysis';

import ExecutiveSummaryBlock from '../../../Elements/Layouts/ExecutiveSummaryBlock';
import CompensationSummary from './CompensationSummary';
import FirstYearCalculations from './FirstYearCalculations';
import BaseAmountCalculations from './BaseAmountCalculations';

const BaseAmount = ({ executiveId }) => {

  const startDate = useRecoilValue(startDateState(executiveId));
  const firstYearPayments = useRecoilValue(firstYearPaymentsState(executiveId));
  const compensation = useRecoilValue(basePeriodCompensationState(executiveId));
  const { annualizedCompensation, baseAmount, parachuteThreshold } = useRecoilValue(baseAmountState(executiveId));
  
  return (

    <ExecutiveSummaryBlock>
      <BaseAmountCalculations baseAmount={ baseAmount } parachuteThreshold={ parachuteThreshold } /> 
      <CompensationSummary compensation={ compensation } />
      <FirstYearCalculations startDate={ startDate } firstYearPayments={ firstYearPayments } annualizedCompensation={ annualizedCompensation } />
    </ExecutiveSummaryBlock>

  );

};

export default BaseAmount;