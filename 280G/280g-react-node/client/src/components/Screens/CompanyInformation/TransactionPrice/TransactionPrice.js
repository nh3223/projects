import React from 'react';

import Description from '../../../Elements/Description/StyledDescription';
import TransactionPriceIdentifier from './TransactionPriceIdentifier';
import TransactionPriceForm from './TransactionPriceForm';

const TransactionPrice = ({ transactionPrice, completed, handlers: { change, edit, submit }}) => (
  <>
    <Description text={ 'Transaction Price per Share:' } />
    { (completed)
    ? <TransactionPriceIdentifier transactionPrice={ transactionPrice } handleEdit={ edit }/>
    : <TransactionPriceForm transactionPrice={ transactionPrice } handleSubmit={ submit } handleChange={ change } />
    } 
  </>
);

export default TransactionPrice;