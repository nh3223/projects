import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { nonEquityPaymentAmountState, nonEquityPaymentDescriptionState } from '../../recoil/nonEquityPayment';

export const useSetNonEquityPaymentTestData = ({ paymentId=1, paymentDescription='', paymentAmount='' }) => {

  const setPaymentDescription = useSetRecoilState(nonEquityPaymentDescriptionState(paymentId));
  const setPaymentAmount = useSetRecoilState(nonEquityPaymentAmountState(paymentId));

  const [ loaded, setLoaded ] = useState(false);
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    if (loaded) setLoading(false);
  }, [loaded, setLoading])

  useEffect(() => {
    setPaymentDescription(paymentDescription);
    setPaymentAmount(paymentAmount);
    setLoaded(true);
  }, [paymentDescription, setPaymentDescription, paymentAmount, setPaymentAmount, setLoaded]);

  return loading;

};