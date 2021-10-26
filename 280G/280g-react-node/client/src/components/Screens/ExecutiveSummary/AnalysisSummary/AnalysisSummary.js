import React from 'react';
import { useRecoilValue } from "recoil";

import { baseAmountState, analysisState, totalPaymentsState } from "../../../../recoil/analysis";

import ExecutiveSummaryBlock from '../../../Elements/Layouts/ExecutiveSummaryBlock';
import SubTitle from '../../../Elements/TextElements/SubTitle/SubTitle';
import AnalysisSummaryRow from './AnalysisSummaryRow';

const AnalysisSummary = ({ companyId, executiveId }) => {

  const { totalNonEquityPayments, totalEquityGrantPayments, totalPayments } = useRecoilValue(totalPaymentsState({ companyId, executiveId }));
  const { parachuteThreshold } = useRecoilValue(baseAmountState(executiveId));
  const { waiverAmount, excessParachutePayment, exciseTax } = useRecoilValue(analysisState({ companyId, executiveId }));

  const subTitle = '280G Analysis Summary';
  const nonEquityPaymentsText = 'Total Non-Equity Payments:';
  const equityGrantPaymentsText = 'Total Equity Grant Payments';
  const totalPaymentsText = 'Total Payments:';
  const parachuteThresholdText = 'ParachuteThreshold:';
  const waiverAmountText = 'Amount to be waived if shareholder approval is solicited:';
  const excessParachutePaymentText = 'Excess Parachute Payment: ';
  const exciseTaxText = 'Excise Tax if shareholder approval is not solicited:';

  const rows = [
    { description: nonEquityPaymentsText, amount: totalNonEquityPayments },
    { description: equityGrantPaymentsText, amount: totalEquityGrantPayments },
    { description: totalPaymentsText, amount: totalPayments },
    { description: parachuteThresholdText, amount: parachuteThreshold },
    { description: waiverAmountText, amount: waiverAmount },
    { description: excessParachutePaymentText, amount: excessParachutePayment },
    { description: exciseTaxText, amount: exciseTax }
  ];

  return (

    <ExecutiveSummaryBlock>
      <SubTitle text={ subTitle } />
      { rows.map((row, index) => <AnalysisSummaryRow key={ index } description={ row.description } amount={ row.amount } />) }
    </ExecutiveSummaryBlock>

  );

};

export default AnalysisSummary;