import React from 'react';
import { useRecoilValue } from 'recoil';

import { nonEquityPaymentIdsState } from '../../../../recoil/nonEquityPayment';
import { useLoadNonEquityPayments } from '../../../../hooks/useLoadNonEquityPayments';

import Loading from '../../Loading/Loading';
import ExecutiveSummaryBlock from '../../../Elements/Layouts/ExecutiveSummaryBlock';
import Description from '../../../Elements/TextElements/Description/Description';
import NonEquityPaymentSummaryItem from './NonEquityPaymentSummaryItem';

const NonEquityPaymentSummary = ({ executiveId }) => {

  const paymentIds = useRecoilValue(nonEquityPaymentIdsState(executiveId));
  const { loading, error } = useLoadNonEquityPayments(executiveId);

  if (loading) return <Loading component="Non Equity Payment Summary" error={ error } />

  return (

    <ExecutiveSummaryBlock>
      <Description text="Non Equity Payments" />
      { paymentIds.map((paymentId) => <NonEquityPaymentSummaryItem key={ paymentId } paymentId={ paymentId } />) }
    </ExecutiveSummaryBlock>
  )

};

export default NonEquityPaymentSummary;