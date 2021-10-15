import React from 'react';

import { useLoadNonEquityPayment } from '../../../hooks/useLoadNonEquityPayment';
import Loading from './Loading';

const LoadPayment = ({ paymentId }) => {

  const { status, error } = useLoadNonEquityPayment(paymentId);

  return (status === 'loading') ? <Loading component="Non Equity Payment" error={ error } /> : null

};

export default LoadPayment;