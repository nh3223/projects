import React from 'react';
import { useRecoilValue } from 'recoil';

import { startDateState, firstYearPaymentsState, basePeriodCompensationState, baseAmountState } from '../../../../recoil/compensation';
import { annualize, getParachuteThreshold } from '../../../../utilities/analysis/analysis';

import ExecutiveSummaryBlock from '../../../Elements/Layouts/ExecutiveSummaryBlock';
import CompensationSummary from './CompensationSummary';
import FirstYearCalculations from './FirstYearCalculations';
import BaseAmountCalculations from './BaseAmountCalculations';

const BaseAmount = ({ executiveId }) => {

  const startDate = useRecoilValue(startDateState(executiveId));
  const firstYearPayments = useRecoilValue(firstYearPaymentsState(executiveId));
  const compensation = useRecoilValue(basePeriodCompensationState(executiveId));
  const baseAmount = useRecoilValue(baseAmountState(executiveId));

  const firstBasePeriodCompensationYear = compensation[0];
  const annualizedCompensation = annualize(startDate, firstYearPayments, firstBasePeriodCompensationYear);
  const parachuteThreshold = getParachuteThreshold(baseAmount);
  
  return (

    <ExecutiveSummaryBlock>
      <BaseAmountCalculations baseAmount={ baseAmount } parachuteThreshold={ parachuteThreshold } /> 
      <CompensationSummary compensation={ compensation } />
      <FirstYearCalculations startDate={ startDate } firstYearPayments={ firstYearPayments } annualizedCompensation={ annualizedCompensation } />
    </ExecutiveSummaryBlock>

  );

};

export default BaseAmount;