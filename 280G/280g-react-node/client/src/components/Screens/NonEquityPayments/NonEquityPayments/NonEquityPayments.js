import React from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { createPayment } from '../../../api/nonEquityPayments';
import { nonEquityPaymentIdsState } from '../../../../recoil/nonEquityPayment';
import { useLoadNonEquityPayments } from '../../../../hooks/useLoadNonEquityPayments';

import Headers from '../../../Elements/Layouts/Headers';
import MultiLineLayout from '../../../Elements/Layouts/MultiLineLayout';
import CompanyHeader from '../../../Navigation/CompanyHeader';
import ExecutiveHeader from '../../../Navigation/ExecutiveHeader';
import SubTitle from '../../Elements/SubTitle/SubTitle';
import AddButton from '../../Elements/AddButton/AddButton';
import NonEquityPayment from './NonEquityPayment';
import Loading from '../../../Loaders/Loading';

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
      
      <Headers>
        <CompanyHeader companyId={ companyId } />
        <ExecutiveHeader executiveId={ executiveId }/>        
      </Headers>
      
      <MultiLineLayout>
        <SubTitle text="Non-Equity Payments" />
        <AddButton name="addPayment" text="Add a Payment" handleAdd={ handleAdd } />
        { paymentIds.map((paymentId) => <NonEquityPayment key={ paymentId } paymentId= { paymentId } removePaymentId={ removePaymentId } />) }
      </MultiLineLayout>

    </>
  );
  
};

export default NonEquityPayments;