import React from 'react';

const TransactionPriceIdentifier = ({ price, handleEdit }) => {
  
  return (
    <>
      <h2>Transaction Price Per Share: { `$${ price }` }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default TransactionPriceIdentifier;