import React from 'react';
import { useRecoilValue } from 'recoil';

import { useLoadNonEquityPayment } from '../../../../hooks/useLoadNonEquityPayment';
import { nonEquityPaymentAmountState, nonEquityPaymentDescriptionState } from '../../../../recoil/nonEquityPayment';

import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';
import Description from '../../../Elements/TextElements/Description/Description';
import Loading from '../../../Loaders/Loading';

const NonEquityPaymentSummaryItem = ({ paymentId }) => {

  const paymentDescription = useRecoilValue(nonEquityPaymentDescriptionState(paymentId));
  const paymentAmount = useRecoilValue(nonEquityPaymentAmountState(paymentId));
  const { loading, error } = useLoadNonEquityPayment(paymentId);

  if (loading) return <Loading component="Non Equity Payment Summary Item" error={ error } />

  return (

    <SingleLineLayout>
      <Description text={ `${paymentDescription}: $${paymentAmount}` } />
    </SingleLineLayout>

  );

};

export default NonEquityPaymentSummaryItem;