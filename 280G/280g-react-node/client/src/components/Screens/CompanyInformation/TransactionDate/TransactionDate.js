import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { transactionDateState } from '../../../../recoil/company';
import { stringify, formatDate } from '../../../../utilities/date/date';
import { editCompany } from '../../../../api/company/editCompany';

import Description from '../../../Elements/TextElements/Description/Description';
import Identifier from '../../../Elements/Identifier/Identifier';
import DateForm from '../../../Elements/Forms/DateForm/DateForm';
import SingleLineLayout from '../../../Elements/Layouts/SingleLineLayout';

const TransactionDate = ({ companyId }) => {
  
  const [ date, setDate ] = useRecoilState(transactionDateState(companyId));
  const [ completed, setCompleted ] = useState((date) ? true : false);

  const handleChange = async (value) => {
    const transactionDate = stringify(value);
    await editCompany(companyId, { transactionDate });
    setDate(transactionDate);
    setCompleted(true);
  };

  const handleEdit = () => setCompleted(false);

  useEffect(() => {
    setCompleted((date) ? true : false);
  }, [date, setCompleted])

  return (
    <SingleLineLayout>
      <Description text={ 'Transaction Date: ' } />
      { (completed)
      ? <Identifier text={ (date) ? formatDate(date) : '' } handleEdit={ handleEdit }/>
      : <DateForm date={ date } handleChange={ handleChange } />
      } 
    </SingleLineLayout>
  );

};

export default TransactionDate;