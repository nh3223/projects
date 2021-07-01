import React from 'react';

const TransactionPriceIdentifier = ({ transactionPrice, handleEdit }) => {
  
  return (
    <>
      <h2>Transaction Price Per Share: { `$${ transactionPrice }` }</h2>
      <button onClick={ handleEdit }>Edit</button>
    </>
  );
};

export default TransactionPriceIdentifier;