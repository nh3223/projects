import React from 'react';

import { useLoadExecutive } from '../../../hooks/useLoadExecutive';
import { useLoadGrants } from '../../../hooks/useLoadGrants';
import { useLoadNonEquityPayments } from '../../../hooks/useLoadNonEquityPayments';
import { useRecoilValue } from 'recoil';
import { equityGrantIdsState } from '../../../recoil/equityGrant';
import { nonEquityPaymentIdsState } from '../../../recoil/nonEquityPayment';

import Loading from './Loading';
import LoadGrant from './LoadGrant';
import LoadPayment from './LoadPayment';

const LoadExecutive = ({ executiveId }) => {

  const grantIds = useRecoilValue(equityGrantIdsState(executiveId));
  const paymentIds = useRecoilValue(nonEquityPaymentIdsState(executiveId));

  const { status: executiveStatus, error: executiveError } = useLoadExecutive(executiveId);
  const { status: grantsStatus, error: grantsError } = useLoadGrants(executiveId);
  const { status: paymentsStatus, error: paymentsError } = useLoadNonEquityPayments(executiveId);

  const loading = executiveStatus === 'loading' || grantsStatus === 'loading' || paymentsStatus === 'loading';
  const error = executiveError || grantsError || paymentsError;
  const errorMessage = (error) ? `${executiveError},${grantsError},${paymentsError}` : '';

  if (loading) return <Loading component="Executive" error={ errorMessage } />;

  return (
    <>
      { grantIds.map((grantId) => <LoadGrant key={ grantId } grantId={ grantId } />) }
      { paymentIds.map((paymentId) => <LoadPayment key={ paymentId } paymentId={ paymentId } />) }
    </>
  )

};

export default LoadExecutive;
