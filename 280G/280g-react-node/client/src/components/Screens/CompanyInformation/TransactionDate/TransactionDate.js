import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { formatISO, parseISO } from 'date-fns';

import TransactionDateIdentifier from './TransactionDateIdentifier';
import TransactionDateForm from './TransactionDateForm';
import { companyState, companyCompletedState } from '../../../../recoil/atoms/company';
import useSaveCompany from '../../../../hooks/useSaveCompany';

const TransactionDate = () => {

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const [ transactionDate, setTransactionDate ] = useState(new Date());

  const handleEdit = () => {
    setCompleted({ ...completed, transactionDate: false});
  };
  
  const handleChange = async (date) => {
    setTransactionDate(date);
    setCompany({ ...company, transactionDate: formatISO(date) });
    setCompleted({ ...completed, transactionDate: true });
  };

  // useSaveCompany(company, completed);
  
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