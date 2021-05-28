import React, { useState } from 'react';

import DealPriceIdentifier from './DealPriceIdentifier';
import DealPriceForm from './DealPriceForm';

const DealPrice = () => {

  const [ price, setPrice ] = useState('');
  const [ transactionPrice, setTransactionPrice ] = useState(0);
  const [ completed, setCompleted ] = useState(false);
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
      ? <DealPriceIdentifier price={ transactionPrice } handleEdit={ handleEdit }/>
      : <DealPriceForm price={ price } handleSubmit={ handleSubmit } handleChange={ handleChange } error={ error } />
      } 
    </>
  );

};

export default DealPrice;