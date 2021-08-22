import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import Loading from './Loading';
import { fetchPayments } from '../../api/nonEquityPayments';
import { nonEquityPaymentIdsState } from '../../recoil/nonEquityPayments';

import LoadNonEquityPayment from './LoadNonEquityPayment';

const LoadNonEquityPayments = ({ executiveId }) => {

  const [ paymentIds, setPaymentIds ] = useRecoilState(nonEquityPaymentIdsState(executiveId));
  
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {

    const getPaymentIds = async () => {
    
      setLoading(true);
    
      try {
        const payments= await fetchPayments(executiveId);
        setPaymentIds(payments.map((payment) => payment._id));
        setLoading(false);
      }

      catch (e) {
        setError(e.message);
      }

    };

    if (paymentIds.length === 0) getPaymentIds();

  }, [executiveId, paymentIds.length, setPaymentIds]);  

  return (loading)
  ? <Loading componentMessage="Non-Equity Payments . . ." errorMessage={ error }/>
  : paymentIds.map((paymentId) => <LoadNonEquityPayment key={ paymentId } paymentId={ paymentId } />)

};

export default LoadNonEquityPayments;
