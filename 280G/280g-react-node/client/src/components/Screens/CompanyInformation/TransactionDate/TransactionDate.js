import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { parseISO } from 'date-fns';

import TransactionDateIdentifier from './TransactionDateIdentifier';
import TransactionDateForm from './TransactionDateForm';
import { companyState, companyCompletedState } from '../../../../recoil/atoms/company';
import { saveCompany } from '../../../../api/company';
import isCompleted from '../../../../utilities/isCompleted';


const TransactionDate = () => {

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const [ transactionDate, setTransactionDate ] = useState(new Date());

  const handleEdit = () => {
    setCompleted({ ...completed, transactionDate: false});
  };
  
  const handleChange = async (date) => {
    setTransactionDate(date);
    setCompany({ ...company, transactionDate: date });
    setCompleted({ ...completed, transactionDate: true });
    if (isCompleted(completed)) {
      const newCompany = await saveCompany(company);
      console.log(newCompany);
    }
  };
  
  useEffect(() => {
    if (company.id) {
      setTransactionDate(parseISO(company.transactionDate));
    }
  }, [company.id, company.transactionDate]);

  return (
    <>
      { (completed.transactionDate)
      ? <TransactionDateIdentifier date={ transactionDate } handleEdit={ handleEdit }/>
      : <TransactionDateForm date={ transactionDate } handleChange={ handleChange } />
      } 
    </>
  );

};

export default TransactionDate;