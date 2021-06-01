import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import DealPriceIdentifier from './DealPriceIdentifier';
import DealPriceForm from './DealPriceForm';
import { transactionPriceState } from '../../../../recoil/atoms/CompanyInformation';

const DealPrice = () => {

  const [ transactionPrice, setTransactionPrice ] = useRecoilState(transactionPriceState);
  const [ price, setPrice ] = useState(transactionPrice);
  const [ completed, setCompleted ] = useState((price) ? true : false);
  const [ error, setError ] = useState(false);

  const handleEdit = () => {
    setCompleted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dealPrice = Number(price);
    if (dealPrice) {
      setTransactionPrice(dealPrice);
      setError(false);
      setCompleted(true); 
    } else {
      setError(true);
    }
  };

  const handleChange = (e) => setPrice(e.target.value);

  return (
    <>
      { completed
      ? <DealPriceIdentifier transactionPrice={ transactionPrice } handleEdit={ handleEdit }/>
      : <DealPriceForm transactionPrice={ price } handleSubmit={ handleSubmit } handleChange={ handleChange } error={ error } />
      } 
    </>
  );

};

export default DealPrice;