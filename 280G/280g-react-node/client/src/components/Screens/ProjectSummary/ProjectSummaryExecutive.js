import React from 'react';
import { useRecoilValue } from 'recoil';

import { executiveNameState, executiveTitleState } from '../../../recoil/executive';
import { totalNonEquityPaymentsState } from '../../../recoil/nonEquityPayment';
import { totalEquityGrantPaymentsState } from '../../../recoil/equityGrant';
import { startDateState, firstYearPaymentsState, basePeriodCompensationState } from '../../../recoil/compensation';
import { annualize, getBaseAmount, getParachuteThreshold, getExcessParachutePayment, getExciseTax, getWaiverAmount } from '../../../utilities/analysis/analysis';

import MultiLineLayout from '../../Elements/Layouts/MultiLineLayout';
import Description from '../../Elements/TextElements/Description/Description';
import SubTitle from '../../Elements/TextElements/SubTitle/SubTitle';

const ProjectSummaryExecutive = ({ executiveId }) => {

  const executiveName = useRecoilValue(executiveNameState(executiveId));
  const executiveTitle = useRecoilValue(executiveTitleState(executiveId));
  const totalNonEquityPayments = useRecoilValue(totalNonEquityPaymentsState(executiveId));
  const totalEquityGrantPayments = useRecoilValue(totalEquityGrantPaymentsState(executiveId));
  const startDate = useRecoilValue(startDateState(executiveId));
  const firstYearPayments = useRecoilValue(firstYearPaymentsState(executiveId));
  const compensation = useRecoilValue(basePeriodCompensationState(executiveId));

  const totalPayments = totalNonEquityPayments + totalEquityGrantPayments;

  const firstBasePeriodCompensationYear = compensation[0];
  const annualizedCompensation = annualize(startDate, firstYearPayments, firstBasePeriodCompensationYear);
  const baseAmount = getBaseAmount(compensation, annualizedCompensation);
  const parachuteThreshold = getParachuteThreshold(baseAmount);
  const excessParachutePayment = getExcessParachutePayment(totalPayments, parachuteThreshold, baseAmount);
  const exciseTax = getExciseTax(excessParachutePayment);
  const waiverAmount = getWaiverAmount(totalPayments, parachuteThreshold);

  return (
    <MultiLineLayout>
      
      <SubTitle text={ `${executiveName}, ${executiveTitle}` } />

      <Description text={ `Total NonEquityPayments: $${totalNonEquityPayments}` } />
      <Description text={ `Ttal Equity Grant Payments: $${totalEquityGrantPayments}`} />
      <Description text={ `Total Payments: $${totalPayments}` } />

      <Description text={ `Base Amount: $${baseAmount}` } />
      <Description text={ `Parachute Threshold: $${parachuteThreshold}` } />
      
      <Description text={ `Excess Parachute Payment: $${excessParachutePayment}` } />
      <Description text={ `Excise Tax if approval not solicited: $${exciseTax}` } />

      <Description text={ `Waiver Amount if approval not obtained: $${waiverAmount}` } />

    </MultiLineLayout>
  );

};

export default ProjectSummaryExecutive;