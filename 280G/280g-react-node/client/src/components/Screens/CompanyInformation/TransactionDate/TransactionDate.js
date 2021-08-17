import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

import { transactionDateState } from '../../../../recoil/company';
import { stringify, formatDate } from '../../../../utilities/formatDate';
import { editCompany } from '../../../../api/company/editCompany';

import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/Forms/DateForm/DateForm';

const TransactionDate = ({ companyId }) => {
  
  const [ transactionDate, setTransactionDate ] = useRecoilState(transactionDateState);
  const [ completed, setCompleted ] = useState((transactionDate) ? true : false);

  const handleChange = async (date) => {
    await editCompany(companyId, { transactionDate: date });
    setTransactionDate(stringify(date));
    setCompleted(true);
  };

  const handleEdit = () => setCompleted(false);

  return (
    <>
      <Description text={ 'Transaction Date: ' } />
      { (completed)
      ? <Identifier text={ (transactionDate) ? formatDate(transactionDate) : '' } handleEdit={ handleEdit }/>
      : <DateForm date={ transactionDate } handleChange={ handleChange } />
      } 
    </>
  );

};

export default TransactionDate;