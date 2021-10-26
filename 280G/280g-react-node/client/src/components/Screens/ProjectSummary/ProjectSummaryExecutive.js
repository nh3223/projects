import React from 'react';
import { useRecoilValue } from 'recoil';

import { executiveNameState, executiveTitleState } from '../../../recoil/executive';
import { analysisState, baseAmountState, totalPaymentsState } from '../../../recoil/analysis';

import MultiLineLayout from '../../Elements/Layouts/MultiLineLayout';
import Description from '../../Elements/TextElements/Description/Description';
import SubTitle from '../../Elements/TextElements/SubTitle/SubTitle';

const ProjectSummaryExecutive = ({ companyId, executiveId }) => {

  const executiveName = useRecoilValue(executiveNameState(executiveId));
  const executiveTitle = useRecoilValue(executiveTitleState(executiveId));

  const { totalNonEquityPayments, totalEquityGrantPayments, totalPayments } = useRecoilValue(totalPaymentsState({ companyId, executiveId }));
  
  const { baseAmount, parachuteThreshold } = useRecoilValue(baseAmountState(executiveId));
  const { waiverAmount, excessParachutePayment, exciseTax } = useRecoilValue(analysisState({ companyId, executiveId }));

  return (
    <MultiLineLayout>
      
      <SubTitle text={ `${executiveName}, ${executiveTitle}` } />

      <Description text={ `Total Non-Equity Payments: $${totalNonEquityPayments}` } />
      <Description text={ `Total Equity Grant Payments: $${totalEquityGrantPayments}`} />
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