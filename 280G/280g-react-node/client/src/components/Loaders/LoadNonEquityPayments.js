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
      paymentData.filter((payment) => (payment.description !== '' && payment.amount !== 0));
      paymentData.map((payment) => {
        payment.completed = true;
        payment.error = false;
        return payment;
      });
      setPayments(paymentData);
      setLoading(false);
    };

    (payments.length === 0) ? getPayments() : setLoading(false);

  }, [executiveId, payments.length, setPayments]);  

  return (
    loading && <Loading componentMessage="Non-Equity Payments" />
  );

};

export default LoadNonEquityPayments;
