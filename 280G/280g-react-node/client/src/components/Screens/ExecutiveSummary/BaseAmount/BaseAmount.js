import React from 'react';
import { useRecoilValue } from 'recoil';

import { startDateState, firstYearPaymentsState, basePeriodCompensationState } from '../../../../recoil/compensation';
import { annualize, getBaseAmount, getParachuteThreshold } from '../../../../utilities/analysis/analysis';

import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import CompensationSummary from './CompensationSummary';
import FirstYearCalculations from './FirstYearCalculations';
import BaseAmountCalculations from './BaseAmountCalculations';

const BaseAmount = ({ executiveId }) => {

  const startDate = useRecoilValue(startDateState(executiveId));
  const firstYearPayments = useRecoilValue(firstYearPaymentsState(executiveId));
  const compensation = useRecoilValue(basePeriodCompensationState(executiveId));

  const firstBasePeriodCompensationYear = compensation[0];
  const annualizedCompensation = annualize(startDate, firstYearPayments, firstBasePeriodCompensationYear);
  const baseAmount = getBaseAmount(compensation, annualizedCompensation);
  const parachuteThreshold = getParachuteThreshold(baseAmount);
  
  return (

    <MultiLineLayout>
      <BaseAmountCalculations baseAmount={ baseAmount } parachuteThreshold={ parachuteThreshold } /> 
      <CompensationSummary compensation={ compensation } />
      <FirstYearCalculations startDate={ startDate } firstYearPayments={ firstYearPayments } annualizedCompensation={ annualizedCompensation } />
    </MultiLineLayout>

  );

};

export default BaseAmount;