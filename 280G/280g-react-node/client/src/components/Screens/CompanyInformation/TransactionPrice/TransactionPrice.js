import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import TransactionPriceIdentifier from './TransactionPriceIdentifier';
import TransactionPriceForm from './TransactionPriceForm';
import { companyState, companyCompletedState } from '../../../../recoil/company';
import isCompleted from '../../../../utilities/isCompleted';
import { editCompany } from '../../../../api/company';

const TransactionPrice = () => {

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const [ price, setPrice ] = useState('');
  const [ error, setError ] = useState(false);
  const [ edit, setEdit ] = useState(false);

  const handleEdit = () => {
    setCompleted({ ...completed, transactionPrice: false});
    setEdit(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionPrice = Number(price);
    if (transactionPrice) {
      const companyData = { ...company, transactionPrice };
      const completedData = { ...completed, transactionPrice: true };
      setCompany(companyData);
      setCompleted(completedData);
      if (edit && isCompleted(completedData)) {
        await editCompany(companyData);
      }
      setEdit(false);
      setError(false);
    } else {
      setError(true)
    }  
  };

  const handleChange = (e) => setPrice(e.target.value);

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