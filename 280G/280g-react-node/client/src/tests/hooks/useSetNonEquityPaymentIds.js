import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { nonEquityPaymentIdsState } from '../../recoil/nonEquityPayment';

export const useSetNonEquityPaymentIds = ({ executiveId=1, paymentIds=[] }) => {

  const setPaymentIds = useSetRecoilState(nonEquityPaymentIdsState(executiveId));

  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setPaymentIds(paymentIds);
    setLoaded(true);
  }, [paymentIds, setPaymentIds, setLoaded]);

  return loading;

};