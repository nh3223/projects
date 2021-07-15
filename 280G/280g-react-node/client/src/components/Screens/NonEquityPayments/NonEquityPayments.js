import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { createPayment } from '../../../api/nonEquityPayments';
import { nonEquityPaymentIdsState } from '../../../recoil/nonEquityPayments';

import ExecutiveHeader from '../../Navigation/ExecutiveHeader';
import LoadNonEquityPayments from '../../Loaders/LoadNonEquityPayments';
import NonEquityPayment from './NonEquityPayment';

const NonEquityPayments = () => {

  const { executiveId } = useParams();

  const [ paymentIds, setPaymentIds ] = useRecoilState(nonEquityPaymentIdsState(executiveId));
  const [ add, setAdd ] = useState(false);
  
  const handleAdd = () => setAdd(true); 
  
  const handleCreate = async (payment) => {
    const newPayment = await createPayment(payment);
    setPaymentIds([ ...paymentIds, newPayment._id ]);
    setAdd(false);
  };  
  
  return (
    <>
      <ExecutiveHeader executiveId={ executiveId }/>
      <LoadNonEquityPayments executiveId={ executiveId } />
      <h2>Non-Equity Payments</h2>
      { (!add) && <button onClick={ handleAdd }>Add a Payment</button> }
      { (add) && <NonEquityPayment paymentId={ null } handleCreate={ handleCreate }/> }
      { paymentIds.map((paymentId) => <NonEquityPayment key={ paymentId } paymentId= { paymentId } />) }
  </>
  );
  
};

export default NonEquityPayments;