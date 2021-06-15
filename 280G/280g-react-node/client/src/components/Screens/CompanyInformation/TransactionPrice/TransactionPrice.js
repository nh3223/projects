import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import TransactionPriceIdentifier from './TransactionPriceIdentifier';
import TransactionPriceForm from './TransactionPriceForm';
import { companyState, companyCompletedState } from '../../../../recoil/atoms/company';
import { saveCompany } from '../../../../api/company';
import isCompleted from '../../../../utilities/isCompleted';


const TransactionPrice = () => {

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const [ price, setPrice ] = useState('');
  const [ error, setError ] = useState(false);

  const handleEdit = () => {
    setCompleted({ ...completed, transactionPrice: false});
  };

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

  useEffect(() => {
    const save = async (company) => {
      const newCompany = await saveCompany(company);
      console.log('deal price useeffect', newCompany);
    };
    if (isCompleted(completed)) {
      save(company);
    }
  }, [completed, company])

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