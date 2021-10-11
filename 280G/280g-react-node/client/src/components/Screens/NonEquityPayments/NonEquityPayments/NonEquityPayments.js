import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { createPayment } from '../../../../api/nonEquityPayment/createPayment'
import { nonEquityPaymentIdsState } from '../../../../recoil/nonEquityPayment';
import { useLoadNonEquityPayments } from '../../../../hooks/useLoadNonEquityPayments';

import Headers from '../../../Navigation/Headers/Headers';
import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import SubTitle from '../../../Elements/TextElements/SubTitle/SubTitle';
import AddButton from '../../../Elements/Buttons/AddButton/AddButton';
import NonEquityPayment from '../NonEquityPayment/NonEquityPayment';
import Loading from '../../Loading/Loading';

const NonEquityPayments = () => {

  const { companyId, executiveId } = useParams();

  const [ paymentIds, setPaymentIds ] = useRecoilState(nonEquityPaymentIdsState(executiveId));
  const { loading, error } = useLoadNonEquityPayments(executiveId);

  const handleAdd = async () => { 
    const newPayment = await createPayment(executiveId);
    setPaymentIds([ newPayment._id, ...paymentIds ]);
  };  
 
  const removePaymentId = (paymentId) => setPaymentIds(paymentIds.filter((id) => id !== paymentId));
  
  if (loading) return <Loading component="Non Equity Payments" error={ error } />

  return (
    <>
      
      <Headers companyId={ companyId } executiveId={ executiveId } />        
      
      <MultiLineLayout>
        <SubTitle text="Non-Equity Payments" />
        <AddButton name="addPayment" text="Add a Payment" handleAdd={ handleAdd } />
        { paymentIds.map((paymentId) => <NonEquityPayment key={ paymentId } paymentId= { paymentId } removePaymentId={ removePaymentId } />) }
      </MultiLineLayout>

    </>
  );
  
};

export default NonEquityPayments;