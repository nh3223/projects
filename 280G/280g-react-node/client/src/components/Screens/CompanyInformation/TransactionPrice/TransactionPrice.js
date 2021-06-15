import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import TransactionPriceIdentifier from './TransactionPriceIdentifier';
import TransactionPriceForm from './TransactionPriceForm';
import { companyState, companyCompletedState } from '../../../../recoil/atoms/company';
import useSaveCompany from '../../../../hooks/useSaveCompany';

const TransactionPrice = () => {

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const [ price, setPrice ] = useState('');
  const [ error, setError ] = useState(false);

  const handleEdit = () => setCompleted({ ...completed, transactionPrice: false});

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionPrice = Number(price);
    if (transactionPrice) {
      setCompany({ ...company, transactionPrice });
      setCompleted({ ...completed, transactionPrice: true });
    } else {
      setError(true)
    }  
  };

  const handleChange = (e) => setPrice(e.target.value);

  // useSaveCompany(company, completed);

  useEffect(() => {
    if (company.id) {
      setPrice(company.transactionPrice);
    }
  }, [company.id, company.transactionPrice]);

  return (
    <>
      { (completed.transactionPrice)
      ? <TransactionPriceIdentifier price={ company.transactionPrice } handleEdit={ handleEdit }/>
      : <TransactionPriceForm price={ price } handleSubmit={ handleSubmit } handleChange={ handleChange } error={ error } />
      } 
    </>
  );

};

export default TransactionPrice;