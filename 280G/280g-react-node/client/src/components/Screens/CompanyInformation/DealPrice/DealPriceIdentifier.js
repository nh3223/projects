import React from 'react';

const DealPriceIdentifier = ({ price, handleEdit }) => {
  
  const transactionPrice = `$${ price }`;

  return (
    <>
      <h2>Transaction Price Per Share: { transactionPrice }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default DealPriceIdentifier;