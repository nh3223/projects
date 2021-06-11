import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import DealPriceIdentifier from './DealPriceIdentifier';
import DealPriceForm from './DealPriceForm';
import { transactionPriceState } from '../../../../recoil/atoms/CompanyInformation';

const DealPrice = () => {

  const [ transactionPrice, setTransactionPrice ] = useRecoilState(transactionPriceState);
  const [ price, setPrice ] = useState('');
  const [ completed, setCompleted ] = useState(true);
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

  useEffect(() => {
    setPrice(transactionPrice);
    setCompleted((transactionPrice) ? true : false);
  }, [transactionPrice]);

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