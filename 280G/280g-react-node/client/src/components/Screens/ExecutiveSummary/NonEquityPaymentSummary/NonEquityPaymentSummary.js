import React from 'react';
import { useRecoilValue } from 'recoil';

import { nonEquityPaymentIdsState } from '../../../../recoil/nonEquityPayment';
import { useLoadNonEquityPayments } from '../../../../hooks/useLoadNonEquityPayments';

import Loading from '../../../Loaders/Loading';
import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import NonEquityPaymentSummaryItem from './NonEquityPaymentSummaryItem';

const NonEquityPaymentSummary = ({ executiveId }) => {

  const paymentIds = useRecoilValue(nonEquityPaymentIdsState(executiveId));
  const { loading, error } = useLoadNonEquityPayments(executiveId);

  if (loading) return <Loading component="Non Equity Payment Summary" error={ error } />

  return (

    <MultiLineLayout>
      <Description text="Non Equity Payments" />
      { paymentIds.map((paymentId) => <NonEquityPaymentSummaryItem paymentId={ paymentId } />) }
    </MultiLineLayout>
  )

};

export default NonEquityPaymentSummary;