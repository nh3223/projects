import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Loading from './Loading';
import { fetchPayments } from '../../api/nonEquityPayments';
import { nonEquityPaymentsState } from '../../recoil/nonEquityPayments';

const LoadNonEquityPayments = ({ executiveId }) => {

  const [ payments, setPayments ] = useRecoilState(nonEquityPaymentsState(executiveId));
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {

    const getPayments = async () => {
      const paymentData = await fetchPayments(executiveId);
      setPayments(paymentData);
      setLoading(false);
    };

    if (payments.length === 0) getPayments();

  }, [executiveId, payments.length, setPayments]);  

  return loading && <Loading componentMessage="Non-Equity Payments" />

};

export default LoadNonEquityPayments;
