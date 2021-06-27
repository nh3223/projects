import React from 'react';
import { useParams } from 'react-router';
import ExecutiveHeader from '../Navigation/ExecutiveHeader';

const RestrictedStock = () => {
  
  const { id } = useParams();
  
  return (
    <>
      <ExecutiveHeader executiveId={ id } />
      <h1>Restricted Stock Page</h1>
    </>
  );
};

  export default RestrictedStock;