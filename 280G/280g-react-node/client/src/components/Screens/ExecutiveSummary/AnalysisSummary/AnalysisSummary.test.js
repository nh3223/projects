import React from 'react';
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { RecoilRoot } from 'recoil';

import { stringify } from '../../../../utilities/date/date';

import AnalysisSummary from './AnalysisSummary';
import { useSetCompensationTestData } from '../../../../tests/hooks/useSetCompensationTestData';
import { useSetNonEquityPaymentTestData } from '../../../../tests/hooks/useSetNonEquityPaymentTestData';
import { useSetNonEquityPaymentIds } from '../../../../tests/hooks/useSetNonEquityPaymentIds';

const InitializeState = ({ executiveId, paymentId, startDate, firstYearPayments, basePeriodCompensation, paymentAmount }) => {

  const loadingCompensation = useSetCompensationTestData({ executiveId, startDate, firstYearPayments, basePeriodCompensation });

  const loadingIds = useSetNonEquityPaymentIds({ executiveId, paymentIds: [paymentId] });

  const loadingPayment = useSetNonEquityPaymentTestData({ paymentId, paymentAmount })
    
  return ( loadingCompensation || loadingIds || loadingPayment ) ? null : <AnalysisSummary executiveId={ executiveId } />;

};

const component = (executiveId, paymentId, startDate, firstYearPayments, basePeriodCompensation, paymentAmount) => (
  <RecoilRoot>
    <InitializeState executiveId={ executiveId } paymentId={ paymentId } startDate={ startDate } firstYearPayments={ firstYearPayments } 
                     basePeriodCompensation={ basePeriodCompensation } paymentAmount={ paymentAmount } />
  </RecoilRoot>
);

const executiveId = 1;
const paymentId = 7;
const startDate = stringify(new Date('January 1, 2020'));
const firstYearPayments = 0
const basePeriodCompensation = [{ year: 2020, compensation: 100 }];
const paymentAmount = 1100;

const subTitle = '280G Analysis Summary';
const descriptions = [
  'Total Non-Equity Payments:',
  'Total Equity Grant Payments',
  'Total Payments:',
  'ParachuteThreshold:',
  'Amount to be waived if shareholder approval is solicited:',
  'Excess Parachute Payment:',
  'Excise Tax if shareholder approval is not solicited:'
];

test('should list subTitle and all summary descriptions', () => {
  const { getByText, getAllByText } = render(component(executiveId, paymentId, startDate, firstYearPayments, basePeriodCompensation, paymentAmount));
  const title = getByText(subTitle);
  const nonEquityPaymentsText = getByText(descriptions[0]);
  const equityPaymentsText = getByText(descriptions[1]);
  const totalPaymentsText = getByText(descriptions[2]);
  const parachuteThresholdText = getByText(descriptions[3]);
  const waiverText = getByText(descriptions[4]);
  const excessParachutePaymentText = getByText(descriptions[5]);
  const exciseTaxText = getByText(descriptions[6]);
  const payments = getAllByText('1100', { exact: false });
  const parachuteThreshold = getByText('300', { exact: false });
  const waiver = getByText('801', { exact: false});
  const excessParachutePayment = getByText('1000', { exact: false });
  const exciseTax = getByText('200', { exact: false });
  expect(title).toBeInTheDocument();
  expect(nonEquityPaymentsText).toBeInTheDocument();
  expect(equityPaymentsText).toBeInTheDocument();
  expect(totalPaymentsText).toBeInTheDocument();
  expect(parachuteThresholdText).toBeInTheDocument();
  expect(waiverText).toBeInTheDocument();
  expect(excessParachutePaymentText).toBeInTheDocument();
  expect(exciseTaxText).toBeInTheDocument();
  expect(payments.length).toBe(2);
  expect(parachuteThreshold).toBeInTheDocument();
  expect(waiver).toBeInTheDocument();
  expect(excessParachutePayment).toBeInTheDocument();
  expect(exciseTax).toBeInTheDocument();
})