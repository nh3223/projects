import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { formatISO, parseISO } from 'date-fns';

import TransactionDateIdentifier from './TransactionDateIdentifier';
import TransactionDateForm from './TransactionDateForm';
import { companyState, companyCompletedState } from '../../../../recoil/company';
import isCompleted from '../../../../utilities/isCompleted';
import { editCompany } from '../../../../api/company';

const TransactionDate = () => {

  const [ company, setCompany ] = useRecoilState(companyState);
  const [ completed, setCompleted ] = useRecoilState(companyCompletedState);
  const [ transactionDate, setTransactionDate ] = useState(new Date());
  const [ edit, setEdit ] = useState(false);

  const handleEdit = () => {
    setCompleted({ ...completed, transactionDate: false});
    setEdit(true);
  };
  
  const handleChange = async (date) => {
    const companyData = { ...company, transactionDate: formatISO(date) };
    const completedData = { ...completed, transactionDate: true };
    setTransactionDate(date);
    setCompany(companyData);
    setCompleted(completedData);
    if (edit && isCompleted(completedData)) {
      await editCompany(companyData);
    }
    setEdit(false);
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