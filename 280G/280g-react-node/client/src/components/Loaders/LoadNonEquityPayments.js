import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Loading from './Loading';
import { fetchPayments } from '../../api/nonEquityPayments';
import { nonEquityPaymentIdsState } from '../../recoil/nonEquityPayments';

import LoadNonEquityPayment from './LoadNonEquityPayment';

const LoadNonEquityPayments = ({ executiveId }) => {

  const [ paymentIds, setPaymentIds ] = useRecoilState(nonEquityPaymentIdsState(executiveId));
  const [ loadComplete, setLoadComplete ] = useState(false);

  useEffect(() => {

    const getPaymentIds = async () => {
      const payments= await fetchPayments(executiveId);
      setPaymentIds(payments.map((payment) => payment._id));
      setLoadComplete(true);
    };
    if (executiveId && paymentIds.length === 0) getPaymentIds();

  }, [executiveId, paymentIds.length, setPaymentIds]);  

  return (loadComplete)
  ? paymentIds.map((id) => <LoadNonEquityPayment key={ id } paymentId={ id } />)
  : <Loading componentMessage="Non-Equity Payments . . ." />

};

export default LoadNonEquityPayments;
